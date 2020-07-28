const { swear } = require('../constants.json');
module.exports = {
    name: 'swear',
    description: 'swear',
    execute(message, args) {
        message.channel.send(`${swear[Math.floor(Math.random() * swear.length)]}`);
    },
};