const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_fivem`)
            .setTitle('FiveM Ready Premium - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'premium_fivem_single':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('What Type Of Licence?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('1 Account FiveM Ready Premium')
                    .setValue('1 Account Premium')
                    .setRequired(true);
                break;
            case 'premium_fivem_bundle':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('What Type Of Licence?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('6+1 Gratis FiveM Ready Premium')
                    .setValue('6+1 Gratis Premium')
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