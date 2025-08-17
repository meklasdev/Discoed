const { EmbedBuilder } = require('discord.js');
const Ticket = require('../../../models/Ticket');

module.exports = {
    async execute(interaction) {
        await interaction.deferUpdate();
        const ticketChannel = interaction.channel;
        const ticketData = await Ticket.findOne({ channelId: ticketChannel.id });

        const embed = new EmbedBuilder()
            .setDescription(`* **Ticket has been deleted by** ${interaction.member}`)
            .setColor('#6f21ff')
            .setTimestamp();

        interaction.channel.send({ embeds: [embed] });

        if (ticketData) await Ticket.deleteOne({ channelId: ticketChannel.id });
        ticketChannel.delete().catch(err => console.error("Błąd podczas usuwania kanału ticketa:", err));
    }
}