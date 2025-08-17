const { EmbedBuilder } = require('discord.js');
const TicketReview = require('../../../models/TicketReview');
const Ticket = require('../../../models/Ticket');
const config = require('../../../config/reviewConfig');

module.exports = {
    async execute(interaction) {
        const action = interaction.customId.split('_')[1]; // ranking_publish, ranking_refresh, ranking_full

        if (action === 'publish') {
            // Publikuj ranking na kanale #topka-supportu
            try {
                const topkaChannel = await interaction.client.channels.fetch(config.TOPKA_CHANNEL_ID);
                
                // Skopiuj embed z oryginalnej wiadomości
                const originalEmbed = interaction.message.embeds[0];
                
                const publicEmbed = new EmbedBuilder()
                    .setTitle('🏆 Ranking Supportu - Oficjalny')
                    .setDescription(originalEmbed.description)
                    .setColor('#ffd700')
                    .setTimestamp()
                    .setFooter({ text: 'Ranking generowany automatycznie co tydzień' });

                await topkaChannel.send({ embeds: [publicEmbed] });
                
                await interaction.reply({ 
                    content: '✅ **Ranking został opublikowany na kanale #topka-supportu!**', 
                    flags: 64 
                });

            } catch (error) {
                console.error('Błąd podczas publikowania rankingu:', error);
                await interaction.reply({ 
                    content: '❌ **Błąd podczas publikowania rankingu.**', 
                    flags: 64 
                });
            }

        } else if (action === 'full') {
            // Pokaż pełną listę wszystkich supportów
            const dataId = interaction.customId.split('_')[2];
            let cachedData;
            
            // Sprawdź czy to dane z publicznego rankingu czy z podglądu
            if (dataId.startsWith('preview_')) {
                cachedData = global.rankingPreviewCache?.[dataId];
                // Sprawdź uprawnienia dla podglądu
                if (cachedData && cachedData.userId !== interaction.user.id) {
                    return await interaction.reply({
                        content: '❌ **Nie masz uprawnień do tego podglądu.**',
                        flags: 64
                    });
                }
            } else {
                cachedData = global.rankingCache?.[dataId];
            }
            
            if (!cachedData) {
                return await interaction.reply({
                    content: '❌ **Nie znaleziono danych rankingu. Użyj przycisku "Odśwież".**',
                    flags: 64
                });
            }
            
            // Wyślij wszystkie strony jako osobne wiadomości
            await interaction.reply({
                content: '📋 **Pełna lista wszystkich supportów:**',
                flags: 64
            });
            
            for (let i = 1; i < cachedData.embeds.length; i++) {
                await interaction.followUp({
                    embeds: [cachedData.embeds[i]],
                    flags: 64
                });
            }
            
        } else if (action === 'refresh') {
            // Odśwież ranking (regeneruj dane)
            await interaction.deferUpdate();
            
            try {
                // Pobierz dane z ostatniego tygodnia
                const dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                
                const reviews = await TicketReview.find({
                    createdAt: { $gte: dateFrom }
                });

                const tickets = await Ticket.find({
                    createdAt: { $gte: dateFrom }
                });

                // [Kod kalkulacji rankingu - identyczny jak w komendzie]
                const supportStats = {};

                tickets.forEach(ticket => {
                    const supportId = ticket.claimedBy || 'unknown';
                    if (supportId !== 'unknown') {
                        if (!supportStats[supportId]) {
                            supportStats[supportId] = {
                                ticketCount: 0,
                                totalRating: 0,
                                reviewCount: 0,
                                averageRating: 0
                            };
                        }
                        supportStats[supportId].ticketCount++;
                    }
                });

                reviews.forEach(review => {
                    const supportId = review.supportId;
                    if (supportId !== 'unknown') {
                        if (!supportStats[supportId]) {
                            supportStats[supportId] = {
                                ticketCount: 0,
                                totalRating: 0,
                                reviewCount: 0,
                                averageRating: 0
                            };
                        }
                        supportStats[supportId].totalRating += review.rating;
                        supportStats[supportId].reviewCount++;
                    }
                });

                Object.keys(supportStats).forEach(supportId => {
                    const stats = supportStats[supportId];
                    stats.averageRating = stats.reviewCount > 0 ? 
                        (stats.totalRating / stats.reviewCount).toFixed(2) : 0;
                });

                const sortedSupport = Object.entries(supportStats)
                    .filter(([supportId, stats]) => stats.ticketCount > 0)
                    .sort((a, b) => {
                        if (parseFloat(b[1].averageRating) !== parseFloat(a[1].averageRating)) {
                            return parseFloat(b[1].averageRating) - parseFloat(a[1].averageRating);
                        }
                        return b[1].ticketCount - a[1].ticketCount;
                    });

                const embed = new EmbedBuilder()
                    .setTitle('🏆 Ranking Supportu')
                    .setDescription(`**Okres:** Ostatnie 7 dni\n**Dane z:** <t:${Math.floor(dateFrom.getTime() / 1000)}:R>\n\n`)
                    .setColor('#6f21ff')
                    .setTimestamp();

                if (sortedSupport.length === 0) {
                    embed.setDescription(embed.data.description + '❌ **Brak danych do wyświetlenia w tym okresie.**');
                } else {
                    let rankingText = '';
                    let medals = ['🥇', '🥈', '🥉'];

                    for (let i = 0; i < Math.min(sortedSupport.length, 10); i++) {
                        const [supportId, stats] = sortedSupport[i];
                        const medal = i < 3 ? medals[i] : `${i + 1}.`;
                        const stars = '⭐'.repeat(Math.round(parseFloat(stats.averageRating)));
                        
                        try {
                            const member = await interaction.guild.members.fetch(supportId);
                            rankingText += `${medal} **${member.displayName}**\n`;
                            rankingText += `   └ Tickety: **${stats.ticketCount}** | Ocena: **${stats.averageRating}/5** ${stars}\n`;
                            rankingText += `   └ Recenzje: **${stats.reviewCount}**\n\n`;
                        } catch (error) {
                            rankingText += `${medal} **Nieznany Support** (ID: ${supportId})\n`;
                            rankingText += `   └ Tickety: **${stats.ticketCount}** | Ocena: **${stats.averageRating}/5** ${stars}\n\n`;
                        }
                    }

                    embed.setDescription(embed.data.description + rankingText);
                }

                await interaction.editReply({ embeds: [embed] });

            } catch (error) {
                console.error('Błąd podczas odświeżania rankingu:', error);
                await interaction.followUp({ 
                    content: '❌ **Błąd podczas odświeżania rankingu.**', 
                    flags: 64 
                });
            }
        }
    }
};