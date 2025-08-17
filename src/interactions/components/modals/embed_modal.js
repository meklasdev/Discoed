const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const title = interaction.fields.getTextInputValue('title');
        const description = interaction.fields.getTextInputValue('description');
        const image = interaction.fields.getTextInputValue('image');

        const embed = new EmbedBuilder()
            .setDescription(description)
            .setColor(`#6f21ff`);

        if (title) {
            embed.setTitle(title);
        }

        try {
            if (image) {
                embed.setImage(image);
            }
        } catch (e) {
            console.log('Podczas wysyłania embedu link do zdjęcia został pominięty!');
        }

        interaction.reply({ content: '> Embed został wysłany!', flags: 64 });
        interaction.channel.send({ embeds: [embed] });
    }
}