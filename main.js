// https://www.color-hex.com/
// https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=kickable
// https://discordjs.guide/popular-topics/permissions.html#converting-permission-numbers
// https://discord.com/developers/applications/850323858161795082/bot
// https://discordapi.com/permissions.html#8589934591
// https://imgur.com/gallery/rgwIoJ4
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '=';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Melanie is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command === 'github'){
        client.commands.get('github').execute(message, args);
    } else if (command === 'command'){
        client.commands.get('command').execute(message, args, Discord);
    } else if (command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
});

client.login('');


