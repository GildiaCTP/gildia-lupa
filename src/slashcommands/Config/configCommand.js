module.exports = {
    name: "config",
    description: "Zarządza ustawieniami bota.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "witaj_kanal",
        description: "Ustawia kanał powitalny.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    },{
        name: "wyszedl_kanal",
        description: "Ustawia rolę nadawaną przy dołączeniu.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }, {
        name: "verify_role1",
        description: "Ustawia rolę nadawaną przy weryfikacji.",
        type: "SUB_COMMAND",
        options: [{
            name: "role",
            description: "Wprowadź rolę.",
            type: "ROLE",
            required: true,
        }],
    }, {
        name: "ticket_rola1",
        description: "Ustawia rolę z dostępem do ticketów.",
        type: "SUB_COMMAND",
        options: [{
            name: "role",
            description: "Wprowadź rolę.",
            type: "ROLE",
            required: true,
        }],
    }, {
        name: "ticket_kategoria1",
        description: "Ustawia kategorię w której mają być tworzone tickety.",
        type: "SUB_COMMAND",
        options: [{
            name: "category",
            description: "Wprowadź ID kategorii.",
            type: "CHANNEL",
            required: true,
        }],
    }],

    run: async (client, interaction) => {
        const option = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel("channel");
        const message = interaction.options.getString("message");
        const category = interaction.options.getChannel("category");
        const role = interaction.options.getRole("role");
        const text = interaction.options.getString("text");

        if (option === "witaj_kanal") {
            client.database.set(`witaj_kanal_${interaction.guildId}`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kanał powitalny został ustawiony na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "wyszedl_kanal") {
            client.database.set(`wyszedl_kanal_${interaction.guildId}`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kanał pożegnalny został ustawiony na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "verify_role1") {
            client.database.set(`verify_role1_${interaction.guildId}`, role.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Rola nadawana przy weryfikacji została ustawiona na <@&" + role.id + ">!", ephemeral: true });
        };

        if (option === "ticket_rola1") {
            client.database.set(`ticket_rola1_${interaction.guildId}`, role.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Rola z dostępem do ticketów ustawiona na <@&" + role.id + ">!", ephemeral: true });
        };

        if (option === "ticket_kategoria1") {
            client.database.set(`ticket_kategoria1_${interaction.guildId}`, category.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kategoria w której będą tworzyć się tickety została ustawiona na **" + category.id + "**!", ephemeral: true });
        };
    },
};