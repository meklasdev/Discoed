const { EmbedBuilder, } = require('discord.js');
const Coupon = require('../../models/Coupon');

const config = require('../../config/reviewConfig');

module.exports = {
    name: 'coupon',
    description: 'Komenda administracyjna do zarządzania kodami.',
    options: [
        {
            name: 'add',
            description: 'Dodaj nowy kod promocyjny',
            type: 1,
            options: [
                {
                    name: 'nazwa',
                    description: 'Nazwa kodu promocyjnego',
                    type: 3,
                    required: true
                },
                {
                    name: 'wartość',
                    description: 'Wartość kodu w procentach',
                    type: 4,
                    required: true
                }
            ]
        },
        {
            name: 'remove',
            description: 'Usuń kod promocyjny',
            type: 1,
            options: [
                {
                    name: 'nazwa',
                    description: 'Nazwa kodu promocyjnego do usunięcia',
                    type: 3,
                    required: true
                }
            ]
        }
    ],

    execute: async (interaction) => {
        
        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: 'Nie masz uprawnień do wykonania tej komendy.', flags: 64 });
        }

        const subcommand = interaction.options.getSubcommand();
        const codeName = interaction.options.getString('nazwa');

        try {
            switch (subcommand) {
                case 'add': {
                    const value = interaction.options.getInteger('wartość');
                    const existingCoupon = await Coupon.findOne({ code: codeName });

                    if (existingCoupon) {
                        const existError = new EmbedBuilder()
                            .setTitle('`❌` Błąd')
                            .setDescription(`> Kod promocyjny \`${codeName.toUpperCase()}\` już istnieje!`)
                            .setColor('#FF0000')
                            .setTimestamp();
                        return interaction.reply({ embeds: [existError], flags: 64 });
                    }

                    if (value <= 0) {
                        const valueError = new EmbedBuilder()
                            .setTitle('`❌` Błąd')
                            .setDescription(`> Wartość zniżki musi być większa od **0**!`)
                            .setColor('#FF0000')
                            .setTimestamp();
                        return interaction.reply({ embeds: [valueError], flags: 64 });
                    }

                    await Coupon.create({
                        code: codeName,
                        discount: value
                    });

                    const addEmbed = new EmbedBuilder()
                        .setTitle('`✅` Kod dodany')
                        .setDescription(`> Kod promocyjny \`${codeName.toUpperCase()}\` został dodany z wartością **${value}%**`)
                        .setColor('#6f21ff')
                        .setTimestamp();
                    return interaction.reply({ embeds: [addEmbed], flags: 64 });
                }

                case 'remove': {
                    const deletedCoupon = await Coupon.findOneAndDelete({ code: codeName });

                    if (!deletedCoupon) {
                        const dosntExist = new EmbedBuilder()
                            .setTitle('`❌` Błąd')
                            .setDescription(`> Kod promocyjny \`${codeName.toUpperCase()}\` nie istnieje!`)
                            .setColor('#FF0000')
                            .setTimestamp();
                        return interaction.reply({ embeds: [dosntExist], flags: 64 });
                    }

                    const removeEmbed = new EmbedBuilder()
                        .setTitle('`🗑️` Kod usunięty')
                        .setDescription(`> Kod promocyjny \`${deletedCoupon.code}\` został pomyślnie usunięty!`)
                        .setColor('#6f21ff')
                        .setTimestamp();
                    return interaction.reply({ embeds: [removeEmbed], flags: 64 });
                }
            }
        } catch (error) {
            console.error("Błąd podczas operacji na kuponach:", error);
            return interaction.reply({ content: 'Wystąpił błąd podczas wykonywania komendy.', flags: 64 });
        }
    }
};