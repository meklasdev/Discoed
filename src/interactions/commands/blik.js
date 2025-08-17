const { EmbedBuilder } = require('discord.js');

const config = require('../../config/reviewConfig');

module.exports = {
    name: 'blik',
    description: 'Wysyła wiadomość z płatnością blik.',

    execute: async (interaction) => {
        

        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        const embed = new EmbedBuilder()
            .setDescription(`
# <:emoji22:1384624497784656035> Czesc!
-# Widze, ze placisz blikiem <:blik:1382655130117079184>, a wiec: 
> ***Przelej na numer:*** **\`577 774 646\`**
> ***Opis:*** \`Od [Nick]\`
- **Nastepnie napisz nam ze przelales i czekaj cierpliwie na swoj produkt <:legit:1384625637775507498>**
`)
            .setColor('#6f21ff');

        interaction.channel.send({ embeds: [embed] });
        interaction.reply({ content: '> **Wysłano wiadomość z płatnością blik!**', flags: 64 });
    }
};
