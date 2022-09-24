//Kick.js
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "kick",
    description: "Wyrzuca członka z serwera",
    userPermissions: ['BAN_MEMBERS'],
    options:[{
        name: "user",
        description: "Użytkownik do kickowania",
        userPermissions: ['BAN_MEMBERS'],
        type: "USER",
        required: true
    }, {
        name: "reason",
        description: "Powód kicka",
        userPermissions: ['BAN_MEMBERS'],
        type: "STRING"
    }],
    run: async(client,interaction,args) => {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || "Nie podano przyczyny";
        const embed = {
            title: "Zostałeś wyrzucony z " + interaction.guild.name,
            description: "Powód: " + reason,
            color: "RED"
        }

        const embed2 = {
            title: `${member.user.username} Został pomyślnie wyrzucony!`,
            description: "Powód: " + reason,
            color: "RED"
        }

        member.send({ embeds: [embed] }).catch(() => null)
        interaction.reply({ embeds: [embed2] });
        
        await member.kick(reason).catch(() => null);
    }
}