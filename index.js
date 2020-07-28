
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.login(TOKEN);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'swear') {
        client.commands.get('swear').execute(message, args);
    } else if (command === 'blame') {
        if (message.mentions.users.first().username.toLowerCase() === client.user.username.toLowerCase()) {
            message.channel.send(`Don't blame me.`);
            return;
        }

        client.commands.get('swear').execute(message, args);
    } else if (command === 'kick') {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`Do you want to kick ${taggedUser.username}?`);
        } else {
            message.reply('Please tag a valid user!');
        }
    }
});