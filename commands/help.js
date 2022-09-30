const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['h', 'cmd', 'command'],
  description: 'Affiche la liste des commandes',
  run: async (client, message) => {
    let embeds = new EmbedBuilder()
    embeds.setTitle('Liste des commandes')
    embeds.setColor('BLURPLE')
    embeds.setDescription('Voici la liste des commandes disponibles')
    client.commands.forEach((command) => {
      embeds.addFields({
        name: '.' + command.name, value: command.description + '\nalias: ' + command.aliases, inline: true
      })
    })
    message.channel.send({embeds: [embeds]})
    }
}