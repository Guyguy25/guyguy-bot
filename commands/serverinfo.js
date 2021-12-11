const { prefix } = require('../config.json');
const { MessageEmbed, Discord } = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args) => {
    const guild = message.guild;
    const IsEmbed = new MessageEmbed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .setColor("RANDOM")
        .addField('Infos générales', [
            `ID: ${guild.id}`,
            `Nom du serveur: ${guild.name}`,
            `Fondateur: ${guild.owner}`
        ])
        .addField('Infos compteur', [
            `Total de membres: ${guild.memberCount}`,
            `Total de rôles: ${guild.roles.cache.size}`,
            `Total de salons: ${guild.channels.cache.filter((ch) => ch.type === 'text' || ch.type === 'voice').size}`,
            `Total d'emojis': ${guild.emojis.cache.size}`,
            `Salon(s) textuel(s): ${guild.channels.cache.filter((ch) => ch.type === "text").size}`,
            `Salon(s) vocal(caux): ${guild.channels.cache.filter((ch) => ch.type === "voice").size}`
        ])
        .addField('Infos secondaires', [
            `Serveur crée le: ${moment(guild.createdTimestamp).format('LL')}`,
            `Région: ${guild.region}`,
            `Boost Tier: ${guild.premiumTier ? `Tier ${guild.premiumTier}` : 'Rien'
            }`,
            `Total de boost: ${guild.premiumSubscriptionCount || '0'}`
        ]);

    message.channel.send(IsEmbed);
}

module.exports.config = {
    name: "serverinfo",
    name1: "infoserver",
    name2: "is"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.config.name + '   |    ✔️ ready    |');
    console.log(`| ${prefix}` + module.exports.config.name1 + '   |    ✔️ ready    |');
    console.log(`| ${prefix}` + module.exports.config.name2 + '           |    ✔️ ready    |');
}

startLOG();