//Ban.js
module.exports = {
    name: 'ban',
    userPermissions: ['BAN_MEMBERS'],
    description: 'Banuje członka na twoim serwerze',
    options:[{
        name: "user",
        description: "Użytkownik do zbanowania",
        type: "USER",
        required: true
    }, {
        name: "reason",
        description: 'Powód bana',
        type: "STRING"
    }],
    run:async(client, interaction, args) => {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || "Nie podano przyczyny";
        const embed = {
            title: "Zostałeś zbanowany " + interaction.guild.name,
            description: "Powód: " + reason,
            color: "RED"
        }

        const embed2 = {
            title: `${member.user.username} został zbanowany pomyślnie!`,
            description: "Powód: " + reason,
            color: "RED"
        }
        
        member.send({ embeds: [embed] }).catch(() => null)
        interaction.reply({ embeds: [embed2] });

        await member.ban({ reason: reason }).catch(() => null);
    }
}