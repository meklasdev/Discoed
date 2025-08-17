const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, row, selectRow;
        switch (selectedValue) {
            case 'fivem_bundle':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706429/1400614582292320266/BUNDLE_FIVEM.png?ex=688f41ba&is=688df03a&hm=b337bb3480404f3f77bc364b3a1d3b5152dd5c29ef64c6afbaaf8408f782058f&=&format=webp&quality=lossless')
                    .setDescription(`
# <:bundle:1382655741986471946> Fiv3M Bundle <:bundle:1382655741986471946>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Full Acces
<a:Verified_Purple_Animated:1382655410795843695> - 100% Working
<a:Verified_Purple_Animated:1382655410795843695> - Ready to Use
<a:Verified_Purple_Animated:1382655410795843695> - **St3am + disc0rd + Fiv3m Ready**

# <a:arrowpurple:1384626293139570781> <:bundle:1382655741986471946>
**- <:PriceTag_USD:1403056060385853600> Standard Bundle - €0.47 / 1.99 PLN**
**- <:PriceTag_USD:1403056060385853600> Aged Bundle (+2m Discord) - €0.64 / 2.70 PLN**

** <a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_fivembundle`)
                        .setEmoji(`<:bundle:1382655741986471946>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('bundle_fivem_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'FiveM Bundle - €0.47 / 1.99 PLN',
                                description: '1 Bundle Standard',
                                value: 'bundle_fivem_standard'
                            },
                            {
                                label: 'FiveM Bundle - €0.64 / 2.70 PLN',
                                description: '1 Bundle (Aged +2m dc)',
                                value: 'bundle_fivem_aged'
                            }
                        ])
                );
                break;

            case 'discord_bundle':
                embed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                .setImage('https://media.discordapp.net/attachments/1382630836171706431/1401216792856105106/bundle_discord.png?ex=688f7854&is=688e26d4&hm=6e734ec09dc962e46f83fc6852d1b1d08f2a4ccf7eccc9353dfdff0057b5b733&=&format=webp&quality=lossless')
                    .setDescription(`
# <:DISCORD:1382653651214012477> D1sc0rd Bundle <:DISCORD:1382653651214012477>

<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Full Acces
<a:Verified_Purple_Animated:1382655410795843695> - 100% Working
<a:Verified_Purple_Animated:1382655410795843695> - Ready to Use
<a:Verified_Purple_Animated:1382655410795843695> - **St3am + disc0rd + Fiv3m Ready**

# <a:arrowpurple:1384626293139570781> <:DISCORD:1382653651214012477>
- **<:PriceTag_USD:1403056060385853600> 3 Acc - €0.70 / 2.99 PLN**
- **<:PriceTag_USD:1403056060385853600> 10 Acc - €1.87 / 7.99**

** <a:arrowpurple:1384626293139570781>  <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1331664914984599614/1331774472444969003)
** <a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1331664914984599614/1331774268815441990)  |  [Proofs](https://discord.com/channels/1331664914984599614/1349145049509789800)  | [Reviews](https://discord.com/channels/1331664914984599614/1331774311434031197)
                    `);
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_discord`)
                        .setEmoji(`<:DISCORD:1382653651214012477>`)
                        .setStyle(ButtonStyle.Secondary)
                );
                
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('bundle_discord_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Discord Bundle - €0.70 / 2.99 PLN',
                                description: '3 acc Discord',
                                value: 'bundle_discord_3acc'
                            },
                            {
                                label: 'Discord Bundle - €1.87 / 7.99 PLN',
                                description: '10 acc Discord',
                                value: 'bundle_discord_10acc'
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};