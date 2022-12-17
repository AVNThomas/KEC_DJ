const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'random',
    aliases: ['r'],
    description: 'Mets la liste de lecture en mode aléatoire',

    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
        queue.shuffle()
        message.channel.send(`La liste de lecture est en mode aléatoire`)
    }
}
