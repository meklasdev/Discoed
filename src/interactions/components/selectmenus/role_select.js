const { EmbedBuilder } = require('discord.js');
const roles = require('../../../config/rolesConfig');

module.exports = {
    async execute(interaction) {
        const selected = interaction.values;
        const member = interaction.member;

        const roleMap = {
            free: roles.FREE_STUFF_ROLE_ID,
            content: roles.CONTENT_ROLE_ID,
            customer: roles.CUSTOMER_ROLE_ID,
            other: roles.OTHER_PINGS_ROLE_ID,
        };

        for (const [value, roleId] of Object.entries(roleMap)) {
            if (!roleId) continue;
            if (selected.includes(value)) {
                if (!member.roles.cache.has(roleId)) {
                    await member.roles.add(roleId).catch(() => {});
                }
            } else {
                if (member.roles.cache.has(roleId)) {
                    await member.roles.remove(roleId).catch(() => {});
                }
            }
        }

        const embed = new EmbedBuilder()
            .setColor('#6f21ff')
            .setDescription('> **Twoje role zostały zaktualizowane.**');

        await interaction.reply({ embeds: [embed], flags: 64 });
    }
};
