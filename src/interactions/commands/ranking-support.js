const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const TicketReview = require('../../models/TicketReview');
const Ticket = require('../../models/Ticket');
const config = require('../../config/reviewConfig');

module.exports = {
    name: 'ranking-support',
    description: 'Generuje ranking supportu na podstawie recenzji.',
    options: [
        {
            name: 'okres',
            description: 'Okres dla rankingu (tydzień, miesiąc, cały czas)',
            type: 3,
            choices: [
                { name: 'Ostatnie 7 dni', value: 'week' },
                { name: 'Ostatnie 30 dni', value: 'month' },
                { name: 'Cały czas', value: 'all' }
            ],
            required: false
        }
    ],

    execute: async (interaction) => {
        if (!config.ALLOWED_RANKING_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do tej komendy.**', flags: 64 });
        }

        await interaction.deferReply();

        const period = interaction.options.getString('okres') || 'week';
        let dateFrom;

        switch (period) {
            case 'week':
                dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                dateFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'all':
                dateFrom = new Date(0);
                break;
        }

        try {
            // Pobierz wszystkie recenzje w określonym okresie
            const reviews = await TicketReview.find({
                createdAt: { $gte: dateFrom }
            });

            // Pobierz wszystkie tickety w okresie dla liczenia ilości
            const tickets = await Ticket.find({
                createdAt: { $gte: dateFrom }
            });

            // Grupuj dane według supportId
            const supportStats = {};

            // Zlicz tickety dla każdego supporta
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

            // Dodaj dane z recenzji
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

            // Oblicz średnie oceny
            Object.keys(supportStats).forEach(supportId => {
                const stats = supportStats[supportId];
                stats.averageRating = stats.reviewCount > 0 ? 
                    (stats.totalRating / stats.reviewCount).toFixed(2) : 0;
            });

            // Sortuj według średniej oceny i liczby ticketów
            const sortedSupport = Object.entries(supportStats)
                .filter(([supportId, stats]) => stats.ticketCount > 0)
                .sort((a, b) => {
                    // Najpierw po średniej ocenie, potem po liczbie ticketów
                    if (parseFloat(b[1].averageRating) !== parseFloat(a[1].averageRating)) {
                        return parseFloat(b[1].averageRating) - parseFloat(a[1].averageRating);
                    }
                    return b[1].ticketCount - a[1].ticketCount;
                });

            const periodText = {
                'week': 'Ostatnie 7 dni',
                'month': 'Ostatnie 30 dni',
                'all': 'Cały czas'
            };

            // Tworzenie embeda z rankingiem
            // Oblicz statystyki ogólne
            const totalTickets = Object.values(supportStats).reduce((sum, stats) => sum + stats.ticketCount, 0);
            const totalReviews = Object.values(supportStats).reduce((sum, stats) => sum + stats.reviewCount, 0);
            const averageGlobalRating = totalReviews > 0 ? 
                (Object.values(supportStats).reduce((sum, stats) => sum + parseFloat(stats.averageRating) * stats.reviewCount, 0) / totalReviews).toFixed(2) : 0;

            // Import funkcji z utils
            const { createRankingEmbed } = require('../../utils/weeklyRanking');
            
            // Tworzenie głównego embeda z TOP 10
            const mainEmbed = await createRankingEmbed(sortedSupport, 0, 10, dateFrom, totalTickets, totalReviews, averageGlobalRating, interaction.client, false);
            mainEmbed.setTitle('🏆 Ranking Supportu (Podgląd)')
                    .setColor('#6f21ff')
                    .setDescription(`**Okres:** ${periodText[period]}\n**Dane z:** <t:${Math.floor(dateFrom.getTime() / 1000)}:R>\n\n${mainEmbed.data.description.split('\n\n').slice(1).join('\n\n')}`);

            // Tworzenie wszystkich stron
            const embeds = [mainEmbed];
            const itemsPerPage = 10;
            
            if (sortedSupport.length > 10) {
                for (let i = 10; i < sortedSupport.length; i += itemsPerPage) {
                    const pageEmbed = await createRankingEmbed(sortedSupport, i, itemsPerPage, dateFrom, totalTickets, totalReviews, averageGlobalRating, interaction.client, false);
                    pageEmbed.setTitle(`🏆 Ranking Supportu - Pozycje ${i + 1}-${Math.min(i + itemsPerPage, sortedSupport.length)}`)
                            .setColor('#6f21ff');
                    embeds.push(pageEmbed);
                }
            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('ranking_publish')
                    .setLabel('📢 Publikuj na #topka-supportu')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('ranking_refresh')
                    .setLabel('🔄 Odśwież')
                    .setStyle(ButtonStyle.Primary)
            );

            // Jeśli są dodatkowe strony, dodaj przycisk "Pełna Lista"
            if (embeds.length > 1) {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ranking_full_preview`)
                        .setLabel('📋 Pełna Lista')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('📋')
                );
                
                // Zapisz embedy do cache
                global.rankingPreviewCache = global.rankingPreviewCache || {};
                const previewId = `preview_${Date.now()}`;
                global.rankingPreviewCache[previewId] = {
                    embeds: embeds,
                    userId: interaction.user.id
                };
                
                // Aktualizuj customId przycisku z ID podglądu
                row.components[2].setCustomId(`ranking_full_${previewId}`);
            }

            await interaction.editReply({ embeds: [mainEmbed], components: [row] });

        } catch (error) {
            console.error('Błąd podczas generowania rankingu:', error);
            await interaction.editReply({ 
                content: '❌ **Błąd podczas generowania rankingu.**' 
            });
        }
    }
};