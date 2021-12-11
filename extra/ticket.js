const { prefix, channelTicket} = require('../config.json')
const Discord = require('discord.js');

const command1 = "ticket"
const command2 = "support"

module.exports = (client, message, msg) => {
    client.on("message", (message) => {
        if(message.content === (prefix + command1) || message.content === (prefix + command2)){
            message.delete()
            if(message.channel.parentID == '911966589027495967'){
                message.guild.channels.create(`ticket: ${message.member.displayName}`, {type: 'text'}).then(channel => {
                    let category = message.guild.channels.cache.get(channelTicket, c => c.type == "category")
                    channel.setParent(category)
                    let admin = message.guild.roles.cache.get("911968925414207488")

                    channel.updateOverwrite(message.guild.id, {
                        SEND_MESSAGE: false,
                        VIEW_CHANNEL: false,
                    })

                    channel.updateOverwrite(message.author, {
                        SEND_MESSAGE: true,
                        VIEW_CHANNEL: true,
                    })

                    channel.updateOverwrite(message.guild.id, {
                        SEND_MESSAGE: false,
                        VIEW_CHANNEL: false,
                    })

                    channel.updateOverwrite(admin, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                    }).then(async channel_ticket => {
                        const embedTicket = new Discord.MessageEmbed()
                        .setColor('GRAY')
                        .setTitle(`Ticket de ${message.member.displayName}`)
                        .setURL(`https://discord.com/`)
                        .setAuthor(`${message.member.displayName}`, `${message.member.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
                        .setDescription('Notre système de ticket.')
                        .setThumbnail(message.guild.iconURL())
                        .addFields(
                        { name: 'Description', value: "*Le système de ticket vous permet de vous mettre en contact avec les modérateurs et l'équipe du staff de façon anonyme.*\nSi vous avez des __questions__, __conseils__ sur le serveur, etc... \n**Peu importe votre problème l'équipe de modération essayera de le résoudre.**\nPour fermer le ticket veuillez utiliser la réaction ci-dessous '⛔'" },
                            { name: '\u200B', value: '\u200B' },
                            { name: `ID`, value: `${message.author.id}`, inline: true },
                            { name: `TAG`, value: `${message.author.tag}`, inline: true },
                        )
                        .addField('Pseudo', message.member.displayName, true)
                        .setTimestamp()
                        .setFooter('TICKET', 'https://i.imgur.com/a8dMyJU.png')

                        const reactionMessage = await channel_ticket.send(embedTicket);
            
                        try {
                            await reactionMessage.react('⛔');
                        } catch (err) {
                            channel_ticket.send('Error sending emojis!')
                            throw err;
                        }
                            
                        const collector = reactionMessage.createReactionCollector(
                            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id),
                            { dispose: true }
                        );
                        
                        collector.on('collect', (reaction, user) => {
                            switch (reaction.emoji.name) {
                                case "⛔":
                                    channel_ticket.send('Ce salon se supprimera dans exactement 5 secondes !');
                                    setTimeout(() => channel_ticket.delete(), 5000);
                                    break;
                            }
                        })

                        message.channel.send(`<@${message.member.id}>, Un nouveau ticket à été crée pour vous ! ${channel_ticket}`).then((msg) => {
                            setTimeout(function() {
                                msg.delete()
                            }, 7000)
                        })
                    })
                })
            } else {
                message.delete()
                message.reply(`**Cette commande fontionne uniquement dans le salon ->** <#911780904903524364>`).then((sent) => {
                    setTimeout(function() {
                        sent.delete()
                    }, 7000)
                })
            }
        } else {
            if(message.author.bot) return;
            if(!message.channel.parentID == "911966589027495967") return;
            if(message.channel.parentID == "911966589027495967") {
                message.delete()
                message.reply('Vous devez utilisé la commande ci dessus!').then((sent) => {
                    setTimeout(function() {
                        sent.delete()
                    }, 5000)
                })
            }
        }

        let args = message.content.substring(prefix.length).split("  ")
        let embedTicketHelp = new Discord.MessageEmbed()
        .setTitle('Commande ticket/support')
        .addFields(
            { name: 'Les commandes : \`.ticket\` / \`.support\`', value: "Vous permet de créer un salon textuel privé **anonyme** qui contient uniquement vous et l'équipe modération"},
        )

        switch(args[0]){
            case 'help ticket':
            case 'help support':
                message.channel.send(embedTicketHelp)
            break;
        }
    })
}

module.exports.configLog = {
    name: "ticket",
    name1: "support"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.configLog.name + '       |    ✔️ ready    |');
    console.log(`| ${prefix}` + module.exports.configLog.name1 + '      |    ✔️ ready    |');
}

startLOG();