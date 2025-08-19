const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Wysyła wybrany panel ticketów.',
    options: [
        {
            name: 'panel',
            description: 'Wybierz jaki panel chcesz wysłać.',
            type: 3,
            choices: [
                { name: 'bundle', value: 'bundle' },
                { name: 'discord', value: 'discord' },
                { name: 'fg', value: 'fg' },
                { name: 'hx', value: 'hx' },
                { name: 'ipvanish', value: 'ipvanish' },
                { name: 'keyser', value: 'keyser' },
                { name: 'macho', value: 'macho' },
                { name: 'machotemp', value: 'machotemp' },
                { name: 'other', value: 'other' },
                { name: 'fivem', value: 'fivem' },
                { name: 'red', value: 'red' },
                { name: 'redtemp', value: 'redtemp' },
                { name: 'silent', value: 'silent' },
                { name: 'steam', value: 'steam' },
                { name: 'support', value: 'support' },
                { name: 'freekeys', value: 'freekeys' },
                { name: 'tiago', value: 'tiago' },
                { name: 'tiagotemp', value: 'tiagotemp' },
                { name: 'unicore', value: 'unicore' },
                { name: 'zefirotemp', value: 'zefirotemp' },
                { name: 'susano', value: 'susano' },
                { name: 'unicore-marvels', value: 'unicore-marvels' },
                { name: 'applications', value: 'applications' }
            ],
            required: true,
        }
    ],

    execute: async (interaction) => {
        const config = require('../../config/reviewConfig');

        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        const panel = interaction.options.getString('panel');
        let embed, row;

        switch (panel) {
            case 'bundle':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:bundle:1382655741986471946> Fiv3M Bundle <:bundle:1382655741986471946>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Full Acces
<a:Verified_Purple_Animated:1382655410795843695> - 100% Working
<a:Verified_Purple_Animated:1382655410795843695> - Ready to Use
<a:Verified_Purple_Animated:1382655410795843695> - **St3am + disc0rd + Fiv3m Ready**

# <a:arrowpurple:1384626293139570781> **Bundle Pricing** <:bundle:1382655741986471946>
<a:arrowpurple:1384626293139570781> **Standard Bundle** - €0.47 / 1.99 PLN
<a:arrowpurple:1384626293139570781> **Aged Bundle (+2m Discord)** - €0.64 / 2.70 PLN

** <a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](${config.getPaymentsLink()})
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](${config.getVouchesLink()})  |  [Proofs](${config.getProofsLink()})  | [Reviews](${config.getReviewsLink()})
`)
                    .setColor('#6f21ff')
.setImage('https://media.discordapp.net/attachments/1382630836171706429/1384633903045935195/public.png?ex=6853244f&is=6851d2cf&hm=0b0ec25fa313c80f36a930360845f7edbc4388458644c6aaacffb72cacc3e45e&=&format=webp&quality=lossless');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_bundle`)
                        .setEmoji(`<:bundle:1382655741986471946>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'discord':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400614826916712558/DISCORD.png?ex=688f41f4&is=688df074&hm=1cd514753ee42940f84843d66a5585e46975b2575fbc571b08ee5e039e119d59&=&format=webp&quality=lossless')
                    .setDescription(`
# <:DISCORD:1358048371083837501> Disc0rd <:DISCORD:1358048371083837501>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Full Acces
<a:Verified_Purple_Animated:1358509562306760945> - 100% Working
<a:Verified_Purple_Animated:1358509562306760945> - Change Pass after purchase

# <a:arrowpurple:1358514479561965599> **Discord Pricing** <:DISCORD:1358048371083837501>
<a:arrowpurple:1358514479561965599> **Email Verified** - €0.15 / 0.65 PLN
<a:arrowpurple:1358514479561965599> **Full Verified** - €0.29 / 1.20 PLN - For Spoofing
<a:arrowpurple:1358514479561965599> **Aged + Full Verified** - €0.35 / 1.50 PLN - Premium

** <a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_discord`)
                        .setEmoji(`<:DISCORD:1358048371083837501>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'fg':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:FIVEM:1358048109824839833> FG Byp4ss <:FIVEM:1358048109824839833>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Working 
<a:Verified_Purple_Animated:1358509562306760945> - Method
<a:Verified_Purple_Animated:1358509562306760945> - you wont get banned so quickly

# <a:arrowpurple:1358514479561965599> **FG Bypass Pricing** <:FIVEM:1358048109824839833>
<a:arrowpurple:1358514479561965599> **Lifetime** - €3.5 / 15 PLN - Forever Access

** <a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
`)
                    .setColor('#6f21ff');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fg_tickets')
                        .setPlaceholder('🎫 Choose Your FG Bypass Option')
                        .addOptions([
                            {
                                label: 'Lifetime Access - €3.5 / 15 PLN',
                                description: 'Forever FG Bypass - Permanent Protection',
                                value: 'fg_lifetime',
                                emoji: '<:FIVEM:1358048109824839833>'
                            }
                        ])
                );
                break;
            case 'hx':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400615340064641056/HX.png?ex=688f426f&is=688df0ef&hm=c4fc84cc7c392ae2ea0de7eb02dc4cbfbfc62ac1deaa13070c5706da825b0687&=&format=webp&quality=lossless')
                    .setDescription(`
# <:hx:1359520884511211650> Hx S0ftwares <:hx:1359520884511211650>
<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1358509562306760945> - Trolling Features
<a:Verified_Purple_Animated:1358509562306760945> - Spoofer included
<a:Verified_Purple_Animated:1358509562306760945> - Good ESP
<a:Verified_Purple_Animated:1358509562306760945> - Resp Car

# <a:arrowpurple:1358514479561965599> <:hx:1359520884511211650>
<a:arrowpurple:1358514479561965599> **1 Day** - €5 / 20 PLN
<a:arrowpurple:1358514479561965599> **7 Days** - €9.99 / 42 PLN
<a:arrowpurple:1358514479561965599> **1 Month** - €13.99 / 59 PLN
<a:arrowpurple:1358514479561965599> **Lifetime** - €29.99 / 127 PLN

**<a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
**<a:arrowpurple:1358514479561965599>  <:ogl:1359180323715420312>  - Showcase: **[Click Click](https://youtu.be/KmKAjm1o_cs?si=7hrnk1el1naCjVTy)
`)
                    .setColor('#6f21ff');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('hx_tickets')
                        .setPlaceholder('🎫 Choose Your HX Software Plan')
                        .addOptions([
                            {
                                label: 'Daily Trial - €5 / 20 PLN',
                                description: '1 Day Access - Perfect for Testing',
                                value: 'hx_1day',
                                emoji: '<:hx:1359520884511211650>'
                            },
                            {
                                label: 'Weekly Plan - €9.99 / 42 PLN',
                                description: '7 Days Access - Popular Choice',
                                value: 'hx_7days',
                                emoji: '<:hx:1359520884511211650>'
                            },
                            {
                                label: 'Monthly Plan - €13.99 / 59 PLN',
                                description: '1 Month Access - Extended Usage',
                                value: 'hx_month',
                                emoji: '<:hx:1359520884511211650>'
                            },
                            {
                                label: 'Lifetime Plan - €29.99 / 127 PLN',
                                description: 'Forever Access - Best Investment',
                                value: 'hx_lifetime',
                                emoji: '<:hx:1359520884511211650>'
                            }
                        ])
                );
                break;
            case 'ipvanish':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400615459501375634/VAMISH.png?ex=688f428b&is=688df10b&hm=6a2aea83e2ab119a7fd50c64feca9e7294f8af9d727ad6abd7a99d620d130494&=&format=webp&quality=lossless')
                    .setDescription(`
# <:IPVANISH:1359436765315727432> IP Vanish <:IPVANISH:1359436765315727432> 

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - 100% Working
<a:Verified_Purple_Animated:1358509562306760945> - Ready to Use

# <a:arrowpurple:1358514479561965599>  <:IPVANISH:1359436765315727432>
<a:arrowpurple:1358514479561965599> **1 Year VPN** - €1.5 / 6.5 PLN - Full Privacy

** <a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
`)
                    .setColor('#6f21ff');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('ipvanish_tickets')
                        .setPlaceholder('🎫 Choose Your VPN Package')
                        .addOptions([
                            {
                                label: '1 Year VPN - €1.5 / 6.5 PLN',
                                description: 'Full Year Premium VPN - Complete Privacy',
                                value: 'ipvanish_year',
                                emoji: '<:IPVANISH:1359436765315727432>'
                            }
                        ])
                );
                break;
            case 'ventiq':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382631010902212662/1401217611336777758/RED.png?ex=688f7917&is=688e2797&hm=d5327905e8286aa02fea7f3882af53235c5f7bba07006409ad7c884b4ee69999&=&format=webp&quality=lossless')
                    .setDescription(`
# <:V_:1398725075334729840> **Ventiq** <:V_:1398725075334729840>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Silent Aim/Magic Bullet
<a:Verified_Purple_Animated:1358509562306760945> - Randomized Bullet Hitbox
<a:Verified_Purple_Animated:1358509562306760945> - Kill Through Walls / Telekill
<a:Verified_Purple_Animated:1358509562306760945> - Aimbot - Legitbot Mode (Simulates Skill)
<a:Verified_Purple_Animated:1358509562306760945> - Good ESP / Visuals (+23 options)
<a:Verified_Purple_Animated:1358509562306760945> - Desync / Lag Switch
<a:Verified_Purple_Animated:1358509562306760945> - Stealth Mode (Low Sound, Low Visibility)
<a:Verified_Purple_Animated:1358509562306760945> - Clear Bl00d
<a:Verified_Purple_Animated:1358509562306760945> - Ghost Mode
<a:Verified_Purple_Animated:1358509562306760945> - World Mods (Custom Time etc.)
<a:Verified_Purple_Animated:1358509562306760945> - Auto-Teleport after Kill
<a:Verified_Purple_Animated:1358509562306760945> - Spawn Vehicle (Safe, Custom Color)
<a:Verified_Purple_Animated:1358509562306760945> - Vehicle options (+22)
<a:Verified_Purple_Animated:1358509562306760945> - Weapon Spawner
<a:Verified_Purple_Animated:1358509562306760945> - Auto Triggerbot
<a:Verified_Purple_Animated:1358509562306760945> - Kill / Explode / Freeze Player
<a:Verified_Purple_Animated:1358509562306760945> - Cage Player / Trap in Objects
<a:Verified_Purple_Animated:1358509562306760945> - Visual Jail (Invisible Walls) And really more!
<a:Verified_Purple_Animated:1358509562306760945> - Crash All / Crash Selected Player
<a:Verified_Purple_Animated:1358509562306760945> - Ragdoll Everyone
<a:Verified_Purple_Animated:1358509562306760945> - Kick All From Vehicle
<a:Verified_Purple_Animated:1358509562306760945> - Event Logger
<a:Verified_Purple_Animated:1358509562306760945> - Annoy Everyone Sound Loop (polish servers working XD)
<a:Verified_Purple_Animated:1358509562306760945> - Mass TP
<a:Verified_Purple_Animated:1358509562306760945> - Spawn Lag Bots
<a:Verified_Purple_Animated:1358509562306760945> - Config Save / Load / Autosave
<a:Verified_Purple_Animated:1358509562306760945> - Language Selector

# <a:arrowpurple:1358514479561965599> **Ventiq Pricing** <:V_:1398725075334729840>
<a:arrowpurple:1358514479561965599> **Monthly** - €9.99 / 42 PLN 
<a:arrowpurple:1358514479561965599> **Lifetime** - €24.99 / 105 PLN

**<a:arrowpurple:1358514479561965599> <:applebank:1358048596229885952> - Payments:** [Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642) | [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352) | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
`)
                    .setColor('#6f21ff');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('ventiq_tickets')
                        .setPlaceholder('🎫 Choose Your Ventiq Plan')
                        .addOptions([
                            {
                                label: 'Monthly Plan - €9.99 / 42 PLN',
                                description: '1 Month Access - Popular Choice with All Features',
                                value: 'ventiq_month',
                                emoji: '<:V_:1398725075334729840>'
                            },
                            {
                                label: 'Lifetime Plan - €24.99 / 105 PLN',
                                description: 'Forever Access - Best Value & Unlimited Updates',
                                value: 'ventiq_lifetime',
                                emoji: '<:V_:1398725075334729840>'
                            }
                        ])
                );
                break;
            case 'keyser':
                embed = new EmbedBuilder()
                    .setImage('https://cdn.discordapp.com/attachments/1388555378643566663/1402629014606057533/fn_vk3y.png?ex=68949b90&is=68934a10&hm=b096117531ff208ea0709b4d4ab20f196313f56ea3803a8ffe08e3c433374693&')
                    .setDescription(`
# <:keyser:1358050517988806766> Keyser <:keyser:1358050517988806766>
<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1358509562306760945> - Trolling Features
<a:Verified_Purple_Animated:1358509562306760945> - Spoof weapon
<a:Verified_Purple_Animated:1358509562306760945> - Vehicle Features
<a:Verified_Purple_Animated:1358509562306760945> - Free Cam with Troll Options
<a:Verified_Purple_Animated:1358509562306760945> - Event Logger
<a:Verified_Purple_Animated:1358509562306760945> - Event Re-run
<a:Verified_Purple_Animated:1358509562306760945> - Event Executor
<a:Verified_Purple_Animated:1358509562306760945> - Cloud Config
<a:Verified_Purple_Animated:1358509562306760945> - Kill All
<a:Verified_Purple_Animated:1358509562306760945> - F*ck all vehicles
<a:Verified_Purple_Animated:1358509562306760945> - Spoofer included

# <a:arrowpurple:1358514479561965599> <:keyser:1358050517988806766>
- **1 Day - €4.99 / 20 PLN**
- **7 Days - €9.99 / 42 PLN**
- ** 1 Month - €13.99 / 59 PLN**
- ** Lifetime - €29.99 / 127 PLN**

**<a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599>  <:ogl:1275468768117653677> - Old Showcase: **[Click Click](https://www.youtube.com/watch?v=uNM3CKP3zmM&t=87s)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_keyser`)
                        .setEmoji(`<:keyser:1358050517988806766>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'macho':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:MachoLogo:1358051351246012599> Macho <:MachoLogo:1358051351246012599>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1358509562306760945> - Teleports
<a:Verified_Purple_Animated:1358509562306760945> - Good ESP
<a:Verified_Purple_Animated:1358509562306760945> - Trolling Features
<a:Verified_Purple_Animated:1358509562306760945> - Spoofer included
<a:Verified_Purple_Animated:1358509562306760945> - Lua Executor
<a:Verified_Purple_Animated:1358509562306760945> - Respawning Cars/Guns

# <a:arrowpurple:1358514479561965599>  <:MachoLogo:1358051351246012599>
- **1 Day - €4.70 / 20 PLN**
- **Week - €10 / 40 PLN**
- **Month - €20 / 80 PLN**
- **LifeTime - €62.5 /  261 PLN**

**<a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599>  <:ogl:1359180323715420312> - Showcase: **[Click Click](https://www.youtube.com/watch?v=oaiiRPWGTgA)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_macho`)
                        .setEmoji(`<:MachoLogo:1358051351246012599>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'machotemp':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:MachoLogo:1358051351246012599> Macho T3MP <:MachoLogo:1358051351246012599>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working 100%
<a:Verified_Purple_Animated:1358509562306760945> - Easy to Use
<a:Verified_Purple_Animated:1358509562306760945> - Servers UB
<a:Verified_Purple_Animated:1358509562306760945> - Fg UB

# <a:arrowpurple:1358514479561965599> <:MachoLogo:1358051351246012599>
- **1 Day - €3.3 / 14 PLN**
- **Week - €7.6 / 32 PLN**
- **Month - €14 / 60 PLN**
- **LifeTime - €43 /  180 PLN**

**<a:arrowpurple:1358514479561965599> <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599> <:ogl:1359180323715420312> - Showcase: **[Click Click](https://www.youtube.com/watch?v=oaiiRPWGTgA)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_macho_temp`)
                        .setEmoji(`<:MachoLogo:1358051351246012599>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'other':
                embed = new EmbedBuilder()
                    .setDescription(`
# ❔ Other ❔

<a:Animated_Arrow_Purple:1352384850732126280> ***description***
<a:Verified_Purple_Animated:1352386143064166495> - 100% Working
<a:Verified_Purple_Animated:1352386143064166495> - Full Acces (no ipvanish)
<a:Verified_Purple_Animated:1352386143064166495> - Ready for use

# <a:Animated_Arrow_Purple:1352384850732126280> ❔
- **FiveM Bundle Kit - €0.7 / 3 PLN**
- **1 Acc Steam - €0.03 / 0.10 PLN**
- **FG Bypass LifeTime - €2.5 / 10 PLN **
- **IP Vanish 1 Year - €2.2 / 9 PLN**
- **CS2 Acc | Premier Ready - €2.2 / 9 PLN | Only Prime - €1.8 / 7 PLN | Premier (4+ medals) - €3.5 / 15 PLN**

** <a:Animated_Arrow_Purple:1352384850732126280>  <:creditcard1:1352385084791062670> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:Animated_Arrow_Purple:1352384850732126280> <:legit:1352386976929681439> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_other`)
                        .setEmoji(`❔`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'fivem':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400616739586183288/FIVEM_READY.png?ex=688f43bc&is=688df23c&hm=1faf38c14edc1476f6b69e755c444d51e0a979e88b1a0c5f903f5b11032e06c8&=&format=webp&quality=lossless')
                    .setDescription(`
# <:Rockstar:1382655702606151680> **FiveM Ready** <:Rockstar:1382655702606151680>

<a:arrowpurple:1384626293139570781> ***Features & Benefits***
<a:Verified_Purple_Animated:1382655410795843695> • **Instant Delivery** - Get your account immediately
<a:Verified_Purple_Animated:1382655410795843695> • **Full Access** - Complete account control
<a:Verified_Purple_Animated:1382655410795843695> • **Ready to Unban** - Perfect for ban bypassing
<a:Verified_Purple_Animated:1382655410795843695> • **100% Working** - Tested and verified
<a:Verified_Purple_Animated:1382655410795843695> • **No Server Bans** - Clean account history

# <a:arrowpurple:1384626293139570781> **Pricing** <:Rockstar:1382655702606151680>
<a:arrowpurple:1358514479561965599> **Single Account** - €0.23 / 1 PLN
<a:arrowpurple:1358514479561965599> **Bundle Deal** - €1.4 / 6 PLN *(6 Accounts + 1 FREE)*

** <a:arrowpurple:1384626293139570781> <:applebank:1384626789627727904> - Payments:** [Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597) | [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800) | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
`)
                    .setColor('#6f21ff');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_ready_tickets')
                        .setPlaceholder('🎫 Choose Your FiveM Package')
                        .addOptions([
                            {
                                label: 'Single Account - €0.23 / 1 PLN',
                                description: '1 FiveM Ready Account - Instant Delivery',
                                value: 'fivem_single',
                                emoji: '<:legit:1358050707139330050>'
                            },
                            {
                                label: 'Bundle Deal - €1.4 / 6 PLN',
                                description: '6 Accounts + 1 FREE - Best Value!',
                                value: 'fivem_bundle',
                                emoji: '<:legit:1358050707139330050>'
                            }
                        ])
                );
                break;
            case 'red':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382631010902212662/1401217611336777758/RED.png?ex=688f7917&is=688e2797&hm=d5327905e8286aa02fea7f3882af53235c5f7bba07006409ad7c884b4ee69999&=&format=webp&quality=lossless')
                    .setDescription(`
# <:red:1359977337181180124> **Red Engine Premium** <:red:1359977337181180124> 

<a:arrowpurple:1358514479561965599> ***Ultimate FiveM Injection Tool***
<a:Verified_Purple_Animated:1358509562306760945> • **Instant Delivery** - Get access immediately
<a:Verified_Purple_Animated:1358509562306760945> • **100% Undetected** - Bypass all anticheats
<a:Verified_Purple_Animated:1358509562306760945> • **Silent Aim & Bullets** - Perfect accuracy
<a:Verified_Purple_Animated:1358509562306760945> • **Premium Interface** - Easy to use
<a:Verified_Purple_Animated:1358509562306760945> • **Advanced Features** - Trolling & more
<a:Verified_Purple_Animated:1358509562306760945> • **Lua Executor** - Inject any script
<a:Verified_Purple_Animated:1358509562306760945> • **Server Control** - Kill all, teleport, etc.
<a:Verified_Purple_Animated:1358509562306760945> • **Unlimited Power** - Add money, weapons & more

# <a:arrowpurple:1358514479561965599> **Pricing Plans** <:red:1359977337181180124>
**Weekly** - €13,99 / 57 PLN
**Monthly** - €24,99 / 99 PLN **Most Popular**
**Lifetime** - €59,99 / 250 PLN **Best Value**

**<a:arrowpurple:1358514479561965599> <:applebank:1358048596229885952> - Payments:** [Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642) | [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352) | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599> <:ogl:1359180323715420312> - Showcase:** [Watch Demo](https://www.youtube.com/watch?v=GEFcTMsDJ_c)
`)
                    .setColor('#6f21ff');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('red_engine_tickets')
                        .setPlaceholder('🎫 Choose Your Red Engine License')
                        .addOptions([
                            {
                                label: 'Weekly Plan - €13,99 / 57 PLN',
                                description: '7 Days of Ultimate Power - Perfect for Testing',
                                value: 'red_7days',
                                emoji: '<:red:1359977337181180124>'
                            },
                            {
                                label: 'Monthly Plan - €24,99 / 99 PLN',
                                description: '1 Month Access - Most Popular Choice',
                                value: 'red_month',
                                emoji: '<:red:1359977337181180124>'
                            },
                            {
                                label: 'Lifetime Plan - €59,99 / 250 PLN',
                                description: 'Forever Access - Best Value & Unlimited Updates',
                                value: 'red_lifetime',
                                emoji: '<:red:1359977337181180124>'
                            }
                        ])
                );
                break;
            case 'redtemp':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:red:1359977337181180124> Red Engin3 T3mp <:red:1359977337181180124> 
<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working 100%
<a:Verified_Purple_Animated:1358509562306760945> - Servers UB
<a:Verified_Purple_Animated:1358509562306760945> - Easy to Use
<a:Verified_Purple_Animated:1358509562306760945> - FG Unban
<a:Verified_Purple_Animated:1358509562306760945> - TX/EasyAdmin Unban
<a:Verified_Purple_Animated:1358509562306760945> - CFX Unban
<a:Verified_Purple_Animated:1358509562306760945> - All Antych33ts Unban


# <a:arrowpurple:1358514479561965599> <:red:1359977337181180124>
- **7 Days - €8 / 34.99 PLN**
- ** 1 Month - €15 / 65 PLN**
- ** Lifetime - €40 / 172 PLN**

**<a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599>  <:ogl:1359180323715420312> - Showcase: **[Click Click](https://www.youtube.com/watch?v=GEFcTMsDJ_c)
`)
                    .setColor('#6f21ff');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('red_temp_tickets')
                        .setPlaceholder('🎫 × Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Red Engine Temp - €8 / 34.99 PLN',
                                description: '7 Days',
                                value: 'red_7days'
                            },
                            {
                                label: 'Red Engine Temp - €15 / 65 PLN',
                                description: '1 Month',
                                value: 'red_month'
                            },
                            {
                                label: 'Red Engine Temp - €40 / 172 PLN',
                                description: 'Lifetime',
                                value: 'red_lifetime'
                            }
                        ])
                );
                break;
            case 'silent':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:hidepozdro:1358051265011126282> Silent <:hidepozdro:1358051265011126282>
<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working Sp00fer
<a:Verified_Purple_Animated:1358509562306760945> - 100% Unban
<a:Verified_Purple_Animated:1358509562306760945> - For Gobal Ban
<a:Verified_Purple_Animated:1358509562306760945> - Perm Sp00fer
<a:Verified_Purple_Animated:1358509562306760945> - Easy to use

# <a:arrowpurple:1358514479561965599> <:hidepozdro:1358051265011126282>
- **LifeTime - €3.5 / 15 PLN**

** <a:arrowpurple:1358514479561965599> <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_silent`)
                        .setEmoji(`<:hidepozdro:1358051265011126282>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'steam':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400617310586278029/STEAM.png?ex=688f4445&is=688df2c5&hm=a8bc0c263d6e17160a3d61e19dff2591631559dab935b7827ba11ae144b26b74&=&format=webp&quality=lossless')
                    .setDescription(`
# <:STEAM:1358048490571173989> St3am <:STEAM:1358048490571173989>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Full Acces
<a:Verified_Purple_Animated:1358509562306760945> - 100% Working
<a:Verified_Purple_Animated:1358509562306760945> - Ready to Use
<a:Verified_Purple_Animated:1358509562306760945> - Only for sp00f

# <a:arrowpurple:1358514479561965599> <:STEAM:1358048490571173989>
- **1 Acc St3am - €0.03 / 0.10 PLN**

** <a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_steam`)
                        .setEmoji(`<:STEAM:1358048490571173989>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'support':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:ticket:1401226055867433041> Tickets

> - <:support:1358051188758806579> **Support** - If you have a problem with a purchased product or want to ask a question.
> - <:silent:1395058293432516658> **Media Creator** - If you want us to be your sponsor

-# <:emoji22:1365678264789635122> Before opening the ticket, please read the https://discord.com/channels/1382630829536182302/1382630832510074943
                    `)
                    .setColor('#6f21ff')
                    .setImage('https://media.discordapp.net/attachments/1382630836171706431/1384617473176895609/image.png?ex=68a57ac2&is=68a42942&hm=1ed8e06a15abfb3e465b68d909f97a3e0877c7f79e413d81bf348d724b6e557a&=&format=webp&quality=lossless');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('applications')
                        .setPlaceholder('🎫 Wybierz rodzaj podania')
                        .addOptions([
                            { label: 'Support', description: 'Masz problem lub pytanie', value: 'support_application', emoji: '<:support:1358051188758806579>' },
                            { label: 'Media Creator', description: 'Chcesz, abyśmy byli Twoim sponsorem', value: 'media_application', emoji: '<:silent:1395058293432516658>' }
                        ])
                );
                break;
            case 'freekeys':
                embed = new EmbedBuilder()
                    .setDescription(`
# 🎁 Free Keys

Wybierz powód odbioru klucza z menu poniżej.
                    `)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('free_keys')
                        .setPlaceholder('Wybierz powód')
                        .addOptions([
                            { label: 'Content', value: 'content', emoji: '🎥' },
                            { label: 'Wideo', value: 'video', emoji: '📹' },
                            { label: 'Współpraca', value: 'collab', emoji: '🤝' },
                            { label: 'Promocja', value: 'promo', emoji: '📢' },
                            { label: 'Nagroda', value: 'reward', emoji: '🏆' },
                        ])
                );
                break;
            case 'tiago':
                embed = new EmbedBuilder()
                    .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400617426277761055/TIAGO.png?ex=688f4460&is=688df2e0&hm=978b35da15c33c8a36a786a319ea3717ea6469bb9dec4f028a82e05deae8b421&=&format=webp&quality=lossless')
                    .setDescription(`
# <:tiagomodz_logo:1358051116868178104> Tiago <:tiagomodz_logo:1358051116868178104> 

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1358509562306760945> - Teleports
<a:Verified_Purple_Animated:1358509562306760945> - So Good ESP
<a:Verified_Purple_Animated:1358509562306760945> - Trolling Features
<a:Verified_Purple_Animated:1358509562306760945> - Spoofer included
<a:Verified_Purple_Animated:1358509562306760945> - Lua Executor
<a:Verified_Purple_Animated:1358509562306760945> - Respawning Cars/Guns
<a:Verified_Purple_Animated:1358509562306760945> - Kill/Revive Player
<a:Verified_Purple_Animated:1358509562306760945> - Load Lua Menus
<a:Verified_Purple_Animated:1358509562306760945> - Stopping Resources
<a:Verified_Purple_Animated:1358509562306760945> - Dump Server + Detect FG

# <a:arrowpurple:1358514479561965599> **Pricing Plans** <:tiagomodz_logo:1358051116868178104>
**1 Day** - €3 / 12.99 PLN
**Week** - €8 / 34 PLN
**Month** - €18 / 75 PLN
**Lifetime** - €50 / 209 PLN **Best Value**

**<a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599> <:ogl:1359180323715420312> - Showcase: **[Click Click](https://youtu.be/H0-7SO_pUs4?feature=shared)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_tiago`)
                        .setEmoji(`<:tiagomodz_logo:1358051116868178104>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'tiagotemp':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:tiagomodz_logo:1358051116868178104> Tiago T3MP <:tiagomodz_logo:1358051116868178104> 

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working 100%
<a:Verified_Purple_Animated:1358509562306760945> - Servers UB
<a:Verified_Purple_Animated:1358509562306760945> - Easy to Use

# <a:arrowpurple:1358514479561965599> **Pricing Plans** <:tiagomodz_logo:1358051116868178104>
**1 Day** - €1 / 4.5 PLN
**Week** - €4 / 17 PLN
**Month** - €10 / 42 PLN
**Lifetime** - €35.9 / 150 PLN **Best Value**

**<a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979009006436352)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979010184773642)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599>  <:ogl:1359180323715420312> - Showcase: **[Click Click](https://youtu.be/H0-7SO_pUs4?feature=shared)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_tiago_temp`)
                        .setEmoji(`<:tiagomodz_logo:1358051116868178104>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'unicore':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:unincloud:1359425889208631459> Unicore <:unincloud:1359425889208631459>
<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working Silent Aim
<a:Verified_Purple_Animated:1358509562306760945> - Teleports
<a:Verified_Purple_Animated:1358509562306760945> - Working AimBot
<a:Verified_Purple_Animated:1358509562306760945> - Clean ESP

# <a:arrowpurple:1358514479561965599> **Pricing Plans** <:unincloud:1359425889208631459>
**2 Days** - €3.5 / 15 PLN
**7 Days** - €8.2 / 35 PLN
**1 Month** - €12 / 49 PLN **Popular**
**3 Months** - €30 / 120 PLN **Best Value**

**<a:arrowpurple:1358514479561965599> <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599> <:ogl:1359180323715420312> - Showcase: **[Click Click](https://www.youtube.com/watch?v=-CYejk5QWuk&t=6s)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_unicore`)
                        .setEmoji(`<:unincloud:1359425889208631459>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'zefirotemp':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:zefriobeztla:1359821211068272813> Zefiro T3mp <:zefriobeztla:1359821211068272813>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Undetected
<a:Verified_Purple_Animated:1358509562306760945> - Working 100%
<a:Verified_Purple_Animated:1358509562306760945> - Servers UB
<a:Verified_Purple_Animated:1358509562306760945> - Easy to Use
<a:Verified_Purple_Animated:1358509562306760945> - FG Unban
<a:Verified_Purple_Animated:1358509562306760945> - TX/EasyAdmin Unban
<a:Verified_Purple_Animated:1358509562306760945> - Global Unban


# <a:arrowpurple:1358514479561965599> <:zefriobeztla:1359821211068272813>
- **1 Day - €2.5 / 10 PLN**
- **Week - €7.2 / 25 PLN**
- **Month - €12 / 50 PLN**
- **3 Months - €18 / 75 PLN**
- **LifeTime - €22 /  90 PLN**

**<a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979009006436352)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979010184773642)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1358514479561965599>  <:ogl:1359180323715420312> - Showcase: **[Click Click](https://youtu.be/zzxyKymQljc?si=GR8GA8VrmcudcPSo)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_zefiro_temp`)
                        .setEmoji(`<:zefriobeztla:1359821211068272813>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'susano':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:susano:1381990556426702951> Susano <:susano:1381990556426702951>
<a:arrowpurple:1381991872095981692> ***description*** 
<a:Verified_Purple_Animated:1381993492305150052> - Instant Delivery
<a:Verified_Purple_Animated:1381993492305150052> - Undetected
<a:Verified_Purple_Animated:1381993492305150052> - StreamProof
<a:Verified_Purple_Animated:1381993492305150052> - Working Silent Aim/Bullets
<a:Verified_Purple_Animated:1381993492305150052> - Ped Spawner
<a:Verified_Purple_Animated:1381993492305150052> - Free Cam Explotion
<a:Verified_Purple_Animated:1381993492305150052> - Trolling Features
<a:Verified_Purple_Animated:1381993492305150052> - Ressource Blocker
<a:Verified_Purple_Animated:1381993492305150052> - Ressource Dumper
<a:Verified_Purple_Animated:1381993492305150052> - Spoof weapon
<a:Verified_Purple_Animated:1381993492305150052> - Vehicle Features
<a:Verified_Purple_Animated:1381993492305150052> - Event Logger
<a:Verified_Purple_Animated:1381993492305150052> - Event Executor
<a:Verified_Purple_Animated:1381993492305150052> - Spoofer included

# <a:arrowpurple:1381991872095981692> <:susano:1381990556426702951>
- **3 Days - €6 / 25 PLN**
- **7 Days - €12 / 50 PLN**
- ** 1 Month - €17 / 72 PLN**
- ** 3 Months - €30 / 127 PLN**
- ** Lifetime - €60 / 250 PLN**

**<a:arrowpurple:1381991872095981692>  <:applebank:1381992959582408807> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1381991872095981692> <:legit:1348050426666156162> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1381991872095981692>  <:ogl:1275468768117653677> - Old Showcase: **[Click Click](https://www.youtube.com/watch?v=k2RVs3l5waY)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_susano`)
                        .setEmoji(`<:susano:1381990556426702951>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'unicore-marvels':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:UNIRIVALS:1381993556905824438> Unicore - Marvel Rivals <:UNIRIVALS:1381993556905824438>
<a:arrowpurple:1381991872095981692> ***description***
<a:Verified_Purple_Animated:1381993492305150052> - Instant Delivery
<a:Verified_Purple_Animated:1381993492305150052> - Undetected
<a:Verified_Purple_Animated:1381993492305150052> - StreamProof
<a:Verified_Purple_Animated:1381993492305150052> - Smart Silent Aim with prediction
<a:Verified_Purple_Animated:1381993492305150052> - Legit Aimbot (FOV, Smooth, Hitbox selector)
<a:Verified_Purple_Animated:1381993492305150052> - Full ESP (Box, Skeleton, Health, Ultimate Charge, Glow, Hero Name)
<a:Verified_Purple_Animated:1381993492305150052> - Offscreen ESP with directional indicator
<a:Verified_Purple_Animated:1381993492305150052> - Character Transparency (see through self)
<a:Verified_Purple_Animated:1381993492305150052> - Dynamic FOV & Trigger Modes
<a:Verified_Purple_Animated:1381993492305150052> - Auto Config Load for selected heroes
<a:Verified_Purple_Animated:1381993492305150052> - Advanced Color Grading (Gamma, Saturation, Gain etc.)
<a:Verified_Purple_Animated:1381993492305150052> - Camera FOV Adjuster
<a:Verified_Purple_Animated:1381993492305150052> - LUA Scripts (beta) – e.g. auto-ping enemy, sound alerts
<a:Verified_Purple_Animated:1381993492305150052> - Config System & Custom Menu Key
<a:Verified_Purple_Animated:1381993492305150052> - Full HWID Spoofer included

# <a:arrowpurple:1381991872095981692> <:UNIRIVALS:1381993556905824438>
- **1 Day – €1.99 / 9.99 PLN**
- **7 Days – €6.90 / 27 PLN**
- **1 Month – €14.75 / 59 PLN**


**<a:arrowpurple:1381991872095981692> <:applebank:1381992959582408807> - Payments:** [Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1381991872095981692> <:legit:1348050426666156162> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979009006436352) | [Proofs](https://discord.com/channels/1357977845695119360/1357979010184773642) | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1381991872095981692> <:ogl:1381993324335861771> - Showcase:** [Click Click](https://www.youtube.com/watch?v=UB2IhK6ozQY)
`)
                    .setColor('#6f21ff');
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_unicore-marvels`)
                        .setEmoji(`<:UNIRIVALS:1381993556905824438>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                break;
            case 'applications':
                embed = new EmbedBuilder()
                    .setDescription(`
# <:ticket:1401226055867433041> Tickets

> - <:support:1358051188758806579> **Support** - If you have a problem with a purchased product or want to ask a question.
> - <:silent:1395058293432516658> **Media Creator** - If you want us to be your sponsor

-# <:emoji22:1365678264789635122> Before opening the ticket, please read the https://discord.com/channels/1382630829536182302/1382630832510074943
`)
                    .setColor('#6f21ff')
                    .setImage('https://media.discordapp.net/attachments/1382630836171706431/1384617473176895609/image.png?ex=68a57ac2&is=68a42942&hm=1ed8e06a15abfb3e465b68d909f97a3e0877c7f79e413d81bf348d724b6e557a&=&format=webp&quality=lossless');
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('applications')
                        .setPlaceholder('🎫 Wybierz rodzaj podania')
                        .addOptions([
                            {
                                label: 'Podanie na Media',
                                description: 'Aplikacja dla twórców contentu',
                                value: 'media_application',
                                emoji: '<:silent:1395058293432516658>'
                            },
                            {
                                label: 'Podanie na Support',
                                description: 'Aplikacja do zespołu wsparcia',
                                value: 'support_application',
                                emoji: '<:support:1358051188758806579>'
                            }
                        ])
                );
                break;
        }

        const components = selectRow ? [selectRow] : [row];
        interaction.channel.send({embeds: [embed], components: components});
        interaction.reply({ content: `> **Wysłano panel ticket ${panel}!**`, flags: 64 });
    }
};