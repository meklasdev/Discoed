const { ActionRowBuilder, TextInputStyle, TextInputBuilder, ModalBuilder } = require('discord.js');

const config = require('../../config/reviewConfig');

module.exports = {
    name: 'embed',
    description: 'Tworzy własną wiadomość w embedzie.',

    execute: async (interaction) => {
        

        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: 'Nie masz uprawnień do wykonania tej komendy.', flags: 64 });
        }

        let modal = new ModalBuilder()
            .setCustomId('embed_modal')
            .setTitle('EmbedCreator')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('title')
                        .setLabel('Tytuł:')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('description')
                        .setLabel('Opis:')
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('image')
                        .setLabel('Image URL:')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                )
            );
        interaction.showModal(modal);
    }
};
