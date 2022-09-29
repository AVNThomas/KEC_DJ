module.exports = {
    name: 'volume',
    aliases: ['v', 'set', 'set-volume'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
      const volume = parseInt(args[0])
      if (isNaN(volume)) return message.channel.send(`Veuillez entrer un nombre valide`)
      queue.setVolume(volume)
      message.channel.send(`Le volume est a: \`${volume}\``)
    }
  }