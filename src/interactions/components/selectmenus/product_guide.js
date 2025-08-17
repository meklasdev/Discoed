const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { buildPanel } = require('../../commands/products');

module.exports = {
    async execute(interaction) {
        const category = interaction.values[0];
        const { embed, row } = buildPanel(category);

        if (!embed || !row) {
            return interaction.reply({ content: 'Nieprawidłowa kategoria.', ephemeral: true });
        }

        const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('ticket_support')
                .setLabel('Otwórz ticket')
                .setEmoji('🎫')
                .setStyle(ButtonStyle.Secondary)
        );

        await interaction.reply({ embeds: [embed], components: [row, buttonRow], ephemeral: true });
    }
};
