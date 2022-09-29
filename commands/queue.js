module.exports = {
    name: 'queue',
    aliases: ['q'],
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
      const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Joue: ' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')
      message.channel.send(`**File d'attente**\n${q}`)
    }
  }