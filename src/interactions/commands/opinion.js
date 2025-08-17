const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'opinion',
    description: 'Share your opinion about our server.',
    options: [
        {
            name: 'time',
            type: 4,
            description: 'Time.',
            required: true,
            choices: [
                {name: `⭐`, value: 1 },
                {name: `⭐⭐`, value: 2 },
                {name: `⭐⭐⭐`, value: 3 },
                {name: `⭐⭐⭐⭐`, value: 4 },
                {name: `⭐⭐⭐⭐⭐`, value: 5 },
            ]
        },
        {
            name: 'implementation',
            type: 4,
            description: 'Implementation.',
            required: true,
            choices: [
                {name: `⭐`, value: 1 },
                {name: `⭐⭐`, value: 2 },
                {name: `⭐⭐⭐`, value: 3 },
                {name: `⭐⭐⭐⭐`, value: 4 },
                {name: `⭐⭐⭐⭐⭐`, value: 5 },
            ]
        },
        {
            name: 'course',
            type: 4,
            description: 'Course.',
            required: true,
            choices: [
                {name: `⭐`, value: 1 },
                {name: `⭐⭐`, value: 2 },
                {name: `⭐⭐⭐`, value: 3 },
                {name: `⭐⭐⭐⭐`, value: 4 },
                {name: `⭐⭐⭐⭐⭐`, value: 5 },
            ]
        },
        {
            name: 'your_opinion',
            description: 'Your opinion.',
            type: 3,
            required: true
        },
    ],

    execute: async (interaction) => {
            const allowedChannelId = '1382630833000812598';
            const channel = interaction.channel;
            const channelId = channel.id;

            if (channelId !== allowedChannelId) {
                return interaction.reply({content: `**You will only use this command on the channel:** <#${allowedChannelId}>.`, flags: 64 });
            }


        const your_opinion = interaction.options.getString('your_opinion');
        const time = interaction.options.getInteger('time');
        const implementation = interaction.options.getInteger('implementation');
        const course = interaction.options.getInteger('course');

        const formattedTime = '⭐'.repeat(time) + ''.repeat(5 - time);
        const formattedImplementation = '⭐'.repeat(implementation) + ''.repeat(5 - implementation);
        const formattedCourse = '⭐'.repeat(course) + ''.repeat(5 - course);
        const embed = new EmbedBuilder()
            .setTitle('💞〢REVIEW')
            .setDescription(`
> **Customer:** <@${interaction.user.id}>
* **Opinion:** \`\`${your_opinion}\`\`
           `)
            .addFields(
                {
                    name: "Time",
                    value: `${formattedTime}`,
                    inline: true
                },
                {
                    name: "Implementation",
                    value: `${formattedImplementation}`,
                    inline: true
                },
                {
                    name: "Course",
                    value: `${formattedCourse}`,
                    inline: true
                },
            )
            .setColor('#6f21ff')
            .setImage(`https://media.discordapp.net/attachments/1382630836171706431/1384617352317898945/image.png?ex=685314e5&is=6851c365&hm=b02ca593697df5a13426a537e1dd17e910d2783de0c5667db0e1599e87cd7c66&=&format=webp&quality=lossless`)
            .setThumbnail(interaction.user.displayAvatarURL());

        interaction.channel.send({embeds: [embed] })
        interaction.reply({ content: '> **Opinion published!**', flags: 64 });

        const stickyEmbed = new EmbedBuilder()
            .setDescription('> **Use the command** ``/opinion`` **to share your opinion!**')
            .setColor('#6f21ff')

        try {
            const messages = await channel.messages.fetch({ limit: 100 });
            const botMessages = messages.filter(m => m.author.id === interaction.client.user.id);

            const oldStickyMessage = botMessages.find(msg =>
                msg.embeds[0].description.includes('> **Use the command** ``/opinion`` **to share your opinion!**')
            );

            if (oldStickyMessage) {
                await oldStickyMessage.delete();
            }
            await channel.send({ embeds: [stickyEmbed] });
        } catch (error) {
            console.error('Błąd podczas zarządzania wiadomością sticky:', error);
        }
    }
}