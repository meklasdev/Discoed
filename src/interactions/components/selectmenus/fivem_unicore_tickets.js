const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_unicore`)
            .setTitle('Unicore FiveM - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'fivem_unicore_2days':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Unicore FiveM 2 Days')
                    .setValue('2 Days')
                    .setRequired(true);
                break;
            case 'fivem_unicore_7days':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Unicore FiveM 7 Days')
                    .setValue('7 Days')
                    .setRequired(true);
                break;
            case 'fivem_unicore_month':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Unicore FiveM 1 Month')
                    .setValue('1 Month')
                    .setRequired(true);
                break;
            case 'fivem_unicore_3months':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Unicore FiveM 3 Months')
                    .setValue('3 Months')
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