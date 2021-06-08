// https://www.color-hex.com/
// https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=kickable
// https://discordjs.guide/popular-topics/permissions.html#converting-permission-numbers
// https://discord.com/developers/applications/850323858161795082/bot
// https://discordapi.com/permissions.html#8589934591
// https://imgur.com/gallery/rgwIoJ4
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const prefix = '=';

const fs = require('fs');

const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Melanie is online!');
    memberCounter(client);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Server Member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get("573383931525595146").send(`ยินดีต้อนรับไอเวร <@${guildMember.user.id}> เข้าสู่เซิร์ฟเวอร์อันสดใจของเรา`);
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
      client.commands.get("ping").execute(message, args);
    } else if (command === "github") {
      client.commands.get("github").execute(message, args);
    } else if (command === "command") {
      client.commands.get("command").execute(message, args, Discord);
    } else if (command === "clean") {
      client.commands.get("clean").execute(message, args);
    } else if (command === "kick") {
      client.commands.get("kick").execute(message, args);
    } else if (command === "ban") {
      client.commands.get("ban").execute(message, args);
    } else if (command === "mute") {
      client.commands.get("mute").execute(message, args);
    } else if (command === "unmute") {
      client.commands.get("unmute").execute(message, args);
    } else if (command === "reactionrole") {
      client.commands
        .get("reactionrole")
        .execute(message, args, Discord, client);
    } else if (command === "clear") {
      client.commands.get("clear").execute(message, args);
    } else if (command === "play") {
      client.commands.get("play").execute(message, args);
    } else if (command === "leave") {
      client.commands.get("leave").execute(message, args);
    }
});

client.login("ODUwMzIzODU4MTYxNzk1MDgy.YLoDzg.oPaxA-FuftjtAaqBJLrP6D4sDDI");


