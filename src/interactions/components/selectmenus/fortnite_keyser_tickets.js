const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        const modal = new ModalBuilder()
            .setCustomId('ticket_keyser_fortnite')
            .setTitle('K3yser Fortnite - Ticket');

        let licenseField;
        switch (selectedValue) {
            case 'fortnite_keyser_1day':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('K3yser Fortnite 1 Day')
                    .setValue('1 Day')
                    .setRequired(true);
                break;
            case 'fortnite_keyser_3day':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('K3yser Fortnite 3 Day')
                    .setValue('3 Day')
                    .setRequired(true);
                break;
            case 'fortnite_keyser_week':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('K3yser Fortnite Weekly')
                    .setValue('Weekly')
                    .setRequired(true);
                break;
            case 'fortnite_keyser_life':
                licenseField = new TextInputBuilder()
                    .setCustomId('license')
                    .setLabel('Type?')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('K3yser Fortnite Lifetime')
                    .setValue('Lifetime')
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
