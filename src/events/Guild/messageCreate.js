const xp = require("discord-xp");
const dc = require("discord.js");
const client = require("../../client");
const config = require("../../config");
const { MessageEmbed, Collection } = require('discord.js');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

        
module.exports = {
    run: (client, message) => {
        if(message.author.bot || !message.guild || !message.content.startsWith(client.settings.prefix)) return;
        const args = message.content.slice(client.settings.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        let command = client.prefix_commands.get(cmd)
        if (!command) command = client.prefix_commands.get(client.aliases.get(cmd));
        if(!command) return;

        if (command.botPermissions) {
            const Permissions = command.botPermissions.filter(x => !message.guild.me.permissions.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return message.channel.send(`I need ${Permissions.join(", ")} permission(s) nie rob tego!`)
        } 
          
        if (command.memberPermissions) {
            const Permissions = command.memberPermissions.filter(x => !message.member.permissions.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return message.channel.send(`You need ${Permissions.join(", ")} permission(s) nie masz!`)
        }
        
        if (command.ownerOnly) {
            if (message.author.id !== client.settings.ownerId) return message.channel.send("nie masz permisji :C")
        }

        command.run(client, message, args)
    }
}
});