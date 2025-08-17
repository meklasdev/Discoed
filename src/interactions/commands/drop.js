const { EmbedBuilder } = require('discord.js');
const DropCooldown = require('../../models/DropCooldown');
const config = require('../../config/reviewConfig');
const cooldownTime = 8 * 60 * 60 * 1000;

module.exports = {
    name: 'drop',
    description: 'Losuje zniżkę!',
    execute: async (interaction) => {
        const userId = interaction.user.id;

        try {
            let userCooldown;
            if (!config.OWNER_IDS.includes(userId)) {
                userCooldown = await DropCooldown.findOne({ userId: userId });

                if (userCooldown) {
                    const expirationTime = userCooldown.lastDrop.getTime() + cooldownTime;
                    if (Date.now() < expirationTime) {
                        return interaction.reply({
                            content: `> Będziesz mógł/mogła ponownie użyć tej komendy <t:${Math.floor(expirationTime / 1000)}:R> ⏳`,
                            flags: 64
                        });
                    }
                }
            }

            const chance = Math.random();
            let result;
            let resultType = 'discount';

            if (chance < 0.001) {
                result = 'Fiv3M Ready';
                resultType = 'special';
            } else if (chance < 0.002) {
                result = 'St3am Konto';
                resultType = 'special';
            } else if (chance < 0.07) {
                result = '-5%';
            } else if (chance < 0.11) {
                result = '-10%';
            } else if (chance < 0.13) {
                result = '-15%';
            } else {
                result = 'loss';
                resultType = 'loss';
            }

            if (!config.OWNER_IDS.includes(userId)) {
                if (userCooldown) {
                    userCooldown.lastDrop = Date.now();
                    await userCooldown.save();
                } else {
                    await DropCooldown.create({ userId: userId, lastDrop: Date.now() });
                }
            }

            if (resultType === 'loss') {
                const lossEmbed = new EmbedBuilder()
                    .setColor(`#ff0000`)
                    .setDescription(`> **<@${userId}> niestety, tym razem się nie udało. Spróbuj dalej!**`)
                    .setFooter({ text: `Losowanie wykonane przez ${interaction.user.tag}` });
                await interaction.reply({ embeds: [lossEmbed] });
            } else if (resultType === 'discount') {
                const winEmbed = new EmbedBuilder()
                    .setColor(`#f2ff00`)
                    .setDescription(`> **<@${userId}> gratulacje! Wylosowałeś(-aś) kod zniżkowy o wartości ${result}! Masz 24h, by go użyć.**`)
                    .setFooter({ text: `Losowanie wykonane przez ${interaction.user.tag}` });
                await interaction.reply({ embeds: [winEmbed] });
            } else if (resultType === 'special') {
                const specialWinEmbed = new EmbedBuilder()
                    .setColor(`#6f21ff`)
                    .setTitle('🎉 JACKPOT! 🎉')
                    .setDescription(`> **<@${userId}> Gratulacje! Wydropiłeś(-aś) Konto Premium \`${result}\`!\nMasz 24h by odebrać go na https://canary.discord.com/channels/1382630829536182302/1382630832510074943.**`)
                    .setFooter({ text: `Losowanie wykonane przez ${interaction.user.tag}` });
                await interaction.reply({ embeds: [specialWinEmbed] });
            }
        } catch (error) {
            console.error("Błąd podczas wykonywania komendy /drop:", error);
            return interaction.reply({ content: 'Wystąpił błąd podczas losowania nagrody.', flags: 64 });
        }
    }
};