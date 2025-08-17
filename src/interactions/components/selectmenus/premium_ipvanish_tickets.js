const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId(`ticket_ipvanish`)
            .setTitle('IP Vanish Premium - Ticket');

        const licenseField = new TextInputBuilder()
            .setCustomId('license')
            .setLabel('Typ licencji?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('1 Year IP Vanish Premium')
            .setValue('1 Year Premium')
            .setRequired(true);

        const paymentField = new TextInputBuilder()
            .setCustomId('payment')
            .setLabel('Sposób płatności?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('[wszystkie płatności w #💳┃payments]')
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(licenseField),
            new ActionRowBuilder().addComponents(paymentField)
        );

        await interaction.showModal(modal);
    }
};