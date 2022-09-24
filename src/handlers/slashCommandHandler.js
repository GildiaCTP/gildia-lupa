const FileSystem = require('fs');

module.exports = async (client) => {
    for (const folder of FileSystem.readdirSync(`./src/slashcommands`)) {
        const commandFiles = FileSystem.readdirSync(`./src/slashcommands/${folder}`).filter(file => file.endsWith('.js'));
        const commandArray = [];

        for (const file of commandFiles) {
            const command = require(`../slashcommands/${folder}/${file}`);

            if (command.name) {
                client.slashcommands.set(command.name, command);
                commandArray.push(command);
                console.log(`[ 📂 ] Komenda ${file} została pomyślnie załadowana!`);
            } else {
                console.log(`[ ❌ ] Podczas ładowania komendy ${file} wystąpił błąd! Upewnij się że plik ${file} posiada "command.name", "run" oraz "return"!`);
            };
        };

        client.on('ready', async () => {
            try {
                commandArray.forEach(async command => {
                    client.guilds.cache.forEach(async guild => {
                        await guild?.commands.create(command).catch(error => { console.log(error) });
                    });
                });
            } catch (error) {
                console.log(error)
            }
        });
    };
};