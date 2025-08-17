const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'emotes',
    description: 'Wyświetla wszystkie emotki serwera w jednym embede.',

    execute: async (interaction) => {
        const emojis = interaction.guild?.emojis?.cache;

        if (!emojis || emojis.size === 0) {
            return interaction.reply({ content: 'Brak emotek na serwerze.', flags: 64 });
        }

        const sorted = [...emojis.values()].sort((a, b) => a.name.localeCompare(b.name));
        const lines = sorted.map(e => `${e.toString()} - \`:${e.name}:\``);

        const descriptions = [];
        let current = '';
        for (const line of lines) {
            if (current.length + line.length + 1 > 4096) {
                descriptions.push(current);
                current = '';
            }
            current += `${line}\n`;
        }
        if (current) descriptions.push(current);

        const embeds = descriptions.map((desc, index) =>
            new EmbedBuilder()
                .setTitle(index === 0 ? 'Emotki serwera' : null)
                .setColor('#6f21ff')
                .setDescription(desc)
        );

        await interaction.reply({ embeds, flags: 64 });
    }
};
