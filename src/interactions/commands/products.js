const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const config = require('../../config/reviewConfig');

const panelChoices = [
    { name: 'fivem', value: 'fivem' },
    { name: 'spoofer', value: 'spoofer' },
    { name: 'premium', value: 'premium' },
    { name: 'bundle', value: 'bundle' },
    { name: 'fortnite', value: 'fortnite' },
    { name: 'valorant', value: 'valorant' }
];
function buildPanel(panel) {
    let embed, row;
    switch (panel) {
            case 'fivem':
                embed = new EmbedBuilder()
                    .setDescription(`
## FiveM Products
-# Products available from us:
> - **<:red:1389181300912427159> ×** R3d Eng1ne
> - **<:keyser:1403055568461103134> ×** K3yser
> - **<:ambanilogo:1404047526591594538> ×** Amb4ni
> - **<:unicloud:1382655674202198028> × **Un1core 
> - **<:hx:1382653761088131152> ×** Hx S0ftware
> - **<:tiagomodz_logo:1384888331866734764> ×** Ti4go
> - **<:MachoLogo:1382657610355966063> ×** M4cho

Select *products*.
Click on ticket *after select*.
Auto buy *[website here](https://silentmafia.pl)*`)
                    .setImage('https://i.imgur.com/6rdsuJZ.png')
                    .setColor('#6f21ff');

                row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_products')
                        .setPlaceholder('❌ × Click to select | Kliknij aby wybrać')
                        .addOptions([
                            {
                                label: 'R3d Eng1ne',
                                emoji: '1389181300912427159',
                                description: 'See the price and open a ticket R3d Eng1ne.',
                                value: 'red_engine',
                            },
                            {
                                label: 'K3yser',
                                emoji: '1403055568461103134',
                                description: 'See the price and open a ticket K3yser.',
                                value: 'keyser',
                            },
                            {
                                label: 'Amb4ni',
                                emoji: '1404047526591594538',
                                description: 'See the price and open a ticket Amb4ni.',
                                value: 'ventiq',
                            },
                            {
                                label: 'Un1core',
                                emoji: '1382655674202198028',
                                description: 'See the price and open a ticket Un1core.',
                                value: 'unicore',
                            },
                            {
                                label: 'Hx S0ftware',
                                emoji: '1382653761088131152',
                                description: 'See the price and open a ticket Hx S0ftware.',
                                value: 'hx',
                            },
                            {
                                label: 'Ti4go',
                                emoji: '1384888331866734764',
                                description: 'See the price and open a ticket Ti4go.',
                                value: 'tiago',
                            },
                            {
                                label: 'M4cho',
                                emoji: '1382657610355966063',
                                description: 'See the price and open a ticket M4cho.',
                                value: 'macho',
                            }
                        ])
                );
                break;

            case 'spoofer':
                embed = new EmbedBuilder()
                    .setDescription(`
## Sp00fer Products
-# Products available from us:
> - **<:red:1389181300912427159> ×** R3d Eng1ne
> - **<:tiagomodz_logo:1384888331866734764> ×** Ti4go
> - **<:MachoLogo:1382657610355966063> ×** M4cho
> - **<:silent:1395058293432516658> ×** Silent

Select *products*.
Click on ticket *after select*.
Auto buy *[website here](https://silentmafia.pl)*`)
                    .setImage('https://i.imgur.com/6pxsviJ.png')
                    .setColor('#6f21ff');

                row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('spoofers_products')
                        .setPlaceholder('❌ × Click to select | Kliknij aby wybrać')
                        .addOptions([
                            {
                                label: 'R3d Eng1ne',
                                emoji: '1389181300912427159',
                                description: 'See the price and open a ticket R3d Eng1ne.',
                                value: 'red_engine',
                            },
                            {
                                label: 'Ti4go',
                                emoji: '1384888331866734764',
                                description: 'See the price and open a ticket Ti4go.',
                                value: 'tiago',
                            },
                            {
                                label: 'M4cho',
                                emoji: '1382657610355966063',
                                description: 'See the price and open a ticket M4cho.',
                                value: 'macho',
                            },
                            {
                                label: 'Silent',
                                emoji: '1395058293432516658',
                                description: 'See the price and open a ticket Silent.',
                                value: 'silent',
                            }
                        ])
                );
                break;

            case 'premium':
                embed = new EmbedBuilder()
                    .setDescription(`
## Premium Products
-# Products available from us:
> - **<:Rockstar:1382655702606151680> ×** Fiv3M R3ady
> - **<:Steam:1382653631488200754> ×** St34m
> - **<:DISCORD:1382653651214012477> ×** D1sc0rd
> - **<:ipvanish:1382653594716737687> ×** !P V4nish

Select *products*.
Click on ticket *after select*.
Auto buy *[website here](https://silentmafia.pl)*`)
                    .setImage('https://i.imgur.com/vok4YSS.png')
                    .setColor('#6f21ff');

                row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('premium_products')
                        .setPlaceholder('❌ × Click to select | Kliknij aby wybrać')
                        .addOptions([
                            {
                                label: 'Fiv3M R3ady',
                                emoji: '1382655702606151680',
                                description: 'See the price and open a ticket Fiv3M R3ady.',
                                value: 'fivem_ready',
                            },
                            {
                                label: 'St34m',
                                emoji: '1382653631488200754',
                                description: 'See the price and open a ticket St34m.',
                                value: 'steam',
                            },
                            {
                                label: 'D1sc0rd',
                                emoji: '1382653651214012477',
                                description: 'See the price and open a ticket D1sc0rd.',
                                value: 'discord',
                            },
                            {
                                label: '!P V4nish',
                                emoji: '1382653594716737687',
                                description: 'See the price and open a ticket !P V4nish.',
                                value: 'ip-vanish',
                            }
                        ])
                );
                break;

            case 'bundle':
                embed = new EmbedBuilder()
                    .setDescription(`
## Bundle Products
-# Products available from us:
> - **<:bundle:1382655741986471946> ×** Fiv3M Bundle
> - **<:DISCORD:1382653651214012477> ×** D1sc0rd Bundle

Select *products*.
Click on ticket *after select*.
Auto buy *[website here](https://silentmafia.pl)*`)
                    .setImage('https://i.imgur.com/lDp3DMY.png')
                    .setColor('#6f21ff');

                row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('bundle_products')
                        .setPlaceholder('❌ × Click to select | Kliknij aby wybrać')
                        .addOptions([
                            {
                                label: 'Fiv3M Bundle',
                                emoji: '1382655702606151680',
                                description: 'See the price and open a ticket Fiv3M Bundle.',
                                value: 'fivem_bundle',
                            },
                            {
                                label: 'D1sc0rd Bundle',
                                emoji: '1382653651214012477',
                                description: 'See the price and open a ticket D1sc0rd Bundle.',
                                value: 'discord_bundle',
                            }
                        ])
                );
                break;
            case 'fortnite':
                embed = new EmbedBuilder()
                    .setDescription(`
## Fortnite Products
-# Products available from us:
<:keyser:1382655865521311825> × K3yser
<:V_:1398725075334729840> × Ventiq

Select *products*.
Click on ticket *after select*.
Auto buy *[website here](https://silentmafia.pl)*`)
                    .setImage('https://cdn.discordapp.com/attachments/1388555378643566663/1402629065806184448/fortnite.png?ex=68949b9c&is=68934a1c&hm=7159c8a56a3e2cbb36cbc1d6b5e2ab640f23b5ce5b91b80d21b611595b7ef4ab&')
                    .setColor('#6f21ff');

                row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fortnite_products')
                        .setPlaceholder('❌ × Click to select | Kliknij aby wybrać')
                        .addOptions([
                            {
                                label: 'K3yser',
                                emoji: '1382655865521311825',
                                description: 'See the price and open a ticket K3yser.',
                                value: 'fortnite_keyser',
                            },
                            {
                                label: 'Ventiq',
                                emoji: '1398725075334729840',
                                description: 'See the price and open a ticket Ventiq.',
                                value: 'fortnite_ventiq',
                            }
                        ])
                );
                break;
            case 'valorant':
                embed = new EmbedBuilder()
                    .setDescription(`
## Valorant Products
-# Products available from us:
<:V_:1398725075334729840> × Ventiq

Select *products*.
Click on ticket *after select*.
Auto buy *[website here](https://silentmafia.pl)*`)
                    .setImage('https://cdn.discordapp.com/attachments/1388555378643566663/1402628782136758372/valorant.png?ex=68949b59&is=689349d9&hm=472ab48cbca78794cb1eaa0b3851d50086f75f9afcc3dc7c900db5253b5ba864&')
                    .setColor('#6f21ff');

                row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('valorant_products')
                        .setPlaceholder('❌ × Click to select | Kliknij aby wybrać')
                        .addOptions([
                            {
                                label: 'Ventiq',
                                emoji: '1398725075334729840',
                                description: 'See the price and open a ticket Ventiq.',
                                value: 'valorant_ventiq',
                            }
                        ])
                );
                break;
    }
    return { embed, row };
}

module.exports = {
    name: 'products',
    description: 'Wysyła wybrany panel produktów.',
    options: [
        {
            name: 'panel',
            description: 'Wybierz jaki panel chcesz wysłać.',
            type: 3,
            choices: panelChoices,
            required: true
        }
    ],
    buildPanel,
    execute: async (interaction) => {

        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        const panel = interaction.options.getString('panel');
        const { embed, row } = buildPanel(panel);

        interaction.channel.send({ embeds: [embed], components: [row] });
        interaction.reply({ content: `> **Wysłano panel produktów ${panel}!**`, flags: 64 });
    }
};
