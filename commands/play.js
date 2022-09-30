module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Joue une musique',
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const string = args.join(' ')
      if (!string) return message.channel.send(`Veuillez entrer une musique à jouer`)
      client.distube.play(message.member.voice.channel, string, {
        member: message.member,
        textChannel: message.channel,
        message
      })
    }
  }