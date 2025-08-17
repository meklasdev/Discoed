const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, selectRow;
        switch (selectedValue) {
            case 'valorant_ventiq':
                embed = new EmbedBuilder()
                    .setColor('#6f21ff')
                    .setImage('https://media.discordapp.net/attachments/1382630835576111181/1404050570825699388/ambani_valo.jpg?ex=6899c77e&is=689875fe&hm=7cc0b1fc536b7ddbe0ebbba83f81349ef7395fb42f062290602bb5e7ada0af58&=&format=webp')
                    .setDescription(`
# <:ambanilogo:1404047526591594538> Ambani Valorant <:ambanilogo:1404047526591594538>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Aimbot
<a:Verified_Purple_Animated:1382655410795843695> - Custom RCS Strength
<a:Verified_Purple_Animated:1382655410795843695> - Easy custom ESP
<a:Verified_Purple_Animated:1382655410795843695> - Traps
<a:Verified_Purple_Animated:1382655410795843695> - Spike (Name, Timer, Sections)

# <a:arrowpurple:1384626293139570781> <:ambanilogo:1404047526591594538>
- **<:PriceTag_USD:1403056060385853600> 1 Day - €4.99 / 20 PLN**
- **<:PriceTag_USD:1403056060385853600> Weekly - €29.99 / 127 PLN**
- **<:PriceTag_USD:1403056060385853600> Monthly - €59.99 / 250 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase:** [Click Click](https://www.youtube.com/)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('valorant_ventiq_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Ventiq - €4.99 / 20 PLN',
                                description: '1 Day',
                                value: 'valorant_ventiq_1day'
                            },
                            {
                                label: 'Ventiq - €29.99 / 127 PLN',
                                description: 'Weekly',
                                value: 'valorant_ventiq_week'
                            },
                            {
                                label: 'Ventiq - €59.99 / 250 PLN',
                                description: 'Monthly',
                                value: 'valorant_ventiq_month'
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};
