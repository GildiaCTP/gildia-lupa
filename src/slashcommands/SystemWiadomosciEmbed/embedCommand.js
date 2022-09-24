module.exports = {
    name: "embed",
    description: "Tworzy wiadomość embed.",
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "channel",
        description: "Wprowadź kanał na którym ma zostać wysłana wiadomość.",
        type: "CHANNEL",
        required: true,
    }, {
        name: "title",
        description: "Wprowadź tytuł wiadomości.",
        type: "STRING",
        required: true,
    }, {
        name: "description",
        description: "Wprowadź opis wiadomości.",
        type: "STRING",
        required: true,
    }, {
        name: "color",
        description: "Wprowadź kolor wiadomości.",
        type: "STRING",
        required: true,
    }, {
        name: "footer",
        description: "Wprowadź stópkę wiadomości.",
        type: "STRING",
        required: false,
    }, {
        name: "thumbnail",
        description: "Wprowadź zdjęcie obok nagłówka wiadomości.",
        type: "STRING",
        required: false,
    }, {
        name: "image",
        description: "Wprowadź zdjęcie wiadomości.",
        type: "STRING",
        required: false,
    }, {
        name: "message",
        description: "Wprowadź treść poza wiadomością embed.",
        type: "STRING",
        required: false,
    }],

    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");
        const footer = interaction.options.getString("footer");
        const thumbnail = interaction.options.getString("thumbnail");
        const image = interaction.options.getString("image");
        const color = interaction.options.getString("color");
        const messageoutsideembed = interaction.options.getString("message");

        interaction.reply({ content: "\`[ ✔️ ]\` Wiadomość embed została pomyślnie wygenerowana na <#" + channel + ">!", ephemeral: true });

        var finaldescription = description;
        finaldescription = finaldescription.replaceAll("{N}", "\n");

        channel.send({ content: messageoutsideembed, embeds: [{
            title: title,
            description: finaldescription,
            color: color,
            footer: {
                text: footer,
            },
            thumbnail: {
                url: thumbnail,
            },
            image: {
                url: image,
            },
        }] }).then(msg => {
            try {
                if (msg.channel.type === 'news') {
                    msg.crosspost();
                };
            } catch (error) {
                interaction.reply({ content: "\`[ ⚠️ ]\` Podczas próby wykonania tej komendy wystąpił błąd! Spróbuj ponownie!", ephemeral: true });
            };
        });
    },
};