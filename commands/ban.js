const { MessageEmbed, Discord } = require('discord.js');
const { prefix } = require('../config.json');
module.exports.run = async (client, message, args, member) => {
    const { mentions } = message

    let UserBanned = message.guild.member(
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (!UserBanned) {
        return message.reply(
            `**L'utilisateur n'existe pas.❌**`
        );
    }

    let BanReason = args.join(' ').slice(22);
    if (!message.member.hasPermission('BAN_MEMBERS') || UserBanned.hasPermission('KICK_MEMBERS')) {
        return message.reply(
            `**Vous n'avez pas la permission de bannir des membres.❌**`
        );
    }

    if (
        UserBanned.hasPermission('MANAGE_MESSAGES') || 
        UserBanned.hasPermission('BAN_MEMBERS') || 
        UserBanned.hasPermission('KICK_MEMBERS') || 
        UserBanned.hasPermission('ADMINISTRATOR')
        ) {
        return message.reply(
            `**Vous ne pouvez pas bannir cette personne.❌**`
        );
    }

    let banEmbed = new MessageEmbed()
        .setDescription('Ban')
        .setColor('#FF0000')
        .addField('Utilisateur banni', `${UserBanned} (ID: ${UserBanned.id})`)
        .addField(
            'Auteur',
            `${message.author} (ID: ${message.author.id})`
        )
        .addField(
            'Canal', 
            message.channel
        )
        .addField(
            'Raison', 
            BanReason
        )

    let Banchannel = message.guild.channels.cache.find(channel => channel.name === '⛔⠂reports');
    if (!Banchannel) {
        return message.reply(
            "Canal 'Reports' introuvable."
        );
    }

    message.guild.members.cache.get(mentions.users.first().id).ban()
    Banchannel.send(banEmbed);
}

module.exports.config = {
    name: "ban"
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function startLOG(){
    await delay(0.9);
    console.log(`| ${prefix}` + module.exports.config.name + '          |    ✔️ ready    |');
}

startLOG();