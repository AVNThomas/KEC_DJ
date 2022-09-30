module.exports = {
  name: 'playskip',
  aliases: ['pk'],
  description: 'Joue une musique et saute la musique en cours de lecture',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`Veuillez entrer une musique à jouer`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    })
  }
}