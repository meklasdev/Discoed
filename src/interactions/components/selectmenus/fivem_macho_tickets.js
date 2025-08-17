const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_macho`)
            .setTitle('Macho FiveM - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'fivem_macho_1day':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Macho FiveM 1 Day')
                    .setValue('1 Day')
                    .setRequired(true);
                break;
            case 'fivem_macho_week':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Macho FiveM Week')
                    .setValue('Week')
                    .setRequired(true);
                break;
            case 'fivem_macho_month':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Macho FiveM Month')
                    .setValue('Month')
                    .setRequired(true);
                break;
            case 'fivem_macho_lifetime':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ licencji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Macho FiveM Lifetime')
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