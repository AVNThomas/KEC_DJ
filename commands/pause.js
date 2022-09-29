module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
      if (queue.paused) {
        queue.resume()
        return message.channel.send('La musique a été reprise')
      }
      queue.pause()
      message.channel.send('La musique a été mise en pause')
    }
  }