const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Połączono z bazą danych MongoDB!');
            })
            .catch((err) => {
                console.error('Błąd połączenia z bazą danych MongoDB:', err);
                process.exit(1);
            });

        try {
            await Ticket.syncIndexes();
        } catch (err) {
            console.error('Błąd synchronizacji indeksów ticketów:', err);
        }

        console.log(`Zalogowano jako ${client.user.tag}`);
        console.log(`Autor: @ufogam3r`);

        await require('../handlers/commandHandler')(client);
        require('../handlers/interactionHandler')(client);
    },
};
