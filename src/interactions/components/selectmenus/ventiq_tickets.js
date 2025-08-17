const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_ventiq`)
            .setTitle('Ventiq - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'ventiq_month':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('License Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Ventiq 1 Month')
                    .setValue('1 Month')
                    .setRequired(true);
                break;
                   case 'ventiq_weekly':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('License Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Ventiq Weekly')
                    .setValue('Weekly')
                    .setRequired(true);
                break;
            case 'ventiq_lifetime':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('License Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Ventiq Lifetime')
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