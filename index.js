const Discord = require('discord.js');
const config = require('./config.json');

const joincreate = require('./extra/joincreate');
const welcome = require('./extra/welcome');
const badwords = require('./extra/forbiddenwords');
const messageDelete = require('./extra/logs/messageDelete');
const messageUpdate = require('./extra/logs/messageUpdate');
const voiceLeave = require('./extra/logs/voiceUpdate');
const memberCount = require('./extra/memberCount');
const ticket = require('./extra/ticket')
const help = require('./extra/helps')
const birthday = require('./commands/birthday');

fs = require('fs');
client = new Discord.Client();

client.setMaxListeners(50);
// client.login(config.token);
client.login(process.env.TOKEN);

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if (jsfile.length <= 0) {
    return console.log('Impossible de trouver des commandes');
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);

    client.commands.set(pull.config.name, pull);
    client.commands.set(pull.config.name1, pull);
    client.commands.set(pull.config.name2, pull);
  });
});

client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;

  let messagearray = message.content.split(" ")
  let cmd = messagearray[0];
  let args = message.content.trim().split(/ +/);

  if (!message.content.startsWith(config.prefix)) return;

  let commandfile = client.commands.get(cmd.slice(config.prefix.length))

  if (commandfile) commandfile.run(client, message, args);
});

/*const activities_list = [
  { type: 'PLAYING',  message: 'JavaScript'  },
  { type: 'WATCHING', message: '.help' },
  { type: 'LISTENING', message: 'French' },
  { type: 'STREAMING', message: '🤍Create by Guyguy', url: "https://www.twitch.tv/guyguy_tv"}
];

client.on('ready', () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);

    client.user.setActivity(activities_list[index].message, { type: activities_list[index].type } || { url: activities_list[index].url});
  }, 20000);
});*/

client.on('ready', async (message) => {
  console.log('LOGS \n\n.-------------------------------.\n|           Commandes           |\n|-------------------------------|');
  client.user.setActivity("🤍 .help", {
    type: "STREAMING",
    url: "https://www.twitch.tv/guyguy_tv",
  })

  joincreate(client)
  welcome(client)
  badwords(client)
  memberCount(client)
  ticket(client)
  help(client)
  birthday(client)
})

channelID = "910912275521634317";

client.on('voiceStateUpdate', async(oldState, newState) => {
  voiceLeave(oldState, newState)

  if(oldState.channelID === newState.channelID) {
    console.log('a user has not moved!')
  }
  if(oldState.channelID != null && newState.channelID != null && newState.channelID != oldState.channelID) {
      console.log('a user switched channels')
  }
  if(oldState.channelID === null) {
      console.log('a user joined!')
  }
  if (newState.channelID === null) {
      console.log('a user left!')
  }
})

client.on('messageDelete', async(message)=> {
  messageDelete(message)
})

client.on('messageUpdate', async(oldMessage, newMessage) => {
  messageUpdate(oldMessage, newMessage)
})

function delay(n){
  return new Promise(function(resolve){
    setTimeout(resolve,n*1000);
  });
}

async function startLOG(){
  await delay(1.2);
  console.log('⠂-------------------------------⠂');
}

startLOG();