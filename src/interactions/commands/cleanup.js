module.exports = {
    name: 'cleanup',
    description: 'Usuwa wybraną liczbę ostatnich wiadomości z kanału.',
    options: [
        {
            name: 'amount',
            description: 'Ilość wiadomości do usunięcia (1-100).',
            type: 4,
            required: true
        }
    ],
    async execute(interaction) {
        const config = require('../../config/reviewConfig');
        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: 'Nie masz uprawnień do wykonania tej komendy.', flags: 64 });
        }

        const amount = interaction.options.getInteger('amount');
        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Podaj liczbę z zakresu 1-100.', flags: 64 });
        }

        try {
            const messages = await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({ content: `Usunięto ${messages.size} wiadomości.`, flags: 64 });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Nie udało się usunąć wiadomości.', flags: 64 });
        }
    }
};
