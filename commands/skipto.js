module.exports = {
    name: 'skipto',
    aliases: ['st'],
    description: 'Saute à une musique',
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a pas de musique en cours de lecture`)
      if (!args[0]) {
        return message.channel.send(`${client.emotes.error} | Veuillez entrer un nombre de chanson à sauter`)
      }
      const num = Number(args[0])
      if (isNaN(num)) return message.channel.send(`${client.emotes.error} | Veuillez entrer un nombre valide`)
      await client.distube.jump(message, num).then(song => {
        message.channel.send({ content: `Skipped to: ${song.name}` })
      })
    }
  }