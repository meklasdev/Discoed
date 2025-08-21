const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
	name: 'setup-tickets',
	description: 'Wysyła panel Tickets (Support / Media Creator) w bieżącym kanale.',
	options: [],
	async execute(interaction) {
		await interaction.deferReply({ flags: 64 });

		const embed = new EmbedBuilder()
			.setDescription(
				'Tickets <:ticket:1401226055867433041>\n\n> <:support:1382655193925156944> Support - If you have a problem with a purchased product or want to ask a question.\n\n<:silent:1395058293432516658>Media Creator - If you want us to be your sponsor\n\n\n\n-# <:emoji22:1384624497784656035> Before opening the ticket, please read the https://discord.com/channels/1382630829536182302/1382630832510074943'
			)
			.setColor('#6f21ff')
			.setImage('https://media.discordapp.net/attachments/1382630836171706431/1384617473176895609/image.png?ex=68a57ac2&is=68a42942&hm=1ed8e06a15abfb3e465b68d909f97a3e0877c7f79e413d81bf348d724b6e557a&=&format=webp&quality=lossless');

		const row = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('newtickets_panel')
				.setPlaceholder('🎫 Choose an option')
				.addOptions([
					{ label: 'Support', value: 'support', emoji: '<:support:1382655193925156944>', description: 'Problem or question about a purchase' },
					{ label: 'Media Creator', value: 'media', emoji: '<:silent:1395058293432516658>', description: 'Become a sponsored creator' }
				])
		);

		await interaction.channel.send({ embeds: [embed], components: [row] });
		await interaction.editReply({ content: 'Tickets panel posted.', flags: 64 });
	}
};