const { prefix } = require('../config.json')
const { Discord, MessageEmbed, Message} = require('discord.js');
module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || message.member;

    message.channel.send(
        new MessageEmbed()
            .setTitle(`Avatar de ${member.user.tag}`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor("RANDOM")
    )
}

module.exports.config = {
    name: "avatar",
    name1: "pp",
    name2: "pdp"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.config.name + '       |    ✔️ ready    |');
    console.log(`| ${prefix}` + module.exports.config.name1 + '           |    ✔️ ready    |');
    console.log(`| ${prefix}` + module.exports.config.name2 + '          |    ✔️ ready    |');
}

startLOG();