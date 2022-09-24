module.exports = {
    name: "panels",
    description: "Wysyła panel z weryfikacją bądź ticketami.",
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "channel",
        description: "Wprowadź kanał na którym ma zostać wysłany panel.",
        type: "CHANNEL",
        required: true,
    }, {
        name: "type",
        description: "Wprowadź typ panelu.",
        type: "STRING",
        required: true,
        choices: [{
            name: "weryfikacja",
            value: "verify",
        }, {
            name: "ticket",
            value: "ticket",
        }],
    }, {
        name: "button_type",
        description: "Wprowadź rodzaj przycisku.",
        type: "STRING",
        required: true,
        choices: [{
            name: "PRIMARY",
            value: "PRIMARY",
        }, {
            name: "SECONDARY",
            value: "SECONDARY",
        }, {
            name: "SUCCESS",
            value: "SUCCESS",
        }],
    }, {
        name: "button_label",
        description: "Wprowadź wiadomość poza wiadomością embed.",
        type: "STRING",
        required: true,
    }, {
        name: "embed_description",
        description: "Wprowadź opis wiadomości embed.",
        type: "STRING",
        required: true,
    }, {
        name: "embed_title",
        description: "Wprowadź tytuł wiadomości embed.",
        type: "STRING",
        required: false,
    }, {
        name: "embed_footer",
        description: "Wprowadź stópkę wiadomości embed.",
        type: "STRING",
        required: false,
    }, {
        name: "embed_thumbnail",
        description: "Wprowadź obraz wiadomości embed.",
        type: "STRING",
        required: false,
    }, {
        name: "embed_image",
        description: "Wprowadź zdjęcie wiadomości embed.",
        type: "STRING",
        required: false,
    }, {
        name: "embed_color",
        description: "Wprowadź kolor wiadomości embed.",
        type: "STRING",
        required: false,
    }],

    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");
        const type = interaction.options.getString("type");

        const embed_title = interaction.options.getString("embed_title");
        const embed_description = interaction.options.getString("embed_description");
        const embed_footer = interaction.options.getString("embed_footer");
        const embed_image = interaction.options.getString("embed_image");
        const embed_thumbnail = interaction.options.getString("embed_thumbnail");
        const embed_color = interaction.options.getString("embed_color");

        const button_type = interaction.options.getString("button_type");
        const button_label = interaction.options.getString("button_label");

        const message = interaction.options.getString("message");

        if (type === "verify") {
            const verifyButton = new client.discord.MessageButton({
                customId: "VERIFY_BUTTON",
                style: button_type,
                label: button_label,
            });

            const verifyActionRow = new client.discord.MessageActionRow({
                components: [ verifyButton ],
            });

            interaction.reply({ content: "\`[ ✔️ ]\` Panel weryfikacyjny został pomyślnie wysłany na <#" + channel + ">!", ephemeral: true });

            channel.send({ content: message, embeds: [{
                title: embed_title,
                description: embed_description,
                footer: {
                    text: embed_footer,
                },
                image: {
                    url: embed_image,
                },
                thumbnail: {
                    url: embed_thumbnail,
                },
                color: embed_color,
            }], components: [ verifyActionRow ] });
        };

        if (type === "ticket") {
            const ticketButton = new client.discord.MessageButton({
                customId: "TICKET_BUTTON",
                style: button_type,
                label: button_label,
            });

            const ticketActionRow = new client.discord.MessageActionRow({
                components: [ ticketButton ],
            });

            interaction.reply({ content: "\`[ ✔️ ]\` Panel z ticketami został pomyślnie wysłany na <#" + channel + ">!", ephemeral: true });

            channel.send({ content: message, embeds: [{
                title: embed_title,
                description: embed_description,
                footer: {
                    text: embed_footer,
                },
                image: {
                    url: embed_image,
                },
                thumbnail: {
                    url: embed_thumbnail,
                },
                color: embed_color,
            }], components: [ ticketActionRow ] });
        };
    },
};