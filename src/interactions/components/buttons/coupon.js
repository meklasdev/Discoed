const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('coupon')
            .setTitle('Using Coupon');

        const coupon = new TextInputBuilder()
            .setCustomId('coupon_modal')
            .setLabel('Enter your coupon:')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(coupon)
        );
        return interaction.showModal(modal);
    }
}