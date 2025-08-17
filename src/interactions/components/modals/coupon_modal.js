const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const couponsPath = './data/coupons.json';

module.exports = {
    async execute(interaction) {
        await interaction.deferReply({ flags: 64 });
        const member = interaction.member;
        const coupon = interaction.fields.getTextInputValue('coupon').toUpperCase();
        const coupons = JSON.parse(fs.readFileSync(couponsPath, 'utf-8'));

        if (coupons[coupon]) {
            const discount = coupons[coupon];
            const correctEmbed = new EmbedBuilder()
                .setTitle('Coupon System')
                .setDescription(`> ${member} member entered the correct **${coupon}** coupon and got a **${discount}% discount**.`)
                .setColor('#6f21ff');

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket_close')
                    .setLabel('Close ticket')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('ticket_coupon')
                    .setLabel('Coupon')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true)
            );
            await interaction.channel.send({
                embeds: [correctEmbed],
            })

            await interaction.message.edit({
                components: [row],
            });
            return interaction.editReply({content: '> **You entered a valid code.**'})
        } else if (coupon) {
            const wrongEmbed = new EmbedBuilder()
                .setTitle('Coupon System')
                .setDescription('> **Your coupon does not exist!**')
                .setColor('#6f21ff');

            return interaction.editReply({
                embeds: [wrongEmbed],
            })
        }
    }
}