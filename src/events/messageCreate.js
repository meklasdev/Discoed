const { EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const channelIds = ['1382630833000812598', '1382630834875535365'];
const config = require('../config/reviewConfig');
const verificationConfig = require('../config/verificationConfig');
const roles = require('../config/rolesConfig');

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return;

        if (message.channel.id === verificationConfig.VERIFY_CHANNEL_ID) {
            const images = [...message.attachments.values()].filter(att => att.contentType && att.contentType.startsWith('image/'));
            const success = images.length === 2 && message.attachments.size === 2;

            if (success) {
                await message.member.roles.add(verificationConfig.VERIFY_ROLE_ID).catch(() => {});
                await message.react('✅').catch(() => {});

                const pinned = await message.channel.messages.fetchPinned();
                for (const pin of pinned.values()) {
                    await pin.unpin().catch(() => {});
                }

                setTimeout(async () => {
                    try {
                        const stickyEmbed = new EmbedBuilder()
                            .setDescription(verificationConfig.STICKY_MESSAGE)
                            .setColor('#6f21ff');
                        const sent = await message.channel.send({ embeds: [stickyEmbed] });
                        await sent.pin();
                    } catch (err) {
                        console.error('[messageCreate] Błąd przy wysyłaniu poradnika:', err);
                    }
                }, 3000);
            } else {
                await message.delete().catch(() => {});
                await message.member.timeout(verificationConfig.TIMEOUT_MS, 'Failed verification').catch(() => {});
                const dmEmbed = new EmbedBuilder()
                    .setDescription(verificationConfig.DM_MESSAGE)
                    .setColor('#6f21ff');
                await message.author.send({ embeds: [dmEmbed] }).catch(() => {});
            }
            return;
        }

        if (message.channel.id === '1382630832023408715') {
            if (!message.member.roles.cache.has(roles.CONTENT_ROLE_ID)) return;
            const linkMatch = message.content.match(/https?:\/\/\S+/);
            if (!linkMatch) return;
            const link = linkMatch[0];
            await message.react('✅').catch(() => {});
            const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            const collector = message.createReactionCollector({ filter, max: 1, time: 600000 });
            collector.on('collect', async () => {
                setTimeout(async () => {
                    await message.delete().catch(() => {});
                    const embed = new EmbedBuilder()
                        .setDescription(`Nowy filmik! [Kliknij tutaj](${link})`)
                        .setColor('#6f21ff');
                    await message.channel.send({ content: `<@&${roles.CONTENT_ROLE_ID}>`, embeds: [embed] });
                }, 3000);
            });
            return;
        }

        if (message.content.toLowerCase() === 'ticket fortnite') {
            await message.delete().catch(error => console.error('[messageCreate] Nie udało się usunąć wiadomości:', error.message));

            try {
                const permissionOverwrites = [
                    { id: message.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                    { id: message.author.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ReadMessageHistory] },
                    { id: '1382630829552963590', allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages] }
                ];

                const ticketChannel = await message.guild.channels.create({
                    name: 'ticket-fortnite',
                    type: ChannelType.GuildText,
                    parent: '1399356793691570198',
                    permissionOverwrites
                });

                const embed = new EmbedBuilder()
                    .setDescription('## <:silent:1395058293432516658> Silent Maf1a × TICKET')
                    .setColor('#6f21ff');

                await ticketChannel.send({ content: '@everyone', embeds: [embed] });
            } catch (error) {
                console.error('[messageCreate] Błąd podczas tworzenia kanału ticket:', error);
            }

            return;
        }

        if (message.channel.id === '1402406649880379483') {
            const suggestion = message.content;
            await message.delete().catch(error => console.error('[messageCreate] Nie udało się usunąć wiadomości:', error.message));

            const suggestionEmbed = new EmbedBuilder()
                .setColor('#6f21ff')
                .setAuthor({ name: `Sugestia od ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(suggestion);

            try {
                const sent = await message.channel.send({ embeds: [suggestionEmbed] });
                await sent.react('1385019566744146020');
                await sent.react('1385019541670727730');
                const threadName = `dyskusja-${message.author.username}`.slice(0, 100);
                await sent.startThread({ name: threadName, autoArchiveDuration: 1440 });
            } catch (error) {
                console.error('[messageCreate] Błąd podczas wysyłania sugestii:', error);
            }

            return;
        }

        if (message.channel.id === '1382630833000812599') {
            if (!message.content.includes('+rep')) return message.delete();

            const stickyEmbed = new EmbedBuilder()
                .setDescription(`
**<a:Verified_Purple_Animated:1384626247702675456>︲JAK NAPISAĆ LEGIT CHECKA?**
**Wzór:**
> - \`\`+rep @sprzedawca [ilość] [produkt] [cena] PLN\`\`
**Przykład**
> - +rep @Julus 1 Month Tiago
                `)
                .setColor('#6f21ff');

            const fiveMessages = await message.channel.messages.fetch({ limit: 5 });

            const botMessages = fiveMessages.filter(m => m.author.id === message.client.user.id);
            for (const msg of botMessages.values()) {
                try {
                    await msg.delete();
                } catch (error) {
                    console.error('[messageCreate] Błąd podczas usuwania wiadomości bota:', error.message);
                }
            }

            await message.channel.send({
                embeds: [stickyEmbed]
            });
        }

        if (message.author.id === config.MESSAGE_CREATE_IGNORE_ID) return;
        if (channelIds.includes(message.channel.id)) {
            await message.delete().catch(error => console.error('[messageCreate] Nie udało się usunąć wiadomości:', error.message));
        }
    }
}
