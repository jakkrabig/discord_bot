const { blame } = require('./../constants.json');
module.exports = {
    name: 'blame',
    description: 'blame',
    execute(message, args) {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            if (message.author.username.toLowerCase() === message.mentions.users.first().username.toLowerCase()) {
                message.channel.send(`Don't blame yourself.`);
                return;
            }

            message.channel.send(`${taggedUser.username} ${blame[Math.floor(Math.random() * blame.length)]}`);
        } else {
            message.reply('Please tag a valid user!');
        }
    },
};