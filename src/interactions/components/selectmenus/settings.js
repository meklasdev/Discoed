const { PermissionsBitField, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Ticket = require('../../../models/Ticket');
const config = require('../../../config/reviewConfig');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        const member = interaction.member;
        const permsRole = '1382630829536182310';

        if (!member.roles.cache.has(permsRole) && !config.OWNER_IDS.includes(member.id))
            return interaction.reply({
                content: '> **Nie masz uprawnień do wejścia w ustawienia tego ticketa.**',
                flags: 64
            });

        const ticketChannel = interaction.channel;
        const ticketData = await Ticket.findOne({ channelId: ticketChannel.id });

        switch (selectedValue) {
            case 'close':
                await ticketChannel.permissionOverwrites.set([
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                ]);

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('open')
                        .setLabel('Open')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('delete')
                        .setLabel('Delete')
                        .setStyle(ButtonStyle.Danger)
                );

                interaction.reply({ content: `> * **Ticket has been closed**`, flags: 64 });
                interaction.channel.send({ components: [row] })
                break;
            case 'adduser':
                const adduserModal = new ModalBuilder()
                    .setCustomId('adduser_modal')
                    .setTitle('Dodawanie użytkownika');

                const adduserField = new TextInputBuilder()
                    .setCustomId('id')
                    .setLabel('ID UŻYTKOWNIKA:')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                adduserModal.addComponents(
                    new ActionRowBuilder().addComponents(adduserField),
                );
                interaction.showModal(adduserModal);
                break;
            case 'removeuser':
                const removeuserModal = new ModalBuilder()
                    .setCustomId('remvoveuser_modal')
                    .setTitle('Dodawanie użytkownika');

                const removeuserField = new TextInputBuilder()
                    .setCustomId('id')
                    .setLabel('ID UŻYTKOWNIKA:')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                removeuserModal.addComponents(
                    new ActionRowBuilder().addComponents(removeuserField),
                );
                interaction.showModal(removeuserModal);
                break;
            case 'notify':
                const client = await interaction.guild.members.fetch(ticketData.userId);

                const embed = new EmbedBuilder()
                    .setDescription(`
## <:pngsm:1362725414153355559> Silent Maf1a × MESSAGE
> <:support:1358051188758806579> × ${client} **You are called to your ticket!**
> <:hidepozdro:1358051265011126282> × **You have __48 hours__ to reply or your ticket will be deleted.**
# 📌 CHANNEL: ${interaction.channel}
            `)
                    .setColor(`#6f21ff`);

                try {
                    await client.send({ embeds: [embed] });
                    interaction.reply({ content: `> Wiadomość do ${client} została wysłana!`, flags: 64 });
                } catch (error) {
                    interaction.reply({ content: `> Wiadomość do ${client} __nie__ została wysłana!`, flags: 64 });
                }
                break;
        }
    }
}