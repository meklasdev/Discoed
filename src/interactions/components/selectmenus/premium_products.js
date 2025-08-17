const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, row, selectRow;
        switch (selectedValue) {
            case 'fivem_ready':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400616739586183288/FIVEM_READY.png?ex=688f43bc&is=688df23c&hm=1faf38c14edc1476f6b69e755c444d51e0a979e88b1a0c5f903f5b11032e06c8&=&format=webp&quality=lossless')
                    .setDescription(`
# <:Rockstar:1382655702606151680> FiveM Ready <:Rockstar:1382655702606151680>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Full Acces
<a:Verified_Purple_Animated:1382655410795843695> - Ready to Unban
<a:Verified_Purple_Animated:1382655410795843695> - 100% Working
<a:Verified_Purple_Animated:1382655410795843695> - no bans on servers

# <a:arrowpurple:1384626293139570781> <:Rockstar:1382655702606151680>
**<:PriceTag_USD:1403056060385853600> 1 Account - €0.23 / 1 PLN**
**<:PriceTag_USD:1403056060385853600> Bundle 6+1 FREE - €1.4 / 6 PLN**

** <a:arrowpurple:1384626293139570781> <:applebank:1384626789627727904> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()                    
                        .setCustomId(`ticket_fivem`)
                        .setEmoji(`1358050363332231268`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('premium_fivem_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Single Premium - €0.23 / 1 PLN',
                                description: '1 FiveM Ready',
                                value: 'premium_fivem_single',
                            },
                            {
                                label: 'Premium Bundle - €1.4 / 6 PLN',
                                description: '6 Premium + 1 FREE',
                                value: 'premium_fivem_bundle',
                            }
                        ])
                );
                break;

            case 'steam':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400617310586278029/STEAM.png?ex=688f4445&is=688df2c5&hm=a8bc0c263d6e17160a3d61e19dff2591631559dab935b7827ba11ae144b26b74&=&format=webp&quality=lossless')
                    .setDescription(`
# <:Steam:1382653631488200754> St334m <:Steam:1382653631488200754>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Full Acces
<a:Verified_Purple_Animated:1382655410795843695> - 100% Working
<a:Verified_Purple_Animated:1382655410795843695> - Ready to Use
<a:Verified_Purple_Animated:1382655410795843695> - Only for sp00f

# <a:arrowpurple:1384626293139570781> <:Steam:1382653631488200754>
**<:PriceTag_USD:1403056060385853600> 1 Account - €0.03 / 0.10 PLN **

** <a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1382630829536182302/1382630832510074940)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1382630829536182302/1382630833000812597)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_steam`)
                        .setEmoji(`1358048490571173989`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('premium_steam_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Steam Account x1 - €0.03 / 0.10 PLN',
                                description: '1',
                                value: 'premium_steam_account'
                            }
                        ])
                );
                break;

            case 'discord':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400614826916712558/DISCORD.png?ex=688f41f4&is=688df074&hm=1cd514753ee42940f84843d66a5585e46975b2575fbc571b08ee5e039e119d59&=&format=webp&quality=lossless')
                    .setDescription(`
# <:DISCORD:1382653651214012477> D1sc0rd <:DISCORD:1382653651214012477>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Full Acces
<a:Verified_Purple_Animated:1382655410795843695> - 100% Working
<a:Verified_Purple_Animated:1382655410795843695> - Change Pass after purchase

# <a:arrowpurple:1384626293139570781> <:DISCORD:1382653651214012477>
**- <:PriceTag_USD:1403056060385853600> Email Verified- €0.15 / 0.65 PLN**
**- <:PriceTag_USD:1403056060385853600> Full Verified - €0.29 / 1.20 PLN**
**- <:PriceTag_USD:1403056060385853600> Aged + Full Verified - €0.40 / 1.70 PLN**

** <a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_discord`)
                        .setEmoji(`1358048371083837501`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('premium_discord_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'E-Mail Verifi - €0.15 / 0.65 PLN',
                                description: 'Discord E-Mail Verifi',
                                value: 'premium_discord_email'
                            },
                            {
                                label: 'Full Verifi - €0.29 / 1.20 PLN',
                                description: 'Discord Full Verifi (for sp00fing)',
                                value: 'premium_discord_full'
                            },
                            {
                                label: '2+ Month + Full Verifi - €0.40 / 1.70 PLN',
                                description: 'Discord 2+ Month + Full Verifi',
                                value: 'premium_discord_aged'
                            }
                        ])
                );
                break;

            case 'ip-vanish':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400615459501375634/VAMISH.png?ex=688f428b&is=688df10b&hm=6a2aea83e2ab119a7fd50c64feca9e7294f8af9d727ad6abd7a99d620d130494&=&format=webp&quality=lossless')
                    .setDescription(`
# <:ipvanish:1382653594716737687> !P Vanish <:ipvanish:1382653594716737687>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - 100% Working
<a:Verified_Purple_Animated:1382655410795843695> - Ready to Use

# <a:arrowpurple:1384626293139570781> <:ipvanish:1382653594716737687>
**- <:PriceTag_USD:1403056060385853600> 1 Year Access - €1.4 / 5.99 PLN **

** <a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_ipvanish`)
                        .setEmoji(`1359436765315727432`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('premium_ipvanish_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'IP Vanish - €1.4 / 5.99 PLN',
                                description: 'IP Vanish Year',
                                value: 'premium_ipvanish_year'
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};