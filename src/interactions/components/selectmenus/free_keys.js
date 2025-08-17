const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const value = interaction.values[0];
        const reasonMap = {
            content: 'Content',
            video: 'Wideo',
            collab: 'Współpraca',
            promo: 'Promocja',
            reward: 'Nagroda'
        };

        const modal = new ModalBuilder()
            .setCustomId('ticket_free_keys')
            .setTitle('Odbiór klucza');

        const reasonField = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Powód')
            .setStyle(TextInputStyle.Short)
            .setValue(reasonMap[value] || 'Inny')
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(reasonField));

        await interaction.showModal(modal);
    }
};
