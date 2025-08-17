module.exports = {
    name: 'wiadomosc',
    description: 'Tworzy własną wiadomość.',
    options: [
        {
            name: 'tresc',
            description: 'Podaj treść wiadomości.',
            type: 3,
            required: true
        },
        {
            name: 'zdjecie',
            description: 'Opcjonalnie dodaj zdjęcie.',
            type: 11,
            required: false
        }
    ],

    execute: async (interaction) => {
        const config = require('../../config/reviewConfig');

        const content = interaction.options.getString('tresc');
        const image = interaction.options.getAttachment('zdjecie');

        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: 'Nie masz uprawnień do wykonania tej komendy.', flags: 64 });
        }
        interaction.reply({ content: `Wysłano!`, flags: 64 });
        interaction.channel.send({content: `${content}`})
        if (image) {
            await interaction.channel.send({ files: [{ attachment: image.url }] });
        }
    }
};
