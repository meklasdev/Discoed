const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_fivem`)
            .setTitle('FiveM Bundle - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'bundle_fivem_standard':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type bundle?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('FiveM Bundle Standard')
                    .setValue('1 Bundle Standard')
                    .setRequired(true);
                break;
            case 'bundle_fivem_aged':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type bundle?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('FiveM Bundle Aged +2m')
                    .setValue('1 Bundle Aged +2m')
                    .setRequired(true);
                break;
        }

        paymentField = new TextInputBuilder()
            .setCustomId('payment')
            .setLabel('Your Payment?')
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