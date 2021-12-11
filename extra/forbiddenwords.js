const { Discord } = require('discord.js');
const config = require('../config.json');

module.exports = client => {
    function includesRealy(msg,str){
        return(
            msg.content.includes(str) ||
            msg.content.includes(str.toUpperCase()) ||
            msg.content.includes(str.toLowerCase())
        )
    }
       
    client.on('message',function(message){

        let badWord1 = "pute"
        let badWord2 = "sale juif"
        let badWord3 = "sale noir"
        let badWord4 = "connard"
        let badWord5 = "je suis raciste"
        let badWord6 = "nique les arabes"
        let badWord7 = "nique ta mere"

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(
                includesRealy(message, badWord1) ||
                includesRealy(message, badWord2) ||
                includesRealy(message, badWord3) ||
                includesRealy(message, badWord4) ||
                includesRealy(message, badWord5) ||
                includesRealy(message, badWord6) ||
                includesRealy(message, badWord7)
            ){
                message.delete()
                message.reply(`**Toute insultes, propos raciste, propos choquants sont punissable.**\n*Merci de bien respecter le règlement ->* ${message.guild.channels.cache.get(config.rulesChannel)}`)
            }
        }
    })

    function includesRealy(msg,str){
        return(
            msg.content.includes(str) ||
            msg.content.includes(str.toUpperCase()) ||
            msg.content.includes(str.toLowerCase())
        )
    }
       
    client.on('message',function(message){

        let thing1 = "https://discord.gg/"
        let thing2 = "https://fr.pornhub.com/"
        let thing3 = "https://www.youtube.com/channel/"
        let thing4 = "https://www.instagram.com/"
        let thing5 = "https://www.twitch.tv/"

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(
                includesRealy(message, thing1) || 
                includesRealy(message, thing2) ||
                includesRealy(message, thing3) ||
                includesRealy(message, thing4)
            ){
                message.delete()
                message.reply(`**Pas de lien ici, surtout pas des pubs, ni des liens bizarre.**\n*Merci de bien respecter le règlement ->*${message.guild.channels.cache.get(config.rulesChannel)}`)
            }
        }
        
    })
}