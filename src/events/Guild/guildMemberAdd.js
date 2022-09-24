const client = require('../../client.js');
const db = require('quick.db');

client.on('guildMemberAdd', function (member) {
    let channel = member.guild.channels.cache.find(channel => channel.id === db.get(`witaj_kanal_${member.guild.id}`));
    if (!channel) return;
    
       const embed3 = {
            title: `Witamy ${member.user.tag} na discordzie ${member.guild.name}`,
            description: `<@${member.user.id}>, Jesteś naszym ${member.guild.memberCount} Członkiem!`,
            color: "RANDOM"
        }

    channel.send({ embeds: [embed3] });
});