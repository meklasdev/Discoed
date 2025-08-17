const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, row, selectRow;
        switch (selectedValue) {
            case 'fivem_ready':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                    .setDescription(`
# <:Rockstar:1358050363332231268> FiveM Ready <:Rockstar:1358050363332231268>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Full Acces
<a:Verified_Purple_Animated:1358509562306760945> - Ready to Unban
<a:Verified_Purple_Animated:1358509562306760945> - 100% Working
<a:Verified_Purple_Animated:1358509562306760945> - no bans on servers

# <a:arrowpurple:1358514479561965599> <:Rockstar:1358050363332231268>
**Fresh Account** - €0.32 / 1.40 PLN
**Aged Account** - €0.09 / 0.4 PLN **Budget Option**

** <a:arrowpurple:1358514479561965599>  🏦 - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
                    `);

                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fivem_ready_tickets')
                        .setPlaceholder(':ticket~1: Choose Your FiveM Package')
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

            case 'steam':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                    .setDescription(`
# <:STEAM:1358048490571173989> St3am <:STEAM:1358048490571173989>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Full Acces
<a:Verified_Purple_Animated:1358509562306760945> - 100% Working
<a:Verified_Purple_Animated:1358509562306760945> - Ready to Use
<a:Verified_Purple_Animated:1358509562306760945> - Only for sp00f

# <a:arrowpurple:1358514479561965599> <:STEAM:1358048490571173989>
**Steam Account** - €0.03 / 0.10 PLN **Instant Delivery**

** <a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
                    `);

                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('steam_tickets')
                        .setPlaceholder(':ticket~1: Choose Your Steam Package')
                        .addOptions([
                            {
                                label: 'Steam Account - €0.03 / 0.10 PLN',
                                description: 'Clean Steam Account - Ready for Spoofing',
                                value: 'steam_account',
                                emoji: '<:legit:1358050707139330050>'
                            }
                        ])
                );
                break;

            case 'discord':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                    .setDescription(`
# <:DISCORD:1358048371083837501> Disc0rd <:DISCORD:1358048371083837501>

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - Full Acces
<a:Verified_Purple_Animated:1358509562306760945> - 100% Working
<a:Verified_Purple_Animated:1358509562306760945> - Change Pass after purchase

# <a:arrowpurple:1358514479561965599> <:DISCORD:1358048371083837501>
**Email Verified** - €0.15 / 0.65 PLN
**Full Verified** - €0.29 / 1.20 PLN **For Spoofing**
**Aged + Full Verified** - €0.35 / 1.50 PLN **Premium**

** <a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
                    `);

                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('discord_tickets')
                        .setPlaceholder(':ticket~1: Choose Your Discord Package')
                        .addOptions([
                            {
                                label: 'Email Verified - €0.15 / 0.65 PLN',
                                description: '✅ Discord with Email Verification',
                                value: 'discord_email',
                                emoji: '<:legit:1358050707139330050>'
                            },
                            {
                                label: 'Full Verified - €0.29 / 1.20 PLN',
                                description: '🛡️ Complete Verification - Perfect for Spoofing',
                                value: 'discord_full',
                                emoji: '<:legit:1358050707139330050>'
                            },
                            {
                                label: 'Aged + Full Verified - €0.35 / 1.50 PLN',
                                description: '1+ Month Old + Full Verification - Premium',
                                value: 'discord_aged',
                                emoji: '<:legit:1358050707139330050>'
                            }
                        ])
                );
                break;

            case 'ip-vanish':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                    .setDescription(`
# <:IPVANISH:1359436765315727432> IP Vanish <:IPVANISH:1359436765315727432> 

<a:arrowpurple:1358514479561965599> ***description***
<a:Verified_Purple_Animated:1358509562306760945> - Instant Delivery
<a:Verified_Purple_Animated:1358509562306760945> - 100% Working
<a:Verified_Purple_Animated:1358509562306760945> - Ready to Use

# <a:arrowpurple:1358514479561965599>  <:IPVANISH:1359436765315727432>
**1 Year VPN** - €1.5 / 6.5 PLN **Full Privacy**

** <a:arrowpurple:1358514479561965599>  <:applebank:1358048596229885952> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1358514479561965599> <:legit:1358050707139330050> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
                    `);

                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('ipvanish_tickets')
                        .setPlaceholder(':ticket~1: Choose Your VPN Package')
                        .addOptions([
                            {
                                label: 'IP Vanish - €1.5 / 6.5 PLN',
                                description: 'Premium VPN - 1 Year Access & Full Privacy',
                                value: 'ipvanish_year',
                                emoji: '<:legit:1358050707139330050>'
                            }
                        ])
                );
                break;
                
            default:
                embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription('❌ **Error:** Unknown product selection. Please try again or contact support.');
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('error_placeholder')
                        .setPlaceholder('Please contact support')
                        .addOptions([
                            {
                                label: 'Contact Support',
                                description: 'Unknown selection error',
                                value: 'error',
                                emoji: '❌'
                            }
                        ])
                        .setDisabled(true)
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};