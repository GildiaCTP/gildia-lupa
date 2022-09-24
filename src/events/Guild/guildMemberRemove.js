const client = require('../../client.js');
const db = require('quick.db');

client.on('guildMemberRemove', function (member) {
    let channel = member.guild.channels.cache.find(channel => channel.id === db.get(`wyszedl_kanal_${member.guild.id}`));
    if (!channel) return;

       const embed3 = {
            title: `Żegnamy ${member.user.tag} z discorda ${member.guild.name}`,
            description: `<@${member.user.id}>, Bez Ciebie jest nas ${member.guild.memberCount}! osób!`,
            color: "RANDOM"
        }

    channel.send({ embeds: [embed3] });
});