const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_discord`)
            .setTitle('Discord Bundle - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'bundle_discord_3acc':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ bundle?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Discord Bundle 3 Acc')
                    .setValue('3 Accounts Bundle')
                    .setRequired(true);
                break;
            case 'bundle_discord_10acc':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ bundle?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Discord Bundle 10 Acc')
                    .setValue('10 Accounts Bundle')
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