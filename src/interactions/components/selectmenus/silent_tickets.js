const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId(`ticket_silent`)
            .setTitle('Silent Spoofer - Ticket');

        const licenseField = new TextInputBuilder()
            .setCustomId('license')
            .setLabel('Type?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Silent Lifetime')
            .setValue('Lifetime')
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