const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        const modal = new ModalBuilder()
            .setCustomId('ticket_ventiq_valorant')
            .setTitle('Ventiq Valorant - Ticket');

        let licenseField;
        switch (selectedValue) {
            case 'valorant_ventiq_1day':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('License Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Ventiq Valorant 1 Day')
                    .setValue('1 Day')
                    .setRequired(true);
                break;
            case 'valorant_ventiq_week':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('License Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Ventiq Valorant Weekly')
                    .setValue('Weekly')
                    .setRequired(true);
                break;
            case 'valorant_ventiq_month':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('License Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Ventiq Valorant Monthly')
                    .setValue('Monthly')
                    .setRequired(true);
                break;
        }

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
