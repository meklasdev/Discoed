const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, row, selectRow;
        switch (selectedValue) {
            case 'red_engine':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382631010902212662/1401217611336777758/RED.png?ex=688f7917&is=688e2797&hm=d5327905e8286aa02fea7f3882af53235c5f7bba07006409ad7c884b4ee69999&=&format=webp&quality=lossless')
                    .setDescription(`
# <:red:1389181300912427159> Red Engin3 <:red:1389181300912427159>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1382655410795843695> - Easy To Use
<a:Verified_Purple_Animated:1382655410795843695> - Premium Menus
<a:Verified_Purple_Animated:1382655410795843695> - Trolling Features
<a:Verified_Purple_Animated:1382655410795843695> - Lua Executor
<a:Verified_Purple_Animated:1382655410795843695> - Dumper
<a:Verified_Purple_Animated:1382655410795843695> - Event L0gger
<a:Verified_Purple_Animated:1382655410795843695> - Stopper
<a:Verified_Purple_Animated:1382655410795843695> - Kill All
<a:Verified_Purple_Animated:1382655410795843695> - Teleport Everyone 
<a:Verified_Purple_Animated:1382655410795843695> - Trolling Server
<a:Verified_Purple_Animated:1382655410795843695> - Executor (you can inject anything you want any lua menu)
<a:Verified_Purple_Animated:1382655410795843695> - You can add money, weapons and much more


# <a:arrowpurple:1384626293139570781> <:red:1389181300912427159>
- <:PriceTag_USD:1403056060385853600> **7 Days - €13,99 / 57 PLN **
- <:PriceTag_USD:1403056060385853600> **1 Month - €24,99 / 99 PLN **
- <:PriceTag_USD:1403056060385853600> **Lifetime - €59,99 / 250 PLN **

**<a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781>  <:ogl:1382655256256843818> - Showcase: **[Click Click](https://www.youtube.com/watch?v=GEFcTMsDJ_c)

                    `);

                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_red_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Red Engine - €13,99 / 57 PLN',
                                description: 'Weekly',
                                value: 'fivem_red_7days'
                            },
                            {
                                label: 'Red Engine - €24,99 / 99 PLN',
                                description: 'Month',
                                value: 'fivem_red_month'
                            },
                            {
                                label: 'Red Engine - €59,99 / 250 PLN',
                                description: 'Lifetime (Best Value)',
                                value: 'fivem_red_lifetime'
                            }
                        ])
                );
                break;

            case 'keyser':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400615710824333453/KEYSER.png?ex=688f42c7&is=688df147&hm=63a64880e60bea8b72aa3b01d4a1e7b6e6bd2487c78d0a5c07af2dcc097bb5c9&=&format=webp&quality=lossless')
                    .setDescription(`
# <:keyser:1403055568461103134> Keyser <:keyser:1403055568461103134>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1384626247702675456> - Instant Delivery
<a:Verified_Purple_Animated:1384626247702675456> - Undetected
<a:Verified_Purple_Animated:1384626247702675456> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1384626247702675456> - Trolling Features
<a:Verified_Purple_Animated:1384626247702675456> - Spoof weapon
<a:Verified_Purple_Animated:1384626247702675456> - Vehicle Features
<a:Verified_Purple_Animated:1384626247702675456> - Free Cam with Troll Options
<a:Verified_Purple_Animated:1384626247702675456> - Event Logger
<a:Verified_Purple_Animated:1384626247702675456> - Event Re-run
<a:Verified_Purple_Animated:1384626247702675456> - Event Executor
<a:Verified_Purple_Animated:1384626247702675456> - Dump all resources
<a:Verified_Purple_Animated:1384626247702675456> - Cloud Config
<a:Verified_Purple_Animated:1384626247702675456> - Kill All
<a:Verified_Purple_Animated:1384626247702675456> - F*ck all vehicles
<a:Verified_Purple_Animated:1384626247702675456> - Spoofer included

# <a:arrowpurple:1384626293139570781> <:keyser:1403055568461103134>
- <:PriceTag_USD:1403056060385853600> **1 Day - €4.99 / 20 PLN**
- <:PriceTag_USD:1403056060385853600> **7 Days - €9.99 / 42 PLN**
- <:PriceTag_USD:1403056060385853600> **1 Month - €13.99 / 59 PLN**
- <:PriceTag_USD:1403056060385853600> **Lifetime - €35 / 148 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781>  <:ogl:1382655256256843818> - Old Showcase: **[Click Click](https://www.youtube.com/watch?v=uNM3CKP3zmM&t=87s)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_keyser`)
                        .setEmoji(`<:keyser:1403055568461103134>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_keyser_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Keyser - €4.99 / 20 PLN',
                                description: '1 Day',
                                value: 'fivem_keyser_1day',
                            },
                            {
                                label: 'Keyser - €9.99 / 42 PLN',
                                description: '7 Days',
                                value: 'fivem_keyser_7days',
                            },
                            {
                                label: 'Keyser - €13.99 / 59 PLN',
                                description: '1 Month',
                                value: 'fivem_keyser_month',
                            },
                            {
                                label: 'Keyser - €35 / 148 PLN',
                                description: 'Lifetime (Best Deal)',
                                value: 'fivem_keyser_lifetime',
                            }
                        ])
                );
                break;

           

            case 'unicore':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400617558972956836/UNICORE.png?ex=688f4480&is=688df300&hm=e02a12ca73611d70f535e648bbfca29fe4362d5fcb284645c99715a9f1411aac&=&format=webp&quality=lossless')
                    .setDescription(`
# <:unicloud:1382655674202198028> Unicore <:unicloud:1382655674202198028>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working Silent Aim
<a:Verified_Purple_Animated:1382655410795843695> - Teleports
<a:Verified_Purple_Animated:1382655410795843695> - Working AimBot
<a:Verified_Purple_Animated:1382655410795843695> - Clean ESP

# <a:arrowpurple:1384626293139570781> <:unicloud:1382655674202198028>
- <:PriceTag_USD:1403056060385853600> **2 Days - €3 / 11 PLN**
- <:PriceTag_USD:1403056060385853600> **7 Days - €5.9 / 25 PLN**
- <:PriceTag_USD:1403056060385853600> **1 Month - €10.6 / 45 PLN**
- <:PriceTag_USD:1403056060385853600> **3 Month - €30 / 119 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase: **[Click Click](https://www.youtube.com/watch?v=-CYejk5QWuk&t=6s)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_unicore`)
                        .setEmoji(`<:unicloud:1382655674202198028>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_unicore_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Unicore - €3 / 11 PLN',
                                description: '2 Days',
                                value: 'fivem_unicore_2days'
                            },
                            {
                                label: 'Unicore - €5.9 / 25 PLN',
                                description: 'Weekly',
                                value: 'fivem_unicore_7days'
                            },
                            {
                                label: 'Unicore - €10.6 / 45 PLN',
                                description: 'Month',
                                value: 'fivem_unicore_month'
                            },
                            {
                                label: 'Unicore - €30 / 119 PLN',
                                description: '3 Months',
                                value: 'fivem_unicore_3months'
                            }
                        ])
                );
                break;

            case 'hx':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400615340064641056/HX.png?ex=688f426f&is=688df0ef&hm=c4fc84cc7c392ae2ea0de7eb02dc4cbfbfc62ac1deaa13070c5706da825b0687&=&format=webp&quality=lossless')
                    .setDescription(`
# <:hx:1382653761088131152> Hx S0ftwares <:hx:1382653761088131152>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1382655410795843695> - Trolling Features
<a:Verified_Purple_Animated:1382655410795843695> - Spoofer included
<a:Verified_Purple_Animated:1382655410795843695> - Good ESP
<a:Verified_Purple_Animated:1382655410795843695> - Resp Guns
<a:Verified_Purple_Animated:1382655410795843695> - Resp Car

# <a:arrowpurple:1384626293139570781> <:hx:1382653761088131152>
- <:PriceTag_USD:1403056060385853600> **1 Day - €5 / 20 PLN**
- <:PriceTag_USD:1403056060385853600> **7 Days - €9.99 / 42 PLN**
- <:PriceTag_USD:1403056060385853600> ** 1 Month - €13.99 / 59 PLN**
- <:PriceTag_USD:1403056060385853600> ** Lifetime - €29.99 / 127 PLN**

**<a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
**<a:arrowpurple:1384626293139570781>  <:ogl:1382655256256843818>  - Showcase: **[Click Click](https://youtu.be/KmKAjm1o_cs?si=7hrnk1el1naCjVTy)

                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_hx`)
                        .setEmoji(`<:hx:1359520884511211650>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_hx_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Hx - €5 / 20 PLN',
                                description: '1 Day',
                                value: 'fivem_hx_1day',
                            },
                            {
                                label: 'Hx - €9.99 / 42 PLN',
                                description: '7 Days',
                                value: 'fivem_hx_7days',
                            },
                            {
                                label: 'Hx - €13.99 / 59 PLN',
                                description: '1 Month',
                                value: 'fivem_hx_month',
                            },
                            {
                                label: 'Hx - €29.99 / 127 PLN',
                                description: 'Lifetime',
                                value: 'fivem_hx_lifetime',
                            }
                        ])
                );
                break;

            case 'tiago':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400617426277761055/TIAGO.png?ex=688f4460&is=688df2e0&hm=978b35da15c33c8a36a786a319ea3717ea6469bb9dec4f028a82e05deae8b421&=&format=webp&quality=lossless')
                    .setDescription(`
# <:tiagomodz_logo:1384888331866734764> Tiago <:tiagomodz_logo:1384888331866734764>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1382655410795843695> - Teleports
<a:Verified_Purple_Animated:1382655410795843695> - So Good ESP
<a:Verified_Purple_Animated:1382655410795843695> - Trolling Features
<a:Verified_Purple_Animated:1382655410795843695> - Spoofer included
<a:Verified_Purple_Animated:1382655410795843695> - Lua Executor
<a:Verified_Purple_Animated:1382655410795843695> - Respawning Cars/Guns
<a:Verified_Purple_Animated:1382655410795843695> - Kill/Revive Player
<a:Verified_Purple_Animated:1382655410795843695> - Load Lua Menus
<a:Verified_Purple_Animated:1382655410795843695> - Stopping Resources
<a:Verified_Purple_Animated:1382655410795843695> - Dump Server + Detect FG

# <a:arrowpurple:1384626293139570781> <:tiagomodz_logo:1384888331866734764> 
- <:PriceTag_USD:1403056060385853600> **1 Day - €3 / 12.99 PLN**
- <:PriceTag_USD:1403056060385853600> **Week - €8 / 34 PLN**
- <:PriceTag_USD:1403056060385853600> **Month - €18 / 75 PLN**
- <:PriceTag_USD:1403056060385853600> **LifeTime - €50 /  209 PLN**

**<a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase: **[Click Click](https://youtu.be/H0-7SO_pUs4?feature=shared)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_tiago`)
                        .setEmoji(`<:tiagomodz_logo:1358051116868178104>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_tiago_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Tiago - €3 / 12.99 PLN',
                                description: '1 day',
                                value: 'fivem_tiago_1day'
                            },
                            {
                                label: 'Tiago - €8 / 34 PLN',
                                description: 'Weekly',
                                value: 'fivem_tiago_week'
                            },
                            {
                                label: 'Tiago - €18 / 75 PLN',
                                description: 'Month',
                                value: 'fivem_tiago_month'
                            },
                            {
                                label: 'Tiago - €50 / 209 PLN',
                                description: 'Lifetime',
                                value: 'fivem_tiago_lifetime'
                            }
                        ])
                );
                break;

            case 'macho':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400615987816169473/MACHO.png?ex=688f4309&is=688df189&hm=723a8f57895e5d12fd9181aa15e87a99314a3f90ac6d76e45da7c6b91e33e063&=&format=webp&quality=lossless')
                    .setDescription(`
# <:MachoLogo:1382657610355966063> Macho <:MachoLogo:1382657610355966063>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1382655410795843695> - Teleports
<a:Verified_Purple_Animated:1382655410795843695> - Good ESP
<a:Verified_Purple_Animated:1382655410795843695> - Trolling Features
<a:Verified_Purple_Animated:1382655410795843695> - Spoofer included
<a:Verified_Purple_Animated:1382655410795843695> - Lua Executor
<a:Verified_Purple_Animated:1382655410795843695> - Respawning Cars/Guns

# <a:arrowpurple:1384626293139570781>  <:MachoLogo:1382657610355966063>
- <:PriceTag_USD:1403056060385853600> **1 Day - €4.70 / 20 PLN**
- <:PriceTag_USD:1403056060385853600> **Week - €10 / 40 PLN**
- <:PriceTag_USD:1403056060385853600> **Month - €20 / 80 PLN**
- <:PriceTag_USD:1403056060385853600> **LifeTime - €62.5 /  261 PLN**

**<a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781>  <:ogl:1382655256256843818> - Showcase: **[Click Click](https://www.youtube.com/watch?v=oaiiRPWGTgA)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_macho`)
                        .setEmoji(`<:MachoLogo:1358051351246012599>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_macho_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Macho - €4.70 / 20 PLN',
                                description: '1 Day',
                                value: 'fivem_macho_1day',
                            },
                            {
                                label: 'Macho - €10 / 40 PLN',
                                description: '7 Days',
                                value: 'fivem_macho_week',
                            },
                            {
                                label: 'Macho - €20 / 80 PLN',
                                description: '1 Month',
                                value: 'fivem_macho_month',
                            },
                            {
                                label: 'Macho - €62.5 / 261 PLN',
                                description: 'Lifetime',
                                value: 'fivem_macho_lifetime',
                            }
                        ])
                );
                break;

            case 'ventiq':
                embed = new EmbedBuilder()
                    .setColor('#6f21ff')
                .setImage('https://media.discordapp.net/attachments/1382630835576111181/1404050570343481356/AMBANI_FIVEM.jpg?ex=6899c77d&is=689875fd&hm=b8419f06970cf8dec5ac7b989b5f2bdb7d8ec23399d5973cabe9d9c971f55293&=&format=webp')
                    .setDescription(`
# <:ambanilogo:1404047526591594538> Ambani <:ambanilogo:1404047526591594538>
<a:arrowpurple:1384626293139570781> ***description*** 
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected
<a:Verified_Purple_Animated:1382655410795843695> - Silent Aim/Magic Bullet
<a:Verified_Purple_Animated:1382655410795843695> - Randomized Bullet Hitbox
<a:Verified_Purple_Animated:1382655410795843695> - Kill Through Walls / Telekill
<a:Verified_Purple_Animated:1382655410795843695> - Aimbot - Legitbot Mode (Simulates Skill)
<a:Verified_Purple_Animated:1382655410795843695> - Good ESP / Visuals (+23 options)
<a:Verified_Purple_Animated:1382655410795843695> - Desync / Lag Switch
<a:Verified_Purple_Animated:1382655410795843695> - Stealth Mode (Low Sound, Low Visibility)
<a:Verified_Purple_Animated:1382655410795843695> - Clear Bl00d
<a:Verified_Purple_Animated:1382655410795843695> - Ghost Mode
<a:Verified_Purple_Animated:1382655410795843695> - World Mods (Custom Time  etc.)
<a:Verified_Purple_Animated:1382655410795843695> - Auto-Teleport after Kill
<a:Verified_Purple_Animated:1382655410795843695> - Spawn Vehicle (Safe, Custom Color)
<a:Verified_Purple_Animated:1382655410795843695> - Vehicle options (+22)
<a:Verified_Purple_Animated:1382655410795843695> - Weapon Spawner
<a:Verified_Purple_Animated:1382655410795843695> - Auto Triggerbot
<a:Verified_Purple_Animated:1382655410795843695> - Kill / Explode / Freeze Player
<a:Verified_Purple_Animated:1382655410795843695> - Cage Player / Trap in Objects
<a:Verified_Purple_Animated:1382655410795843695> - Visual Jail (Invisible Walls) And really more!
<a:Verified_Purple_Animated:1382655410795843695> - **Crash All / Crash Selected Player**
<a:Verified_Purple_Animated:1382655410795843695> - Ragdoll Everyone
<a:Verified_Purple_Animated:1382655410795843695> - Kick All From Vehicle
<a:Verified_Purple_Animated:1382655410795843695> - Event Logger
<a:Verified_Purple_Animated:1382655410795843695> - Annoy Everyone Sound Loop (polish servers working XD)c
<a:Verified_Purple_Animated:1382655410795843695> - Mass TP
<a:Verified_Purple_Animated:1382655410795843695> - Spawn Lag Bots
<a:Verified_Purple_Animated:1382655410795843695> - Config Save / Load / Autosave
<a:Verified_Purple_Animated:1382655410795843695> - Language Selector


# <a:arrowpurple:1384626293139570781> <:ambanilogo:1404047526591594538>
- <:PriceTag_USD:1403056060385853600> **Weekly - €4.99 / 19.99 PLN**
- <:PriceTag_USD:1403056060385853600> **Month - €9.99 / 42 PLN**
- <:PriceTag_USD:1403056060385853600> **Lifetime - €24.99 / 105 PLN**

**<a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781>  <:ogl:1382655256256843818> - Showcase (not mine): **[Click Click](https://www.youtube.com/watch?v=dF-iBnFsO-U)
                    `);
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('ventiq_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                                                        
                           {
                                label: 'Ambani - €4.99 / 19.99 PLN',
                                description: 'Weekly',
                                value: 'ventiq_weekly',
                            },
                            
                            {
                                label: 'Ambani - €9.99 / 42 PLN',
                                description: 'Month',
                                value: 'ventiq_month',
                            },
                            {
                                label: 'Ambani - €24.99 / 105 PLN',
                                description: 'Lifetime',
                                value: 'ventiq_lifetime',
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};