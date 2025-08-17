const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_discord`)
            .setTitle('Discord Account Premium - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'premium_discord_email':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ weryfikacji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('E-Mail Verifi Premium')
                    .setValue('E-Mail Verifi Premium')
                    .setRequired(true);
                break;
            case 'premium_discord_full':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ weryfikacji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Full Verifi Premium (For Spoofing)')
                    .setValue('Full Verifi Premium')
                    .setRequired(true);
                break;
            case 'premium_discord_aged':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ weryfikacji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('2+ Month + Full Verifi Premium')
                    .setValue('2+ Month + Full Verifi Premium')
                    .setRequired(true);
                break;
        }

        paymentField = new TextInputBuilder()
            .setCustomId('payment')
            .setLabel('Sposób płatności?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('[wszystkie płatności w #💳┃payments]')
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(licenseField),
            new ActionRowBuilder().addComponents(paymentField)
        );

        await interaction.showModal(modal);
    }
};