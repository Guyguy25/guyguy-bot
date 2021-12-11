const { prefix } = require('../config.json')
const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.reply("Pong :)");
}

module.exports.config = {
    name: "warns"
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