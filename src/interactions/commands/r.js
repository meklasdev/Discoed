const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'r',
    description: 'Zmienia nazwę aktualnego kanału.',
    options: [
        {
            name: 'nazwa',
            description: 'Nowa nazwa kanału',
            type: 3,
            required: true
        }
    ],

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
