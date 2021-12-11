const { prefix } = require('../config.json')
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let resMsg = await message.channel.send('Calcul du ping... :bar_chart:');
    await delay(0.8);
    resMsg.edit('🏓Pong !  ms:\`' + Math.round((resMsg.createdTimestamp - message.createdTimestamp) - client.ws.ping) + '\`' + '🪐');
}

module.exports.config = {
    name: "ping"
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