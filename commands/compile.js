const axios = require('axios');
module.exports = {
    name: 'compile',
    description: 'compile',
    execute(message, args) {
        // message.channel.send(``);
        // message.reply(``);

        let reqBody = {
            script: args,
            clientId: process.env.COMPILER_CLIENT_ID,
            clientSecret: process.env.COMPILER_CLIENT_SECRET,
            language: process.env.COMPILER_LANGUAGE,
            versionIndex: process.env.COMPILER_LANGUAGE_VERSION
        }
        axios.post('https://api.jdoodle.com/v1/execute', reqBody)
            .then(function (response) {
                // handle success
                console.log(response.data);
                message.channel.send("```"+response.data.output+"```");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
};