
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

    let argString = message.content.slice(prefix.length);
    let args = argString.trim().replace(/\n/g, " ").split(" ")

    const command = args[0];

    argString = argString.slice(prefix.length + command.length);

    if (command === 'ping') {
        client.commands.get('ping').execute(message, argString);
    } else if (command === 'swear') {
        client.commands.get('swear').execute(message, argString);
    } else if (command === 'blame') {
        if (message.mentions.users.first().username.toLowerCase() === client.user.username.toLowerCase()) {
            message.channel.send(`Don't blame me.`);
            return;
        }

        client.commands.get('blame').execute(message, argString);
    } else if (command === 'kick') {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`Do you want to kick ${taggedUser.username}?`);
        } else {
            message.reply('Please tag a valid user!');
        }
    } else if (command === "compile") {
        let codeIndex = argString.indexOf("`");
        let codeLastIndex = argString.lastIndexOf("`");
        let code = argString.slice(codeIndex + 3, codeLastIndex - 3)
        let lang = code.trim().replace(/\n/g, " ").split(" ")[0];
        code = code.slice(lang.length);

        if (argString.trim() === "" || code.length == 0) {
            message.reply('Please insert code in code block.');
            return;
        }

        
        message.reply(`${lang}`);
        client.commands.get('compile').execute(message, code);
    }
});