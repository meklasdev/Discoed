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

        try {
            await ticketChannel.permissionOverwrites.delete(member.id);

            return interaction.reply({
                content: `> **Usunięto użytkownika:** <@${id}> z tego ticketa!`,
                flags: 64
            });
        } catch (error) {
            console.error("Błąd podczas usuwania uprawnień użytkownika z ticketa:", error);
            return interaction.reply({
                content: `> **Wystąpił błąd podczas próby usunięcia użytkownika:** <@${id}> z ticketa.`,
                flags: 64
            });
        }
    }
}