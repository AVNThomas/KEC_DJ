/*
//  Dev by Thomas Dehennault
//  A simple discord music bot
*/

const { PermissionFlagsBits } = require('discord.js');
const discord = require('discord.js');
require ('dotenv').config();
const client = new discord.Client({ intents: [ 
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.GuildVoiceStates,
    discord.GatewayIntentBits.MessageContent
 ] });

const { DisTube } = require('distube');
const fs = require('fs');
const prefix = ".";
client.commands = new discord.Collection()
client.aliases = new discord.Collection()

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
})

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log('Could not find any commands!')
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('Could not find any commands!')
    jsFiles.forEach(file => {
      const cmd = require(`./commands/${file}`)
      console.log(`Loaded ${file}`)
      client.commands.set(cmd.name, cmd)
      if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
  })

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    const prefix = '.'
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
      return message.channel.send(`Vous devez être dans un salon vocal`)
    }
    try {
      cmd.run(client, message, args)
    } catch (e) {
      console.error(e)
      message.channel.send(`Error: \`${e}\``)
    }
  })

client.distube.on("playSong", (queue, song) => {
    queue.textChannel.send(`Joue \`${song.name}\` - \`${song.formattedDuration}\`

Requested by: ${song.user}`);
});

client.distube.on("addSong", (queue, song) => {
    queue.textChannel.send(`Ajoute \`${song.name}\` - \`${song.formattedDuration}\` à la file d'attente par ${song.user.name}`);
});

client.distube.on("playList", (queue, playlist, song) => {
    queue.textChannel.send(`Joue \`${playlist.name}\` playlist (${playlist.songs.length} Musique).

Demandé par: ${song.user}

Joue \`${song.name}\` - \`${song.formattedDuration}\``);
});

client.distube.on("addList", (queue, playlist) => {
    queue.textChannel.send(`Ajoute \`${playlist.name}\` playlist (${playlist.songs.length} musique) à la file d'attente`);
});

client.distube.on("error", (message, e) => {
    console.error(e)
});

client.on('ready', () => {
    console.log('Bot is ready');
});

client.login(process.env.TOKEN);