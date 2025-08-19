const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const Ticket = require('../../../models/Ticket');

module.exports = {
	async execute(interaction) {
		const id = interaction.customId;
		const channel = interaction.channel;
		const guild = interaction.guild;

		// Map buttons to simple flow
		if (id === 'newticket_claim') {
			const ticket = await Ticket.findOne({ channelId: channel.id });
			if (!ticket) return interaction.reply({ content: '> Not a ticket channel.', flags: 64 });
			if (ticket.status === 'claimed') return interaction.reply({ content: '> Already claimed.', flags: 64 });
			ticket.status = 'claimed';
			ticket.claimedBy = interaction.user.id;
			await ticket.save();
			await channel.setName(`${channel.name}-claimed`);
			return interaction.reply({ content: `> Claimed by ${interaction.member}.`, flags: 64 });
		}

		if (id === 'newticket_close') {
			const confirmRow = new ActionRowBuilder().addComponents(
				new ButtonBuilder().setCustomId('newticket_close_confirm').setLabel('Confirm Close').setStyle(ButtonStyle.Danger),
				new ButtonBuilder().setCustomId('newticket_close_cancel').setLabel('Cancel').setStyle(ButtonStyle.Secondary)
			);
			return interaction.reply({ content: '> Are you sure you want to close this ticket?', components: [confirmRow], flags: 64 });
		}

		if (id === 'newticket_close_cancel') {
			return interaction.update({ content: '> Close cancelled.', components: [], flags: 64 });
		}

		if (id === 'newticket_close_confirm') {
			const ticket = await Ticket.findOne({ channelId: channel.id });
			if (!ticket) return interaction.update({ content: '> Not a ticket channel.', components: [], flags: 64 });
			await channel.setTopic('[CLOSED]');
			await channel.permissionOverwrites.edit(ticket.userId, { ViewChannel: false }).catch(() => {});
			interaction.update({ content: '> Ticket closed. Transcript will be posted to logs.', components: [], flags: 64 });
			return;
		}

		if (id === 'newticket_transcript') {
			// Build transcript text from recent messages
			const messages = await channel.messages.fetch({ limit: 100 });
			const sorted = Array.from(messages.values()).sort((a,b) => a.createdTimestamp - b.createdTimestamp);
			let text = `Transcript for #${channel.name} (${channel.id})\n`;
			for (const m of sorted) {
				const when = new Date(m.createdTimestamp).toISOString();
				text += `[${when}] ${m.author?.tag || 'Unknown'}: ${m.content || ''}\n`;
			}
			const attachment = new AttachmentBuilder(Buffer.from(text, 'utf8'), { name: `transcript-${channel.id}.txt` });
			const logId = process.env.LOG_TICKETS_CHANNEL_ID;
			if (logId) {
				const logCh = guild.channels.cache.get(logId);
				if (logCh && logCh.isTextBased()) await logCh.send({ files: [attachment] });
			}
			return interaction.reply({ content: '> Transcript generated.', files: [attachment], flags: 64 });
		}
	}
};