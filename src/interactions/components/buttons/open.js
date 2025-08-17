const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const Ticket = require('../../../models/Ticket');

module.exports = {
    async execute(interaction) {
        await interaction.deferUpdate();
        const ticketChannel = interaction.channel;
        const ticketData = await Ticket.findOne({ channelId: ticketChannel.id });
        if (!ticketData) {
            return interaction.followUp({ content: '> Ticket wymaga usunięcia. nie da się go otworzyć ponownie.', flags: 64 })
        }
        const member = interaction.member;
        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setDescription(`* **Ticket has been re-opened by** ${member}`)
            .setColor('#6f21ff')
            .setTimestamp()

        await interaction.followUp({
            content: '> **Ticket has been re-opened.**',
            flags: 64
        });

        await interaction.channel.send({
            embeds: [embed]
        });

        interaction.message.delete()

        await ticketChannel.permissionOverwrites.set([
            {
                id: guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: ticketData.userId,
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.ReadMessageHistory,
                ]
            }
        ]);
    }
};