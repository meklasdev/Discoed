const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, selectRow;
        switch (selectedValue) {
            case 'fortnite_keyser':
                embed = new EmbedBuilder()
                    .setColor('#6f21ff')
                    .setImage('https://cdn.discordapp.com/attachments/1388555378643566663/1402629014606057533/fn_vk3y.png?ex=68949b90&is=68934a10&hm=b096117531ff208ea0709b4d4ab20f196313f56ea3803a8ffe08e3c433374693&')
                    .setDescription(`
# <:keyser:1403055568461103134> K3yser Fortnite <:keyser:1403055568461103134>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1384626247702675456> - Instant Delivery
<a:Verified_Purple_Animated:1384626247702675456> - Undetected
<a:Verified_Purple_Animated:1384626247702675456> - Aimbot
<a:Verified_Purple_Animated:1384626247702675456> - Triggerbot
<a:Verified_Purple_Animated:1384626247702675456> - Clean ESP

# <a:arrowpurple:1384626293139570781> <:keyser:1403055568461103134>
- **<:PriceTag_USD:1403056060385853600> 1 Day - €9.99 / 42 PLN**
- **<:PriceTag_USD:1403056060385853600> 3 Day - €17.99 / 76 PLN**
- *<:PriceTag_USD:1403056060385853600> *Weekly - €31.99 / 136 PLN**
- **<:PriceTag_USD:1403056060385853600> Lifetime - €65.99 / 280 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase:** [Click Click](https://www.youtube.com/watch?v=ViF1G824g7g)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fortnite_keyser_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'K3yser - €9.99 / 42 PLN',
                                description: '1 Day',
                                value: 'fortnite_keyser_1day'
                            },
                            {
                                label: 'K3yser - €17.99 / 76 PLN',
                                description: '3 Day',
                                value: 'fortnite_keyser_3day'
                            },
                            {
                                label: 'K3yser - €31.99 / 136 PLN',
                                description: 'Weekly',
                                value: 'fortnite_keyser_week'
                            },
                            {
                                label: 'K3yser - €65.99 / 280 PLN',
                                description: 'Lifetime',
                                value: 'fortnite_keyser_life'
                            }
                        ])
                );
                break;
            case 'fortnite_ventiq':
                embed = new EmbedBuilder()
                    .setColor('#6f21ff')
                    .setImage('https://media.discordapp.net/attachments/1382630835576111181/1404050570591080490/ambani_fn.jpg?ex=6899c77e&is=689875fe&hm=1fa860eb32c39d31439faec180530cdd5e4f2a1bef30d1d5438a6da4377aae60&=&format=webp')
                    .setDescription(`
# <:ambanilogo:1404047526591594538> Ambani Fortnite <:ambanilogo:1404047526591594538>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Aimbot
<a:Verified_Purple_Animated:1382655410795843695> - Good ESP

# <a:arrowpurple:1384626293139570781> <:ambanilogo:1404047526591594538>
- **<:PriceTag_USD:1403056060385853600> 1 Day - €4.99 / 20 PLN**
- **<:PriceTag_USD:1403056060385853600> Weekly - €29.99 / 127 PLN**
- *<:PriceTag_USD:1403056060385853600> *Monthly - €59.99 / 250 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase:** [Click Click](https://www.youtube.com/)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fortnite_ventiq_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Ventiq - €4.99 / 20 PLN',
                                description: '1 Day',
                                value: 'fortnite_ventiq_1day'
                            },
                            {
                                label: 'Ventiq - €29.99 / 127 PLN',
                                description: 'Weekly',
                                value: 'fortnite_ventiq_week'
                            },
                            {
                                label: 'Ventiq - €59.99 / 250 PLN',
                                description: 'Monthly',
                                value: 'fortnite_ventiq_month'
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};
