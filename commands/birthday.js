const { prefix } = require('../config.json')
const Discord = require('discord.js');
const messageDelete = require('../extra/logs/messageDelete');
const { cp } = require('fs');

module.exports.run = async (client, message, args) => {
    message.channel.send("🍰 J'ai été crée le `19 noveambre 2021` 🎉")
}

module.exports = async (client) => {
    client.on('message', async (message) => {
        var BirthDay = new Date('2021-11-19T00:00:00.000Z');
        /*var jour = BirthDay.getDay();
        var heure = BirthDay.getHours();
        var minutes = BirthDay.getMinutes();*/

        var oneYears = new Date('2021-11-27T13:11:00.000Z');

        var now = new Date();
        var jour = now.getDay();
        var heure = now.getHours();
        var minutes = now.getMinutes(1);

        console.log("now", now)

        channel2 = client.channels.cache.find(channel => channel.id === '913965323563196456');

        if(message.content == ("!test")) {
            if(now === now) {
                // nombre de jours qui s'épart le moment ou l'utilisateur éxecute la commande et la date de création du bot
                message.channel.send(`J'ai été crée il y a ${Math.round(now / 86400000 - BirthDay / 86400000)} jours. (${BirthDay.toLocaleDateString()})`)
            }

            // setInterval(function(){
            //     if(minutes === minutes/*Math.round(BirthDay == oneYears)*/) {
            //         console.log("C'est mon anniv")
            //         channel2.send("C'est mon anniv")
            //     } else {
            //         console.log("C'est passé mon anniv")
            //         channel2.send("C'est plus mon anniv")
            //     }
            // }, 1000)
        }
    })
}

module.exports.config = {
    name: "birthday"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.config.name + '     |    ✔️ ready    |');
}

startLOG();