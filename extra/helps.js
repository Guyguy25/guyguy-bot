const Discord = require('discord.js');
const { prefix } = require('../config.json')

module.exports = async (client, message, args) => {
    client.on('message', (message) => {

        if(message.content == (prefix + "help")) {
            let embedHelp = new Discord.MessageEmbed()
            .setThumbnail('https://i.imgur.com/5tjKMln.png')
            .setAuthor("Guyguy's Bot Commandes/Plugins", 'https://i.imgur.com/5tjKMln.png')
            .addFields(
                { name: 'Moderation', value: '\`.help moderation\`', inline: true},
                { name: 'Musique', value: '\`.help musique\`', inline: true },
                { name: 'Extra', value: '\`.help extra\`', inline: true },
                { name: `Test`, value: `Hello world`, inline: true },
                { name: `Test2`, value: `Hello !`, inline: true },
                { name: `Test3`, value: `Hello !`, inline: true },
            )
            .setTimestamp()

            message.channel.send(embedHelp)
        }
     
        let args = message.content.substring(prefix.length).split("  ")
        let embedMODERATION = new Discord.MessageEmbed()
        .setTitle('Commandes de modération')
        .addFields(
            { name: '\`.ban [membre] [raison(facultatif)]\`', value: "Bannir un utilisateur du serveur"},
            { name: '\`.kick [membre] [raison(facultatif)]\`', value: "Expulser un utilisateur du serveur"},
            { name: '\`.warn [membre] [raison]\`', value: "Avertir un utilisateur"},
            { name: '\`.warns [membre]\`', value: "Savoir le nombre d'avertissement(s) qu'utilisateur a"},
            { name: '\`.clear [nombre de message(s)]\`', value: "Supprimer un/des message(s)"},
        )
        switch(args[0]){
            case 'help moderation':
            case 'help moderator':
            case 'help modo':
                message.channel.send(embedMODERATION)
            break;
        }
    })
}

module.exports.config = {
    name: "help"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.config.name + '         |    ✔️ ready    |');
}

startLOG();