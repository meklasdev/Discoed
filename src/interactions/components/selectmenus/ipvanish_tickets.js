const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId(`ticket_ipvanish`)
            .setTitle('IP Vanish - Ticket');

        const licenseField = new TextInputBuilder()
            .setCustomId('license')
            .setLabel('Type?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('1 Year IP Vanish')
            .setValue('1 Year')
            .setRequired(true);

        const paymentField = new TextInputBuilder()
            .setCustomId('payment')
            .setLabel('Your Payments?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('[all payments on #payments]')
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(licenseField),
            new ActionRowBuilder().addComponents(paymentField)
        );

        await interaction.showModal(modal);
    }
};