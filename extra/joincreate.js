module.exports = client => {
    client.on('voiceStateUpdate', (oldState, newState) => {
        const config = require('../config.json')
        if (oldState.channelID === newState.channelID) return
    
        const member = newState.member
    
        const addCategory = newState.guild.channels.cache.find(channel => channel.name == config.categoryName && channel.type === "category")
    
        const addChannel = newState.guild.channels.cache.find(channel => channel.name == config.channelName && channel.type === "voice")
    
        if (!addChannel) return console.error('Aucun canal de création trouvé')
        if (!addCategory) return console.error('Aucune catégorie de création trouvée')
    
        if (newState.channel == addChannel) {
            addChannel.guild.channels.create(`🌠⠂Salon de ${member.user.username.toLowerCase()}`, {
                type: 'voice',
                parent: addCategory.id,
                userLimit: 5,
                permissionOverwrites: [
                {
                    id: member.id,
                    allow: ['MANAGE_CHANNELS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'USE_VAD', 'STREAM', 'VIEW_CHANNEL', 'CREATE_INSTANT_INVITE', 'MOVE_MEMBERS'],
                    deny: ['DEAFEN_MEMBERS', 'MUTE_MEMBERS', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'PRIORITY_SPEAKER']
                },
                
                ]
            }).then(channel => {
                newState.setChannel(channel)
            }).catch(console.error)
        }
    
        if (!oldState.channel || oldState.channel === addChannel) return
    
        if (oldState.channel.parent && oldState.channel.parent === addCategory && oldState.channel.members && oldState.channel.members.size === 0) {
            oldState.channel.delete().catch(console.error)
            return
        }
    
        if (oldState.channel.parent && oldState.channel.parent === addCategory && oldState.channel.members && oldState.channel.members.size > 0 && oldState.channel.name === member.user.username.toLowerCase()) {
            const newOwner = oldState.channel.members.random()
            oldState.channel.edit({
                name: newOwner.user.username.toLowerCase(),
                type: 'voice',
                parent: addCategory.id,
                permissionOverwrites: [{
                    id: newOwner.id,
                    allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES']
                }]
            }).catch(console.error)
        }
    })
}