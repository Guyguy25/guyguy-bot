const { prefix } = require('../config.json')
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const list = [];

module.exports.run = async (client, message, args) => {
    var NoLink = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("un lien VALIDE est nécessaire pour cette commande")

    var AddList = new Discord.MessageEmbed()
    .setColor("#0FFF00")
    .setTitle("vidéo ajouté à la file d'attente")

    function PlayMusic(connection){
        let dispatcher = connection.play(ytdl(list[0], { quality: "highestaudio"}));
    
        dispatcher.on("finish", () => {
            list.shift();
            dispatcher.destroy();
    
            if(list.length > 0){
                PlayMusic(connection);
            }
            else {
                connection.disconnect();
            }
        });
    
        dispatcher.on("error", err => {
            console.log("erreur de dispatcher : " + err);
            dispatcher.destroy();
            connection.disconnect();
        });
    }
    if(message.member.voice.channel){
        let args = message.content.split(" ");

        if(args[1] == undefined || !args[1].startsWith("https://www.youtube.com/watch?v=")){   
            message.channel.send(NoLink);
        }
        else {
            if(list.length > 0){
                list.push(args[1]);
                message.channel.send(AddList);
            }
            else {
                list.push(args[1]);
                message.channel.send(AddList);
    
                message.member.voice.channel.join().then(connection => {
                    PlayMusic(connection);
    
                    connection.on("disconnect", () => {
                        list = [];
                    });
    
                }).catch(err => {
                    message.reply("erreur lors de la connexion : " + err);
                })
            }
        }
    }
}

module.exports.config = {
    name: "play",
    name1: "p"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.config.name + '         |    ✔️ ready    |');
    console.log(`| ${prefix}` + module.exports.config.name1 + '            |    ✔️ ready    |');
}

startLOG();