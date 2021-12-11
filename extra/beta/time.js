/* const { prefix } = require('../config.json')
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    var now = new Date();

    message.channel.send(`Date FR : Nous sommes le ${now.toLocaleDateString()} et il est ${now.getHours()}h${now.getMinutes()}:${now.getSeconds()}` + '\n' + `Date US : Its ${now.getMonth.toString} ${now.getDay('en-US')} and he is ${now.getHours('en-US')}h${now.getMinutes('en-US')}:${now.getSeconds('en-US')}`)
}

module.exports.config = {
    name: "time"
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

startLOG();*/