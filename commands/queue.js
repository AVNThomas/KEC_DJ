module.exports = {
    name: 'queue',
    aliases: ['q'],
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
      
      const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Joue: ' : `${i}.`} \`${song.name}\` - \`${song.formattedDuration}\``)
      .join('\n')
      if (q.length > 2048) return message.channel.send(`La file d'attente est trop longue pour être affichée`)
      message.channel.send(`**File d'attente**\n${q}`)
      console.error(e)
      message.channel.send(`Error: \`${e}\``)
    }
  }