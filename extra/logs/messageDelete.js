const { MessageEmbed } = require('discord.js');

module.exports=async (message)=> {

    let channel = message.guild.channels.cache.find(ch => ch.name === "🌐⠂logs")
    
    let embedLog = new MessageEmbed()
        .setTitle(`${message.author.tag}`)
        .setDescription(`**<@${message.author.id}> a supprimé un message dans <#${message.channel.id}>**`)
        .setColor("#00E8FF")
        .addField(`Message`, `${message.content}`)

    if(!channel)return;
    channel.send(embedLog)
}