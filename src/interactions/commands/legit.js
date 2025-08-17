const { EmbedBuilder } = require('discord.js');

const config = require('../../config/reviewConfig');

module.exports = {
    name: 'legit',
    description: 'Wysyła wiadomość z prośbą o legit checka.',

    execute: async (interaction) => {
        

        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        const embed = new EmbedBuilder()
            .setDescription(`
### Cześć! Wystaw [(KLIKNIJ) FEEDBACKA](https://discord.com/channels/1382630829536182302/1382630833000812599) <a:verifypurple:1377116819206176819> Oraz [(KLIKNIJ) OPINIE O NAS](https://discord.com/channels/1382630829536182302/1382630833000812598)
*Przykładowy Feedback!*
- \`\`\`+rep @sprzedawca [ilość] [produkt oraz licencja] [czym płaciłeś]\`\`\`

-# Najlepsi - Silent Mafia <:sm:1372848095515381822>
`)
            .setColor('#6f21ff');

        interaction.channel.send({ embeds: [embed] });
        interaction.reply({ content: '> **Wysłano wiadomość z proźbą!**', flags: 64 });
    }
};
