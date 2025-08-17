const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_hx`)
            .setTitle('HX FiveM - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'fivem_hx_1day':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('HX FiveM 1 Day')
                    .setValue('1 Day')
                    .setRequired(true);
                break;
            case 'fivem_hx_7days':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('HX FiveM 7 Days')
                    .setValue('7 Days')
                    .setRequired(true);
                break;
            case 'fivem_hx_month':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('HX FiveM 1 Month')
                    .setValue('1 Month')
                    .setRequired(true);
                break;
            case 'fivem_hx_lifetime':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('HX FiveM Lifetime')
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