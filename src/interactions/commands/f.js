const { EmbedBuilder } = require('discord.js');
const Ticket = require('../../models/Ticket');
const config = require('../../config/reviewConfig');

module.exports = {
    name: 'f',
    description: 'Finalizuje zamówienie klienta i wysyła instrukcje.',
    options: [
        {
            name: 'klient',
            description: 'Klient, który złożył zamówienie.',
            type: 6,
            required: true
        },
        {
            name: 'ilość',
            description: 'Ilość zakupionych produktów (np. 1, 2).',
            type: 4,
            required: true
        },
        {
            name: 'produkt',
            description: 'Wybierz zrealizowany produkt.',
            type: 3,
            required: true,
            choices: [
                { name: 'R3d Engine', value: 'R3d Engine' },
                { name: 'R3d Engine Sp00fer', value: 'R3d Engine Sp00fer' },
                { name: 'K3yser', value: 'K3yser' },
                { name: 'Ambani', value: 'Ambani' },
                { name: 'Un1core', value: 'Un1core' },
                { name: 'Ti4go', value: 'Ti4go' },
                { name: 'Ti4go Sp00fer', value: 'Ti4go Sp00fer' },
                { name: 'HX S0ftware', value: 'HX S0ftware' },
                { name: 'M4cho', value: 'M4cho' },
                { name: 'M4cho Sp00fer', value: 'M4cho Sp00fer' },
                { name: 'Silent Project', value: 'Silent Project' },
                { name: 'Fiv3M Ready', value: 'Fiv3M Ready' },
                { name: 'Fiv3M Bundle', value: 'Fiv3M Bundle' },
                { name: 'St3am', value: 'St3am' },
                { name: 'D1sc0rd', value: 'D1sc0rd' },
                { name: '!P V4nish', value: '!P V4nish' },
                { name: 'FG B4pass', value: 'FG B4pass' }
            ]
        },
        {
            name: 'licencja',
            description: 'Określ czas trwania licencji.',
            type: 3,
            required: false,
            choices: [
                { name: '1 day', value: '1d' },
                { name: '3 days', value: '3d' },
                { name: 'week', value: 'weekly' },
                { name: 'month', value: 'monthly' },
                { name: 'lifetime', value: 'lifetime' }
            ]
        }
    ],

    async execute(interaction) {
        const member = interaction.member;
        const permsRole = '1382630829536182310';

        if (!member.roles.cache.has(permsRole))
            return interaction.reply({
                content: '> **Nie masz uprawnień do tej komendy.**',
                flags: 64
            });

        const ticketData = await Ticket.findOne({ channelId: interaction.channel.id });

        if (!ticketData) {
            return interaction.reply({ content: '`❌` Ta komenda może być użyta tylko na kanale aktywnego ticketu.', flags: 64 });
        }

        if (!ticketData.payment) {
            return interaction.reply({ content: '`❌` Nie znaleziono metody płatności dla tego ticketu w bazie danych.', flags: 64 });
        }

        const klient = interaction.options.getUser('klient');
        const ilosc = interaction.options.getInteger('ilość');
        const produkt = interaction.options.getString('produkt');
        const licencja = interaction.options.getString('licencja') || 'lifetime';
        const platnosc = ticketData.payment;

        const repMessage = `+rep <@${config.REP_USER_ID}> x${ilosc} ${produkt} ${licencja} [${platnosc}]`;

        const finalEmbed = new EmbedBuilder()
            .setColor('#6f21ff')
            .setDescription(
                `### Twoje zamówienie zostało zrealizowane. <:silent:1395058293432516658>
- Wystaw nam **[Feedbacka](https://discord.com/channels/1382630829536182302/1382630833000812599)** oraz **[Reviesa](https://discord.com/channels/1382630829536182302/1382630833000812598).**
### Jak wystawić **Feedbacka**?
- Skopiuj wiadomość poniżej i wklej na **[Feedback](https://discord.com/channels/1382630829536182302/1382630833000812599)!**
# Kanał <a:arrowpurple:1384626293139570781> <#1382630833000812599>
\`\`\`${repMessage}\`\`\``
            );

        try {
            await interaction.reply({ content: `||${klient}||`, embeds: [finalEmbed] });

            const feedbackChannelId = '1382630833000812599';
            const reviewsChannelId = '1382630833000812598';

            const channelsToPing = [feedbackChannelId, reviewsChannelId];

            for (const channelId of channelsToPing) {
                try {
                    const channel = await interaction.client.channels.fetch(channelId);
                    if (channel) {
                        const pingMsg = await channel.send(klient.toString());
                        await pingMsg.delete();
                    }
                } catch (channelError) {
                    console.error(`Nie udało się wysłać/usunąć pingu na kanale ${channelId}:`, channelError);
                }
            }

        } catch (error) {
            console.error("Wystąpił błąd podczas wykonywania komendy /f:", error);
            await interaction.followUp({ content: '`❌` Wystąpił nieoczekiwany błąd.', flags: 64 });
        }
    }
};