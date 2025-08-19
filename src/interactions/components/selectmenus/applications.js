const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	async execute(interaction) {
		const selectedValue = interaction.values[0];

		if (selectedValue === 'media_application') {
			const modal = new ModalBuilder()
				.setCustomId('ticket_media_application')
				.setTitle('Podanie na Media');

			const channelsField = new TextInputBuilder()
				.setCustomId('channels')
				.setLabel('Link do kanałów (YT/TikTok/IG/Twitch)')
				.setStyle(TextInputStyle.Paragraph)
				.setPlaceholder('Wklej linki do swoich kanałów')
				.setRequired(true);

			const whyField = new TextInputBuilder()
				.setCustomId('why')
				.setLabel('Dlaczego Ty?')
				.setStyle(TextInputStyle.Paragraph)
				.setPlaceholder('Napisz krótko dlaczego powinniśmy wybrać Ciebie')
				.setRequired(true);

			const visionField = new TextInputBuilder()
				.setCustomId('vision')
				.setLabel('Wizja na filmiki / content')
				.setStyle(TextInputStyle.Paragraph)
				.setPlaceholder('Jakie materiały planujesz tworzyć?')
				.setRequired(true);

			modal.addComponents(
				new ActionRowBuilder().addComponents(channelsField),
				new ActionRowBuilder().addComponents(whyField),
				new ActionRowBuilder().addComponents(visionField)
			);

			await interaction.showModal(modal);
			return;
		}

		if (selectedValue === 'support_application') {
			const modal = new ModalBuilder()
				.setCustomId('ticket_support_application')
				.setTitle('Podanie na Support');

			const whyField = new TextInputBuilder()
				.setCustomId('why')
				.setLabel('Dlaczego Ty?')
				.setStyle(TextInputStyle.Paragraph)
				.setPlaceholder('Napisz dlaczego chcesz dołączyć do supportu')
				.setRequired(true);

			modal.addComponents(
				new ActionRowBuilder().addComponents(whyField)
			);

			await interaction.showModal(modal);
			return;
		}
	}
};

