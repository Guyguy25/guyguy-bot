const { prefix } = require('../config.json');
const { CommandInteraction, MessageEmbed, Discord } = require('discord.js');

module.exports.run = async (client, message, args, interaction) => {
    const { member, mentions } = message
    const check = client.emojis.cache.find(x => x.name === "CheckMark")
    const cross = client.emojis.cache.find(x => x.name === "WrongMark")

    message.delete()

    SuccesClearEmbed = new MessageEmbed()
        .setDescription(`✅ **J'ai effacé \`${args[1]}\` message(s).**`)
        .setColor("#1FCE6C")
    ;

    if(message.member.hasPermission('MANAGE_MESSAGES')){

        let args = message.content.trim().split(/ +/g);

        if(args[1]){
            if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){
                message.channel.bulkDelete(args[1])
                message.channel.send(SuccesClearEmbed).then((sent) => {
                    setTimeout(function () {
                        sent.delete();
                    }, 5000);
                });
            }   
            else {
                message.channel.send(`**${member} Veuillez indiquer une valeur **__entre 1 et 99__**.❌**`).then((sent) => {
                    setTimeout(function () {
                        sent.delete();
                    }, 8000);
                });
            }
        }
        else {
            message.channel.send(`**${member} Vous devez indiquer un nombre de messages à supprimer.❌**`).then((sent) => {
                setTimeout(function () {
                    sent.delete();
                }, 8000);
            });
        }
    }
    else {
        message.channel.send(`**${member} Vous n'avez pas les permissions requises pour pouvoir utiliser cette commande.❌**`).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 5000);
        });
    }
}

module.exports.config = {
    name: "clear"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.config.name + '        |    ✔️ ready    |');
}
  
startLOG();