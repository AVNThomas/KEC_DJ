/*
//  Dev by Thomas Dehennault
//  A simple discord musique bot
*/

const discord = require('discord.js');
require ('dotenv').config();
const client = new discord.Client({
    intets: [
        "Guilds",
        "Guild Messages",
        "MessageContent",
    ]
});

client.on('ready', () => {
    console.log('Bot is ready');
});

client.login(process.env.TOKEN);