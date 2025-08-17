const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_fg`)
            .setTitle('FG Bypass - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'fg_lifetime':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('FG Bypass Lifetime')
                    .setValue('Lifetime')
                    .setRequired(true);
                break;
        }

        paymentField = new TextInputBuilder()
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