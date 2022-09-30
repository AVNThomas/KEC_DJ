module.exports = {
    name: 'leave',
    aliases: ['l'],
    description: 'Fait quitter le bot du salon vocal',
    run: async (client, message) => {
      client.distube.voices.leave(message)
    }
  }