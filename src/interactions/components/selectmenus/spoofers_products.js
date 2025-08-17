const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, row, selectRow;
        switch (selectedValue) {
            case 'red_engine':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400616879395180654/RED.png?ex=6890955e&is=688f43de&hm=b987ed36bc5068ea84fe6f12e7a2c2113f82e0eaaff731e8ce99b61e202d199c&=&format=webp&quality=lossless')
                    .setDescription(`
# <:red:1389181300912427159> Red Engin3 T3mp <:red:1389181300912427159>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working 100%
<a:Verified_Purple_Animated:1382655410795843695> - Servers UB
<a:Verified_Purple_Animated:1382655410795843695> - Easy to Use
<a:Verified_Purple_Animated:1382655410795843695> - FG Unban
<a:Verified_Purple_Animated:1382655410795843695> - TX/EasyAdmin Unban
<a:Verified_Purple_Animated:1382655410795843695> - CFX Unban
<a:Verified_Purple_Animated:1382655410795843695> - All Antych33ts Unban


# <a:arrowpurple:1384626293139570781> <:red:1389181300912427159>
- <:PriceTag_USD:1403056060385853600> **7 Days - €8 / 34.99 PLN**
- <:PriceTag_USD:1403056060385853600> ** 1 Month - €15 / 65 PLN**
- <:PriceTag_USD:1403056060385853600> ** Lifetime - €40 / 172 PLN**

**<a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781>  <:ogl:1382655256256843818> - Showcase: **[Click Click](https://www.youtube.com/watch?v=GEFcTMsDJ_c)

                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('red_engine_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Red Engine - €8 / 34.99 PLN',
                                description: '7 Days',
                                value: 'red_7days',
                            },
                            {
                                label: 'Red Engine - €15 / 65 PLN',
                                description: '1 Month',
                                value: 'red_month',
                            },
                            {
                                label: 'Red Engine - €40 / 172 PLN',
                                description: 'Lifetime',
                                value: 'red_lifetime',
                            }
                        ])
                );
                break;

            case 'tiago':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400617426277761055/TIAGO.png?ex=689095e0&is=688f4460&hm=4433dd6d0b1f5d272a20163e6f9e570008b237ea403d6c60b7f8cc821cb8e840&=&format=webp&quality=lossless')
                    .setDescription(`
# <:tiagomodz_logo:1384888331866734764> Tiago T3MP <:tiagomodz_logo:1384888331866734764>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working 100%
<a:Verified_Purple_Animated:1382655410795843695> - Servers UB
<a:Verified_Purple_Animated:1382655410795843695> - Easy to Use

# <a:arrowpurple:1384626293139570781> <:tiagomodz_logo:1384888331866734764>
- <:PriceTag_USD:1403056060385853600> **1 Day - €1 / 4.5 PLN**
- <:PriceTag_USD:1403056060385853600> **Week - €4 / 17 PLN**
- <:PriceTag_USD:1403056060385853600> **Month - €10 / 42 PLN**
- <:PriceTag_USD:1403056060385853600> **LifeTime - €35.9 /  150 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979009006436352)  |  [Proofs](https://discord.com/channels/1382630829536182302/1382630833000812597)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781>  <:ogl:1382655256256843818> - Showcase: **[Click Click](https://youtu.be/H0-7SO_pUs4?feature=shared)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('tiago_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Tiago- €1 / 4.5 PLN',
                                description: '1 Day',
                                value: 'tiago_1day',
                            },
                            {
                                label: 'Tiago - €4 / 17 PLN',
                                description: '7 Day',
                                value: 'tiago_week',
                            },
                            {
                                label: 'Tiago - €10 / 42 PLN',
                                description: '1 Month',
                                value: 'tiago_month',
                            },
                            {
                                label: 'Tiago - €35.9 /  150 PLN',
                                description: 'Lifetime',
                                value: 'tiago_lifetime',
                            }
                        ])
                );
                break;

            case 'macho':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400615987816169473/MACHO.png?ex=68909489&is=688f4309&hm=3c76735c924fb1743bf3a5b563659de0fdc79cd85a1cee609eafb9806081b464&=&format=webp&quality=lossless')
                    .setDescription(`
# <:MachoLogo:1382657610355966063> Macho T3MP <:MachoLogo:1382657610355966063>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working 100%
<a:Verified_Purple_Animated:1382655410795843695> - Easy to Use
<a:Verified_Purple_Animated:1382655410795843695> - Servers UB
<a:Verified_Purple_Animated:1382655410795843695> - Fg UB

# <a:arrowpurple:1384626293139570781> <:MachoLogo:1382657610355966063>
- <:PriceTag_USD:1403056060385853600> **1 Day - €3.3 / 14 PLN**
- <:PriceTag_USD:1403056060385853600> **Week - €7.6 / 32 PLN**
- <:PriceTag_USD:1403056060385853600> **Month - €14 / 60 PLN**
- <:PriceTag_USD:1403056060385853600> **LifeTime - €43 /  180 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase: **[Click Click](https://www.youtube.com/watch?v=oaiiRPWGTgA)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('macho_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Macho - €3.3 / 14 PLN',
                                description: '1 Day',
                                value: 'macho_1day',
                            },
                            {
                                label: 'Macho - €7.6 / 32 PLN',
                                description: '7 Days',
                                value: 'macho_week',
                            },
                            {
                                label: 'Macho - €14 / 60 PLN',
                                description: '1 Month',
                                value: 'macho_month',
                            },
                            {
                                label: 'Macho - €43 /  180 PLN',
                                description: 'Lifetime',
                                value: 'macho_lifetime',
                            }
                        ])
                );
                break;

            case 'silent':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1401643258983092305/SILENT.png?ex=68910582&is=688fb402&hm=7349de402ce805f9fcec80e4c72e2fcdc560a7eab07cb026ac87a91c638234bb&=&format=webp&quality=lossless')
                    .setDescription(`
# <:hidepozdro:1384887156517900331> Silent Project <:hidepozdro:1384887156517900331>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working Sp00fer
<a:Verified_Purple_Animated:1382655410795843695> - 100% Unban
<a:Verified_Purple_Animated:1382655410795843695> - For Gobal Ban
<a:Verified_Purple_Animated:1382655410795843695> - Perm Sp00fer
<a:Verified_Purple_Animated:1382655410795843695> - Easy to use

# <a:arrowpurple:1384626293139570781> <:hidepozdro:1384887156517900331>
- <:PriceTag_USD:1403056060385853600> **LifeTime - €3.5 / 15 PLN**

** <a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('silent_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Silent - €3.5 / 15 PLN',
                                description: 'Lifetime - Permanent unban',
                                value: 'silent_lifetime',
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};