module.exports = {
    name: "help",
    description: "Wysyła Kommendy",
    userPermissions: [`MANAGE_MESSAGES`],
    botPermissions: ['SEND_MESSAGES'],

   run: async (client, interaction) => {
       const embed3 = {
            title: "UŻYTO KOMENDY | LOGI",
            description: `<@${interaction.user.id}> Użył komendy **/help**`,
            color: "RANDOM"
        }
        
        client.channels.cache.get("1022933069990203539").send({ embeds: [embed3] });
       
    interaction.reply({ embeds: [{ 
            title: "POMOC",
            description: "\n\n**/ban** - Banuje członka na twoim serwerze.\n\n**/bot** - Autor bota.\n\n**/discord** aktualnie robie - \n\n**/kick** - Wyrzuca członka z serwera.",
            color: "RANDOM"
        }] })
    },
};