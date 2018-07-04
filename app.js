var Discord = require('discord.js')
const bit = new Discord.Client();
const config = require('./private/config.json')
const talkedRecently = new Set()


bit.on('warn', console.warn)
bit.on('error', console.error)
bit.on('disconnected', function () {console.error('Disconnected!')})
bit.on('reconnecting', () => console.log('Reconnecting'))
bit.on('ready', () => {
  console.log(`Logged in as ${config.name}!`);
  console.log('Node version: ' + process.version + '\nDiscord.js version: ' + Discord.version)
  bit.user.setActivity('Use b!info to understand what I do!')
});

bit.on('message', async message => {
  if (message.author.bot) return
  let args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  let content = message.content.toLowerCase()
  let sContentArgs = message.content.trim().split(/ +/g)
  let sContentCommand = sContentArgs.shift().toLowerCase()
  if (talkedRecently.has(message.author.id)) {return}
  talkedRecently.add(message.author.id)
  setTimeout(() => {talkedRecently.delete(message.author.id)}, 2500)
  if (message.author.bot) return
  if (message.content.indexOf(config.prefix) !== 0) return
  console.log('Recived ' + message.content + ' from ' + message.author)

  if (command === 'ping') {
    message.channel.startTyping()
    const m = await message.channel.send('Calculating...')
    m.edit(':ping_pong:' + (m.createdTimestamp - message.createdTimestamp) + ' ms')
    message.channel.stopTyping()
  }

  if (command === 'info'){
    message.channel.startTyping()
    
  }

  if (command === 'login') {
    message.channel.startTyping()
    message.reply('');
    message.channel.stopTyping()
  }


});

if (config.token) {
  bit.login(config.token)
} else {
  console.error('Bot token not found!')
}
