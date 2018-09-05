var Discord = require('discord.js')
const bit = new Discord.Client();
const config = require('./private/config.json')
const talkedRecently = new Set()
const vent = new Discord.WebhookClient(config.vent_id, config.vent_token)
const ventrevealer = new Discord.WebhookClient(config.vent_reveal_id, config.vent_reveal_token)

bit.on('warn', console.warn)
bit.on('error', console.error)
bit.on('disconnected', function () {console.error('Disconnected!')})
bit.on('reconnecting', () => console.log('Reconnecting'))
bit.on('ready', () => {
  console.log(`Logged in as ${config.name}!`);
  console.log('Node version: ' + process.version + '\nDiscord.js version: ' + Discord.version)
  bit.user.setActivity('Use b!info to understand what I do!')
});

const activities = ['Pineapple should not go on pizza.','Use +help to get help.','+help me.','Robots are forever on life support.','I no longer find Cards Against Humanity funny.','Vine was never funny.','I committed tax fraud for respect to yoshi.', 'Waluigi is the best.', 'biagios.github.io/porn', 'gradientforest.com', 'iconic.']
setInterval(function () {
  const activity = activities[Math.floor(Math.random() * activities.length)]
  bit.user.setActivity(activity)
}, 60000 * 5)

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

  if (command === 'vent' || sContentCommand === 'vent') {
    if (bans.vbans.includes(message.author.id)) {
      message.reply(':anger: You are banned using this command.')
      return
    }
    if (!args[0]) {
      message.channel.send(':interrobang: Please provide text to send.')
      return
    }
    const rant = args.join(' ')
    message.delete().catch(O_o => {})
    vent.send(rant + ' - Anonymous')
    ventrevealer.send('Vent by ' + message.author.tag + ' ( Author ID' + message.author.id + ' | Content: ' + message.content + ')')
    message.channel.send('Message sent to #vent successfully.')
    if (rant.includes('suicide') || rant.includes('kill myself') || rant.includes('suicidal') || rant.includes('going to killmyself') || rant.includes('kms')){
      message.author.send('Pal has detected your message has to do with suicide. If you are struggling please remember you are not alone and many have gone throught the same as you. Please, if you are thinking about it refer to one of these numbers: https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines')
    }
  }



});

if (config.token) {
  bit.login(config.token)
} else {
  console.error('Bot token not found!')
}
