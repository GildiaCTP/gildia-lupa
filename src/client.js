const discord = require('discord.js');
const database = require('quick.db');
const filesystem = require('fs');
const functions = require('./handlers/functionHandler.js');
const config = require('./config.js');
const mongo = require('mongoose');

const client = new discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    fetchAllMembers: true,
    restTimeOffset: 0,
    intents: 32767,

    presence: {
        status: "online",
        activities: [{
            name: "GILDIE LUPA",
            type: "WATCHING"
        }],
    },
});

module.exports = client;
client.discord = discord;
client.config = config;
client.database = database;
client.filesystem = filesystem;
client.functions = functions;
client.slashcommands = new discord.Collection();

['slashCommandHandler.js', 'eventHandler.js'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.on('messageCreate', async (message) => {
    if (!message.member) return;
    if (message.author.bot) return;
});

mongo.connect("mongodb+srv://okizek:okizek@cluster0.rgzsi.mongodb.net/datas", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

client.login(client.config.clientConfig.clientToken).catch(error => {
    console.error(`blad!`);
    process.exit(0);
});