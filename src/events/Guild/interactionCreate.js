const client = require('../../client.js');
const db = require('quick.db');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.slashcommands.get(interaction.commandName);

        if (!command) return;

        if (interaction.channel.type === 'dm' && !interaction.guild) return;

        if (command.userPermissions && command.userPermissions.length) {
            if (!interaction.member.permissionsIn(interaction.channel).has(command.userPermissions)) return interaction.reply({ content: "\`[ ❌ ]\` Nie posiadasz wymaganych uprawnień do wykonania tej komendy! Brakujące: \`" + command.userPermissions.join('`,`',) + "\`!" });
        };

        if (command.botPermissions && command.botPermissions.length) {
            if (!interaction.guild.me.permissionsIn(interaction.channel).has(command.botPermissions)) return interaction.reply({ content: "\`[ ❌ ]\` Nie posiadam wymaganych uprawnień do wykonania tej komendy! Brakujące: \`" + command.botPermissions.join('`,`',) + "\`!" });
        };

        try {
            command.run(client, interaction);
        } catch (error) {
            interaction.reply({ content: "blad!" });
            console.error(`blad!`);
        }
    };

    if (interaction.isButton()) {
        if (interaction.customId === "TICKET_BUTTON") {
            if (client.guilds.cache.get(interaction.guildId).channels.cache.find(channel => channel.topic === interaction.user.id)) return interaction.reply({ content: "\`[ ❌ ]\` Posiadasz już aktywny ticket, nie możesz posiadać ich więcej niż \`1\`!", ephemeral: true });

            interaction.guild.channels.create("ticket-" + interaction.user.username, {
                parent: db.get(`ticket_kategoria1_${interaction.guildId}`),
                topic: interaction.user.id,
                type: "GUILD_TEXT",
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                }, {
                    id: db.get(`ticket_rola1_${interaction.guildId}`),
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                }],
            }).then(async createdTicket => {
                interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie utworzono ticket! (<#" + createdTicket.id + ">)", ephemeral: true });
                interaction.user.send({ content: "\`[ ✔️ ]\` Pomyślnie utworzyłeś ticket (<#" + createdTicket.id + ">) na serwerze \`" + interaction.guild.name + "\`!" }).catch(error => console.log(`[ ⚠️ ] Podczas próby wysłania prywatnej wiadomości do użytkownika wystąpił błąd!`));

                const closeButton = new client.discord.MessageButton({
                    customId: "TICKET_CLOSE_BUTTON",
                    style: "DANGER",
                    label: "Zamknij!",
                });

                const ticketActionRow = new client.discord.MessageActionRow({
                    components: [ closeButton ],
                });

                createdTicket.send({
                    content: "<@" + interaction.user.id + ">", embeds: [{
                        title: `${interaction.guild.name} - Tickety!`,
                        description: "🎟️ Witaj <@" + interaction.user.id + ">! Właśnie utworzyłeś ticket!\n\nNapisz podanie, Nie oznaczaj !",
                        color: "BLUE",
                    }], components: [ ticketActionRow ]
                });
            });
        };

        if (interaction.customId === "TICKET_CLOSE_BUTTON") {
            const guild = client.guilds.cache.get(interaction.guildId);
            const channel = guild.channels.cache.get(interaction.channelId);
            const ticketUser = client.users.cache.get(channel.topic);

            interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie zamknąłeś ticket! Aby ponownie go otworzyć użyj przycisku \`Otwórz ponownie\`!", ephemeral: true });
            ticketUser.send({ content: "\`[ ⚠️ ]\` Twój ticket został zamknięty przez <@" + interaction.user.id + ">!" }).catch(error => console.log(`[ ⚠️ ] Podczas próby wysłania prywatnej wiadomości do użytkownika wystąpił błąd!`));

            channel.edit({
                permissionOverwrites: [{
                    id: client.users.cache.get(channel.topic),
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                }, {
                    id: db.get(`ticket_rola1_${interaction.guildId}`),
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                }],
            }).then(async () => {
                const deleteTicketButton = new client.discord.MessageButton({
                    customId: "TICKET_DELETE_BUTTON",
                    style: "DANGER",
                    label: "Usuń!",
                });

                const openTicketButton = new client.discord.MessageButton({
                    customId: "TICKET_OPEN_BUTTON",
                    style: "SECONDARY",
                    label: "Otwórz ponownie!",
                });

                const deletTicketActionRow = new client.discord.MessageActionRow({
                    components: [deleteTicketButton, openTicketButton],
                });

                channel.send({
                    embeds: [{
                        description: "**×** Ten ticket został zamknięty, możesz podjąć specyficzne akcje poniżej!",
                        color: "BLUE",
                    }], components: [ deletTicketActionRow ]
                });
            });
        };

        if (interaction.customId === "TICKET_DELETE_BUTTON") {
            const guild = client.guilds.cache.get(interaction.guildId);
            const channel = guild.channels.cache.get(interaction.channelId);
            const ticketUser = client.users.cache.get(channel.topic);
    
            interaction.reply({ content: "\`[ ⚠️ ]\` Ticket zostanie usunięty za \`(5)\` sekund!..." });
            ticketUser.send({ content: "\`[ ⚠️ ]\` Twój ticket został usunięty przez <@" + interaction.user.id + ">!" }).catch(error => console.log(`[ ⚠️ ] Podczas próby wysłania prywatnej wiadomości do użytkownika wystąpił błąd!`));
    
            setTimeout(() => {
                channel.delete();
            }, 5000);
        };
    
        if (interaction.customId === "TICKET_OPEN_BUTTON") {
            const guild = client.guilds.cache.get(interaction.guildId);
            const channel = guild.channels.cache.get(interaction.channelId);
    
            channel.edit({
                permissionOverwrites: [{
                    id: client.users.cache.get(channel.topic),
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                }, {
                    id: db.get(`ticket_rola1_${interaction.guildId}`),
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                }],
            }).then(async () => {
                const ticketUser = client.users.cache.get(channel.topic);
    
                interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie otworzyłeś ticket! Aby ponownie go zamknąć użyj przycisku \`Zamknij\`!", ephemeral: true });
                ticketUser.send({ content: "\`[ ⚠️ ]\` Twój ticket został otwarty przez <@" + interaction.user.id + ">!" }).catch(error => console.log(`[ ⚠️ ] Podczas próby wysłania prywatnej wiadomości do użytkownika wystąpił błąd!`));
    
                channel.send({
                    embeds: [{
                        description: "**×** Ten ticket został ponownie otwarty! Użytkownik został spowrotem dodany!",
                        color: "BLUE",
                    }]
                });
            });
        };

        if (interaction.customId === "VERIFY_BUTTON") {
            let role = await interaction.guild.roles.cache.find(x => x.id === db.get(`verify_role1_${interaction.guildId}`));

            if (!role) {
                interaction.reply({ content: "\`[ ❌ ]\` Niestety ale nie udało Ci się zweryfikować!", ephemeral: true });
            } else {
                interaction.member.roles.add(role);
                
                interaction.reply({ content: "\`[ ✔️ ]\` Zostałeś pomyślnie zweryfikowany!", ephemeral: true });
            };
        };
    };
});