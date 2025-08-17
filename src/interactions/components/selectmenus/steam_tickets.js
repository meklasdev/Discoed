const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId(`ticket_steam`)
            .setTitle('Steam Account - Ticket');

        const amountField = new TextInputBuilder()
            .setCustomId('amount')
            .setLabel('Ilość kont?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('[1, 2, 10]')
            .setRequired(true);

        const paymentField = new TextInputBuilder()
            .setCustomId('payment')
            .setLabel('')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('[all payments on #payments]')
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(amountField),
            new ActionRowBuilder().addComponents(paymentField)
        );

        await interaction.showModal(modal);
    }
};