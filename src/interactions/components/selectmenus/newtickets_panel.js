const { PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const Ticket = require('../../../models/Ticket');

// Simple in-memory cooldown map (userId -> timestamp)
const cooldownMsDefault = 60 * 1000;
const userCooldownUntil = new Map();

module.exports = {
	async execute(interaction) {
		const selected = interaction.values[0]; // 'support' | 'media'
		const guild = interaction.guild;
		const member = interaction.member;

		// Cooldown enforcement
		const now = Date.now();
		const until = userCooldownUntil.get(member.id) || 0;
		if (now < until) {
			const secondsLeft = Math.ceil((until - now) / 1000);
			return interaction.reply({ content: `> Please wait ${secondsLeft}s before creating another ticket.`, flags: 64 });
		}

		// Duplicate ticket check
		const existing = await Ticket.findOne({ userId: member.id });
		if (existing) {
			const channel = guild.channels.cache.get(existing.channelId);
			if (channel && channel.viewable) {
				return interaction.reply({ content: `> You already have an open ticket: ${channel}`, flags: 64 });
			}
		}

		// Resolve category, roles and log channel from env
		const categoryId = process.env.TICKETS_CATEGORY_ID || null;
		const staffRoleId = process.env.STAFF_ROLE_ID || null;
		const adminRoleId = process.env.ADMIN_ROLE_ID || null;
		const logChannelId = process.env.LOG_TICKETS_CHANNEL_ID || null;

		// Create category if missing
		let parentId = categoryId;
		if (parentId) {
			const parent = guild.channels.cache.get(parentId);
			if (!parent) parentId = null;
		}
		if (!parentId) {
			try {
				const createdCat = await guild.channels.create({
					name: 'Tickets',
					type: ChannelType.GuildCategory
				});
				parentId = createdCat.id;
			} catch (err) {
				return interaction.reply({ content: '> Failed to create category (permissions missing).', flags: 64 });
			}
		}

		// Create channel name
		const channelName = `ticket-${member.user.username}`.toLowerCase();

		// Permissions
		const overwrites = [
			{ id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
			{ id: member.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.AttachFiles] }
		];
		if (staffRoleId) overwrites.push({ id: staffRoleId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageMessages] });
		if (adminRoleId) overwrites.push({ id: adminRoleId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageMessages] });

		// Create channel
		let ticketChannel;
		try {
			ticketChannel = await guild.channels.create({
				name: channelName,
				type: ChannelType.GuildText,
				parent: parentId,
				permissionOverwrites: overwrites
			});
		} catch (err) {
			return interaction.reply({ content: '> Failed to create ticket channel (permissions missing).', flags: 64 });
		}

		// Save ticket
		await Ticket.create({ channelId: ticketChannel.id, userId: member.id });

		// Set cooldown
		userCooldownUntil.set(member.id, now + (Number(process.env.TICKETS_COOLDOWN_SEC || 60) * 1000 || cooldownMsDefault));

		// Buttons
		const controls = new ActionRowBuilder().addComponents(
			new ButtonBuilder().setCustomId('newticket_claim').setLabel('Claim').setStyle(ButtonStyle.Primary),
			new ButtonBuilder().setCustomId('newticket_transcript').setLabel('Transcript').setStyle(ButtonStyle.Secondary),
			new ButtonBuilder().setCustomId('newticket_close').setLabel('Close').setStyle(ButtonStyle.Danger)
		);

		// First message
		const startMsg = selected === 'support'
			? 'Please describe your problem in English.'
			: 'Link to your channel tiktok/youtube:\nDo you have any ch3ats?';

		const embed = new EmbedBuilder()
			.setDescription(`## <:ticket:1401226055867433041> Ticket\n> ${member}\n\n${startMsg}`)
			.setColor('#6f21ff');

		await ticketChannel.send({ embeds: [embed], components: [controls] });
		return interaction.reply({ content: `> Ticket created: ${ticketChannel}`, flags: 64 });
	}
};