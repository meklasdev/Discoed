const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_tiago`)
            .setTitle('Tiago FiveM - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'fivem_tiago_1day':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Tiago FiveM 1 Day')
                    .setValue('1 Day')
                    .setRequired(true);
                break;
            case 'fivem_tiago_week':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Tiago FiveM Week')
                    .setValue('Week')
                    .setRequired(true);
                break;
            case 'fivem_tiago_month':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Tiago FiveM Month')
                    .setValue('Month')
                    .setRequired(true);
                break;
            case 'fivem_tiago_lifetime':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Tiago FiveM Lifetime')
                    .setValue('Lifetime')
                    .setRequired(true);
                break;
        }

        paymentField = new TextInputBuilder()
            .setCustomId('payment')
            .setLabel('Your Payments?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Select Product | Wybierz Produkt')
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(licenseField),
            new ActionRowBuilder().addComponents(paymentField)
        );

        await interaction.showModal(modal);
    }
};