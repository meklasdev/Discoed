const fs = require('fs');
const path = require('path');
const config = require('../config/reviewConfig');

const loadFiles = async (dir) => {
    const results = [];
    try {
        const list = await fs.promises.readdir(dir);
        const filePromises = list.map(async (file) => {
            const filePath = path.join(dir, file);
            const stat = await fs.promises.stat(filePath);

            if (stat.isDirectory()) {
                return loadFiles(filePath);
            } else if (file.endsWith('.js')) {
                return filePath;
            }
            return null;
        });

        const files = await Promise.all(filePromises);
        return files.flat().filter(Boolean);
    } catch (error) {
        console.error(`Błąd podczas ładowania plików z katalogu ${dir}:`, error);
        return [];
    }
};

const registerCommand = async (command, client, guildIds) => {
    try {
        const commandData = {
            name: command.name,
            description: command.description || 'Brak opisu',
            options: command.options || []
        };

        if (guildIds && guildIds.length) {
            await Promise.all(guildIds.map(async (id) => {
                try {
                    const guild = await client.guilds.fetch(id);
                    if (!guild) {
                        throw new Error(`Nie znaleziono serwera o ID: ${id}`);
                    }
                    await guild.commands.create(commandData);
                    console.log(`Zarejestrowano komendę SlashCommand: ${command.name} na serwerze: ${id}`);
                } catch (err) {
                    console.error(`Błąd podczas rejestracji komendy ${command.name} na serwerze ${id}:`, err);
                }
            }));
        } else {
            await client.application.commands.create(commandData);
            console.log(`Zarejestrowano globalną komendę SlashCommand: ${command.name}`);
        }

        await client.commands.set(command.name, command);
        console.log(`Załadowano komendę: ${command.name}`);

    } catch (error) {
        console.error(`Błąd podczas rejestracji komendy ${command.name}:`, error);
    }
};

module.exports = async (client) => {
    try {
        const commandFiles = await loadFiles(path.join(__dirname, '../interactions/commands'));
        const guildIds = config.COMMAND_GUILD_IDS || [config.SERVER_ID];

        const loadCommandsPromises = commandFiles.map(async (file) => {
            try {
                const command = require(file);

                if (!command.name || typeof command.name !== 'string') {
                    throw new Error(`Komenda w pliku ${file} nie posiada poprawnej nazwy (name).`);
                }

                if (!command.execute || typeof command.execute !== 'function') {
                    throw new Error(`Komenda w pliku ${file} nie posiada funkcji execute.`);
                }

                await registerCommand(command, client, guildIds);

            } catch (error) {
                console.error(`Błąd podczas ładowania komendy w pliku ${file}:`, error);
            }
        });

        await Promise.all(loadCommandsPromises);
    } catch (error) {
        console.error('Błąd podczas ładowania komend:', error);
    }
};
