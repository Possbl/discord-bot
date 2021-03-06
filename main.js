const Discord = require('discord.js')

const client = new Discord.Client();

require('dotenv').config();

const fs = require('fs')

const prefix = process.env.Prefix

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log('GITBOT ON')
    client.user.setActivity("Killing bad guys!")
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (command === 'status') {
        client.commands.get('status').execute(message, args, Discord);
    } else if (command == 'kick') {
        client.commands.get('kick').execute(message, args, Discord);
    } else if (command == 'ban') {
        client.commands.get('ban').execute(message, args, Discord);
    } else if (command == 'nuke') {
        client.commands.get('nuke').execute(message, args, Discord);
    } else if (command == 'help') {
        client.commands.get('help').execute(client, message, args, Discord);
    } else if (command == 'play') {
        client.commands.get('play').execute(message, args, command, client, Discord);
    } else if (command == 'stop') {
        client.commands.get('play').execute(message, args, command, client, Discord);
    } else if (command == 'fake') {
        client.commands.get('fakeprofile').execute(message, args, Discord);
    } else if (command == 'skip') {
        client.commands.get('play').execute(message, args, command, client, Discord);
    } else if (command == 'loop') {
        client.commands.get('play').execute(message, args, command, client, Discord);
    } else if (command == 'san') {
        client.commands.get('sanatize').execute(message, args, client);
    } 
})

client.login(process.env.CLIENT_TOKEN);