const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r')
        .setDescription('Zmienia nazwę aktualnego kanału.')
        .addStringOption(option =>
            option.setName('nazwa')
                .setDescription('Nowa nazwa kanału')
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: '> ❌ Nie masz uprawnień do zmiany nazwy kanału.', ephemeral: true });
        }

        const newName = interaction.options.getString('nazwa');
        const currentName = interaction.channel.name;

        try {
            await interaction.channel.setName(newName);
            await interaction.reply({
                content: `> ✅ Nazwa kanału została zmieniona z **${currentName}** na **${newName}**.`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Błąd podczas zmiany nazwy kanału:', error);
            await interaction.reply({ content: '> ❌ Nie udało się zmienić nazwy kanału.', ephemeral: true });
        }
    }
};
