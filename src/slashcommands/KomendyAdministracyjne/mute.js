const durations = [
    { name: "60 Sekund", value: 60 * 1000 },
    { name: "5 minut", value: 5 * 60 * 1000 },
    { name: "10 minut", value: 10 * 60 * 1000 },
    { name: "30 minut", value: 30 * 60 * 1000 },
    { name: "1 godzine", value: 60 * 60 * 1000 },
    { name: "1 dzień", value: 24 * 60 * 60 * 1000 },
    { name: "1 mięsiać", value: 7 * 24 * 60 * 60 * 1000 },
]

const run = async (client, interaction) => {
    let member = interaction.options.getMember("user")
    let duration = interaction.options.getNumber("duration")
    let reason = interaction.options.getString("reason") || "Nie podano przyczyny"

    if (!member) return interaction.reply("Nieprawidłowy członek")

    try {
        await member.timeout(duration, reason)
        return interaction.reply(`${member.user.tag} upłynął limit czasu ${durations.find(d=> duration === d.value)?.name} z powodem ${reason}`)
    }
    catch(err){
        if (err){
            console.error(err)
            return interaction.reply(`\`[ ❌ ]\` Nie posiadasz wymaganych uprawnień do wykonania tej komendy! Brakujące: \`MUTE_MEMBERS\``)
        }
    }
}

module.exports = {
    name: "mute",
    description: "Limit czasu członka",
    userPermissions: ['MUTE_MEMBERS'],
    options: [
        {
            name: "user", description: "Użytkownik do przekroczenia limitu czasut",
            type: "USER", required: true
        },
        {
            name: "duration",
            description: "Czas trwania limitu czasu",
            type: "NUMBER",
            choices: durations,
            require: true
        },
        {
            name: "reason",
            description: "powód kary",
            type: "STRING",
            required: false
        }
    ],
    run
}