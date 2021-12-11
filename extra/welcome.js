module.exports = async (client) => {
    const { welcome } = require('../config.json')
    const Discord = require('discord.js');

    client.on('guildMemberAdd', member => {
        const WelcomeMessage = `Bienvenue à <@${member.id}> sur __**${member.guild.name}**__, *veuillez l'accueillir comme il se doit* <a:roulade:911256367636041818>`

        const channel = member.guild.channels.cache.get(welcome.channel)
        channel.send(WelcomeMessage)
    })
}