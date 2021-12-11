const { MessageEmbed } =  require('discord.js');

module.exports = async (oldMessage, newMessage) => {

    let channel = oldMessage.guild.channels.cache.find(ch => ch.name === "🌐⠂logs")

    let embedUpdateMessage = new MessageEmbed()
        .setTitle(`${oldMessage.author.tag}`)
        .setColor(`#0094A2`)
        .setDescription(`**<@${oldMessage.author.id}> a modifié un message dans <#${oldMessage.channel.id}>**`)
        .addField(`Ancien message`, `${oldMessage.content}`)
        .addField(`Nouveau message`, `${newMessage.content}`)

    if(!channel) return;

    channel.send(embedUpdateMessage)
}