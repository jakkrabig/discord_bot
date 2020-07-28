# discord_bot

>Sample discord bot

## Installation

- Clone repo

```shell
$ git clone https://github.com/jakkrabig/discord_bot.git
```


- Change directory

```shell
$ cd discord_bot
```

- Install dependencies

```shell
$ npm install
```

- Create file `.env` and declare variable

```
// Discord
TOKEN=YOUR_BOT_TOKEN
PREFIX=YOUR_COMMAND_PREFIX

// Jdoodle online compiler
COMPILER_CLIENT_ID=YOUR_CLIENT_ID
COMPILER_CLIENT_SECRET=YOUR_CLIENT_SECRET
COMPILER_LANGUAGE=LANGUAGE_CODE
COMPILER_LANGUAGE_VERSION=LANGUAGE_VERSION_INDEX
```

- Bot log in
```shell
$ node index.js
```

## Usage

### Compile a code in chat room

>now only support `golang`

- Try input chat message by code block 

<img src="https://i.imgur.com/BCsQfon.png" title="Sample code in chat" alt="Sample code in chat">
