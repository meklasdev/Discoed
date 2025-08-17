const { EmbedBuilder } = require('discord.js');
const TicketReview = require('../../../models/TicketReview');
const Ticket = require('../../../models/Ticket');
const config = require('../../../config/reviewConfig');

module.exports = {
    async execute(interaction) {
        const ticketId = interaction.customId.split('_')[2]; // review_modal_ID
        const rating = parseInt(interaction.fields.getTextInputValue('rating'));
        const comment = interaction.fields.getTextInputValue('comment') || 'Brak komentarza';

        // Walidacja oceny
        if (rating < 1 || rating > 5 || isNaN(rating)) {
            return interaction.reply({
                content: '❌ **Błąd!** Ocena musi być liczbą od 1 do 5.',
                flags: 64
            });
        }

        try {
            // Znajdź ticket w bazie danych
            const ticketData = await Ticket.findById(ticketId);
            if (!ticketData) {
                return interaction.reply({
                    content: '❌ **Błąd!** Nie znaleziono ticketa.',
                    flags: 64
                });
            }

            // Sprawdź czy użytkownik już ocenił ten ticket
            const existingReview = await TicketReview.findOne({
                ticketId: ticketId,
                userId: interaction.user.id
            });

            if (existingReview) {
                return interaction.reply({
                    content: '❌ **Ten ticket został już przez Ciebie oceniony!**',
                    flags: 64
                });
            }

            // Określ kategorię ticketa (na podstawie nazwy kanału lub innych danych)
            let category = 'unknown';
            if (ticketData.channelId) {
                try {
                    const channel = await interaction.client.channels.fetch(ticketData.channelId);
                    if (channel && channel.parent) {
                        category = channel.parent.name;
                    }
                } catch (error) {
                    console.log('Nie można znaleźć kanału ticketa:', error);
                }
            }

            // Znajdź support który obsługiwał ticket (claimedBy lub pierwszy support w kanale)
            let supportId = ticketData.claimedBy || 'unknown';

            // Zapisz recenzję do bazy danych
            const review = new TicketReview({
                ticketId: ticketId,
                userId: interaction.user.id,
                supportId: supportId,
                rating: rating,
                comment: comment,
                category: category,
                channelId: ticketData.channelId
            });

            await review.save();

            // Wygeneruj gwiazdki
            const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

            // Embed z potwierdzeniem dla użytkownika
            const confirmEmbed = new EmbedBuilder()
                .setDescription(`
## ✅ Dziękujemy za ocenę!
> **Twoja ocena:** ${stars} (${rating}/5)
> **Komentarz:** ${comment}

Twoja opinia została zapisana i pomoże nam poprawić jakość wsparcia!`)
                .setColor('#00ff00')
                .setTimestamp();

            await interaction.reply({ embeds: [confirmEmbed], flags: 64 });

            // Wyślij recenzję na kanał
            const reviewsChannelId = config.REVIEWS_CHANNEL_ID;
            try {
                const reviewsChannel = await interaction.client.channels.fetch(reviewsChannelId);
                
                const supportMember = supportId !== 'unknown' ? await interaction.guild.members.fetch(supportId).catch(() => null) : null;
                
                const reviewEmbed = new EmbedBuilder()
                    .setTitle('📊 Nowa Recenzja Ticketa')
                    .addFields(
                        { name: '🎫 Ticket ID', value: `\`${ticketId}\``, inline: true },
                        { name: '👤 Użytkownik', value: `${interaction.user}`, inline: true },
                        { name: '🛠️ Support', value: supportMember ? `${supportMember}` : 'Nieznany', inline: true },
                        { name: '⭐ Ocena', value: `${stars} (${rating}/5)`, inline: true },
                        { name: '📂 Kategoria', value: category, inline: true },
                        { name: '📅 Data', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
                        { name: '💬 Komentarz', value: comment, inline: false }
                    )
                    .setColor(rating >= 4 ? '#00ff00' : rating >= 3 ? '#ffff00' : '#ff0000')
                    .setTimestamp();

                await reviewsChannel.send({ embeds: [reviewEmbed] });

                // Powiadomienie właściciela przy ocenach 1-2
                if (rating <= config.LOW_RATING_THRESHOLD) {
                    const ownerIds = config.OWNER_IDS;
                    
                    const alertEmbed = new EmbedBuilder()
                        .setTitle('🚨 NISKA OCENA TICKETA!')
                        .setDescription(`
**Otrzymano niską ocenę: ${stars} (${rating}/5)**

**Szczegóły:**
🎫 **Ticket ID:** \`${ticketId}\`
👤 **Użytkownik:** ${interaction.user}
🛠️ **Support:** ${supportMember ? supportMember : 'Nieznany'}
📂 **Kategoria:** ${category}
💬 **Komentarz:** ${comment}

⚠️ **Wymagana interwencja i analiza przypadku!**`)
                        .setColor('#ff0000')
                        .setTimestamp();

                    for (const ownerId of ownerIds) {
                        try {
                            const owner = await interaction.client.users.fetch(ownerId);
                            await owner.send({ embeds: [alertEmbed] });
                        } catch (error) {
                            console.log(`Nie można wysłać powiadomienia do właściciela ${ownerId}:`, error);
                        }
                    }
                }

            } catch (error) {
                console.log('Błąd podczas wysyłania recenzji na kanał:', error);
            }

        } catch (error) {
            console.error('Błąd podczas zapisywania recenzji:', error);
            await interaction.reply({
                content: '❌ **Błąd!** Nie udało się zapisać recenzji. Spróbuj ponownie.',
                flags: 64
            });
        }
    }
};