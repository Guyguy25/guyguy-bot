const { MessageEmbed, Message } =  require('discord.js');

module.exports = async (oldState, newState, message) => {

    let channel = oldState.guild.channels.cache.find(ch => ch.name === "🌐⠂logs")
    let channelIDlogs = require('../../config.json')

    let embedLeaveVoice = new MessageEmbed()
        .setTitle(`${oldState.tag}`)
        .setColor(`#0094A2`)
        .setDescription(`**<@${oldState.id}> a quitté le salon vocal ${oldState.channel}**`)

    let embedJoinVoice = new MessageEmbed()
        .setTitle(`${newState.tag}`)
        .setColor(`#0094A2`)
        .setDescription(`**<@${newState.id}> a rejoint le salon vocal ${newState.channel}**`)

    if(!oldState != null && newState != null) {
        if(!channel) return;
        channel.send(embedLeaveVoice)
        
        if(!channel) return;
        channel.send(embedJoinVoice)
    }
}