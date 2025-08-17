const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        
        const modal = new ModalBuilder()
            .setCustomId(`ticket_discord`)
            .setTitle('Discord Account - Ticket');

        let licenseField, paymentField;

        switch (selectedValue) {
            case 'discord_email':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ weryfikacji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('E-Mail Verifi')
                    .setValue('E-Mail Verifi')
                    .setRequired(true);
                break;
            case 'discord_full':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ weryfikacji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Full Verifi (For Spoofing)')
                    .setValue('Full Verifi')
                    .setRequired(true);
                break;
            case 'discord_aged':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Typ weryfikacji?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('1+ Month + Full Verifi')
                    .setValue('1+ Month + Full Verifi')
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