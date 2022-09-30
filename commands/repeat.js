module.exports = {
    name: 'repeat',
    aliases: ['loop', 'rp'],
    description: 'Répète la musique en cours de lecture / dans la file d\'attente',
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
      let mode = null
      switch (args[0]) {
        case 'off':
          mode = 0
          break
        case 'song':
          mode = 1
          break
        case 'queue':
          mode = 2
          break
      }
      mode = queue.setRepeatMode(mode)
      mode = mode ? (mode === 2 ? 'Répéter la file d\'attente' : 'Répéter la chanson') : 'Off'
      message.channel.send(` Le mode répétition est \`${mode}\``)
    }
  }