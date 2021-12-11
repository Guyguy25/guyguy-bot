const Discord = require('discord.js');

module.exports = client => {
    const { guildID, membercount } = require('../config.json');

    const updateMembers = guild => {
        const TotalchannelID = guild.channels.cache.get(membercount.TotalchannelID)
        const MemberchannelID = guild.channels.cache.get(membercount.MemberchannelID)
        const BotchannelID = guild.channels.cache.get(membercount.BotchannelID)
        TotalchannelID.setName(`🌟 Total: ${guild.memberCount.toLocaleString()}`);
        MemberchannelID.setName(`👥 Membres: ${guild.members.cache.filter(m => !m.user.bot).size.toLocaleString()}`);
        BotchannelID.setName(`🤖 Bots: ${guild.members.cache.filter(m => m.user.bot).size.toLocaleString()}`);
    }

    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))

    const guild = client.guilds.cache.get(guildID)
    updateMembers(guild)
}