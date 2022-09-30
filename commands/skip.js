module.exports = {
    name: 'skip',
    aliases: ['s'],
    description: 'Saute la musique en cours de lecture',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
      try {
        const song = await queue.skip()
        message.channel.send(`La musique \`${song.name}\` a été sautée`)
      } catch (e) {
        message.channel.send(`Erreur${e}`)
      }
    }
  }