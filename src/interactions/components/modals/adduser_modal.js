const { MessageFlags } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const id = interaction.fields.getTextInputValue('id');
        const ticketChannel = interaction.channel;
        const guild = interaction.guild;

        const member = await guild.members.fetch(id).catch(() => null);

        if (!member) {
            return interaction.reply({
                content: `> **Nie znaleziono użytkownika z ID \`${id}\` na tym serwerze.**`,
                flags: 64
            });
        }

        await ticketChannel.permissionOverwrites.edit(member, {
            ViewChannel: true,
            SendMessages: true,
            AttachFiles: true,
            ReadMessageHistory: true
        });

        return interaction.reply({
            content: `> **Dodano użytkownika:** <@${id}> do tego ticketa!`,
            flags: 64
        });
    }
}