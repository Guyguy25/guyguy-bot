const { MessageEmbed, Discord } = require('discord.js');
const { prefix } = require('../config.json');
module.exports.run = async (client, message, args, member) => {
    let UserKicked = message.guild.member(
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (!UserKicked) {
        return message.reply(
            `**L'utilisateur n'existe pas.❌**`
        );
    }

    let kickReason = args.join(' ').slice(22);
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply(
            `**Vous n'avez pas la permission d'expulser des membres.❌**`
        );
    }

    if (
        UserKicked.hasPermission('MANAGE_MESSAGES') || 
        UserKicked.hasPermission('BAN_MEMBERS') || 
        UserKicked.hasPermission('KICK_MEMBERS') || 
        UserKicked.hasPermission('ADMINISTRATOR')
        ) {
        return message.reply(
            `**Vous ne pouvez pas expulser cette personne.❌**`
        );
    }

    let kickEmbed = new MessageEmbed()
        .setDescription('Kick')
        .setColor('#FF0000')
        .addField('Utilisateur expulsé', `${UserKicked} (ID: ${UserKicked.id})`)
        .addField(
            'Auteur',
            `${message.author} (ID: ${message.author.id})`
        )
        .addField('Canal', message.channel)
        .addField('Raison', kickReason)

    let Kickchannel = message.guild.channels.cache.find(channel => channel.name === '⛔⠂reports');
    if (!Kickchannel) {
        return message.reply(
            "Canal 'Reports' introuvable."
        );
    }

    message.guild.member(UserKicked).kick(kickReason);
    Kickchannel.send(kickEmbed);
}

module.exports.config = {
    name: "kick"
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