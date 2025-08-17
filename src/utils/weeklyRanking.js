const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const TicketReview = require('../models/TicketReview');
const Ticket = require('../models/Ticket');
const config = require('../config/reviewConfig');

async function createRankingEmbed(sortedSupport, startIndex, count, dateFrom, totalTickets, totalReviews, averageGlobalRating, client, isMainPage) {
    const medals = ['🥇', '🥈', '🥉'];
    const endIndex = Math.min(startIndex + count, sortedSupport.length);
    
    let title = isMainPage ? '🏆 Tygodniowy Ranking Supportu - TOP 3' : `🏆 Ranking Supportu - Pozycje ${startIndex + 1}-${endIndex}`;
    
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(`**Okres:** ${dateFrom.toLocaleDateString('pl-PL')} - ${new Date().toLocaleDateString('pl-PL')}\n**Automatycznie wygenerowano:** <t:${Math.floor(Date.now() / 1000)}:F>\n\n`)
        .setColor(isMainPage ? '#ffd700' : '#silver')
        .setTimestamp()
        .setFooter({ text: `Ranking generowany automatycznie co tydzień | Silent Mafia Support ${isMainPage ? '' : `| Strona ${Math.floor(startIndex / 10) + 1}`}` });

    if (sortedSupport.length === 0) {
        embed.setDescription(embed.data.description + '❌ **Brak aktywności supportu w tym tygodniu.**');
        return embed;
    }

    let rankingText = '';

    for (let i = startIndex; i < endIndex; i++) {
        const [supportId, stats] = sortedSupport[i];
        const medal = i < 3 ? medals[i] : `${i + 1}.`;
        const stars = '⭐'.repeat(Math.round(parseFloat(stats.averageRating)));
        
        try {
            const guilds = client.guilds.cache;
            let member = null;
            
            for (const guild of guilds.values()) {
                try {
                    member = await guild.members.fetch(supportId);
                    break;
                } catch (error) {
                    continue;
                }
            }

            if (member) {
                rankingText += `${medal} **${member.displayName}**\n`;
                rankingText += `   └ Tickety: **${stats.ticketCount}** | Ocena: **${stats.averageRating}/5** ${stars}\n`;
                rankingText += `   └ Recenzje: **${stats.reviewCount}**\n\n`;
            } else {
                rankingText += `${medal} **Nieznany Support** (ID: ${supportId})\n`;
                rankingText += `   └ Tickety: **${stats.ticketCount}** | Ocena: **${stats.averageRating}/5** ${stars}\n\n`;
            }
        } catch (error) {
            rankingText += `${medal} **Nieznany Support** (ID: ${supportId})\n`;
            rankingText += `   └ Tickety: **${stats.ticketCount}** | Ocena: **${stats.averageRating}/5** ${stars}\n\n`;
        }
    }

    embed.setDescription(embed.data.description + rankingText);

    if (isMainPage) {
        embed.addFields(
            { name: '📊 Statystyki tygodnia', value: `**Tickety:** ${totalTickets}\n**Recenzje:** ${totalReviews}\n**Średnia ocena:** ${averageGlobalRating}/5 ${'⭐'.repeat(Math.round(averageGlobalRating))}`, inline: false }
        );
    }

    return embed;
}

