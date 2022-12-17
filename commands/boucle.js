module.exports = {
    name: 'boucle',
    aliases: ['loop'],
    description: 'Mets la liste de lecture en boucle',

    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`Il n'y a pas de musique en cours de lecture`)
        if (!args[0]) {
            return message.channel.send(`Veuillez entrer un mode de boucle: \`off\`, \`musique\`, \`liste\``)
        }
        let mode = null
        switch (args[0]) {
            case 'off':
                mode = 0
                break
            case 'musique':
                mode = 1
                break
            case 'liste':
                mode = 2
                break
        }
        if (mode === null) return message.channel.send(`Veuillez entrer un mode de boucle: \`off\`, \`musique\`, \`liste\``)
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode == 2 ? 'répete la liste de lecture' : 'répete la musique' : 'pas de répétition'
        message.channel.send(`Mode de boucle: \`${mode}\``)
    }
}