const fs = require('fs');

module.exports = async (client) => {
    const load_dir = (dirs) => {
        const eventfiles = fs.readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith(".js"));

        for (const file of eventfiles) {
            const event = require(`../events/${dirs}/${file}`);

            console.log(`[ 📂 ] Event ${file} został pomyślnie załadowany!`);
        };
    };

    ['Client', 'Guild'].forEach(e => load_dir(e));
};