async function generateWeeklyRanking(client) {
    console.log('🏆 Generowanie tygodniowego rankingu supportu...');
    
    try {
        // Pobierz dane z ostatniego tygodnia
        const dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        
        const reviews = await TicketReview.find({
            createdAt: { $gte: dateFrom }
        });

        const tickets = await Ticket.find({
            createdAt: { $gte: dateFrom }
        });

        // Grupuj dane według supportId
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
                if (parseFloat(b[1].averageRating) !== parseFloat(a[1].averageRating)) {
                    return parseFloat(b[1].averageRating) - parseFloat(a[1].averageRating);
                }
                return b[1].ticketCount - a[1].ticketCount;
            });

        // Oblicz statystyki ogólne
        const totalTickets = Object.values(supportStats).reduce((sum, stats) => sum + stats.ticketCount, 0);
        const totalReviews = Object.values(supportStats).reduce((sum, stats) => sum + stats.reviewCount, 0);
        const averageGlobalRating = totalReviews > 0 ? 
            (Object.values(supportStats).reduce((sum, stats) => sum + parseFloat(stats.averageRating) * stats.reviewCount, 0) / totalReviews).toFixed(2) : 0;

        // Tworzenie głównego embeda z TOP 3
        const mainEmbed = await createRankingEmbed(sortedSupport, 0, 3, dateFrom, totalTickets, totalReviews, averageGlobalRating, client, true);
        
        // Tworzenie listy ze wszystkimi supportami (strona po stronie)
        const embeds = [mainEmbed];
        const itemsPerPage = 10;
        
        if (sortedSupport.length > 3) {
            for (let i = 3; i < sortedSupport.length; i += itemsPerPage) {
                const pageEmbed = await createRankingEmbed(sortedSupport, i, itemsPerPage, dateFrom, totalTickets, totalReviews, averageGlobalRating, client, false);
                embeds.push(pageEmbed);
            }
        }

        // Wyślij na kanał topka-supportu
        try {
            const topkaChannel = await client.channels.fetch(config.TOPKA_CHANNEL_ID);
            
            // Wyślij główny embed (TOP 3)
            const sentMessage = await topkaChannel.send({ embeds: [embeds[0]] });
            
            // Jeśli są dodatkowe strony, wyślij je z przyciskami nawigacji
            if (embeds.length > 1) {
                const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`ranking_full_${sentMessage.id}`)
                            .setLabel('📋 Pełna Lista')
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji('📋'),
                        new ButtonBuilder()
                            .setCustomId(`ranking_refresh_${sentMessage.id}`)
                            .setLabel('🔄 Odśwież')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('🔄')
                    );
                
                await sentMessage.edit({ embeds: [embeds[0]], components: [buttons] });
                
                // Zapisz embedy do cache dla przycisków (możesz to zrobić w globalnej zmiennej lub bazie)
                global.rankingCache = global.rankingCache || {};
                global.rankingCache[sentMessage.id] = {
                    embeds: embeds,
                    currentPage: 0,
                    totalPages: embeds.length
                };
            }
            
            console.log(`✅ Tygodniowy ranking supportu został opublikowany! (${embeds.length} ${embeds.length === 1 ? 'strona' : 'stron'})`);
        } catch (error) {
            console.error('❌ Błąd podczas publikowania tygodniowego rankingu:', error);
        }

    } catch (error) {
        console.error('❌ Błąd podczas generowania tygodniowego rankingu:', error);
    }
}

function scheduleWeeklyRanking(client) {
    // Uruchom ranking co tydzień w niedzielę o 20:00
    const scheduleRanking = () => {
        const now = new Date();
        const nextSunday = new Date();
        
        // Znajdź najbliższą niedzielę o 20:00
        nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
        nextSunday.setHours(20, 0, 0, 0);
        
        // Jeśli już minęła 20:00 w niedzielę, ustaw na następną niedzielę
        if (nextSunday <= now) {
            nextSunday.setDate(nextSunday.getDate() + 7);
        }
        
        const timeUntilRanking = nextSunday.getTime() - now.getTime();
        
        console.log(`📅 Następny ranking supportu: ${nextSunday.toLocaleString('pl-PL')}`);
        
        setTimeout(async () => {
            await generateWeeklyRanking(client);
            // Zaplanuj następny ranking
            scheduleRanking();
        }, timeUntilRanking);
    };
    
    scheduleRanking();
}

module.exports = {
    generateWeeklyRanking,
    scheduleWeeklyRanking,
    createRankingEmbed
};