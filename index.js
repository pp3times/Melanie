const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
// const firstMessage = require("./first-message");
const command = require("./command");
const privateMessage = require("./private-message");
const roleClaim = require("./role-claim")

client.on("ready", () => {
  console.log("Melanie is ready!");
  roleClaim(client)
  // firstMessage(client, "851993077354332260", "hello world!!", ["👣", "🧠"]);

  //   privateMessage(client, "ping", "pong!");

  // Set dm message to USER ID
  //   client.users.fetch("239965473486274560").then((user) => {
  //     user.send("Hello world!");
  //   });

  command(client, ["ping", "test"], (message) => {
    message.channel.send("Pong!");
  });

  command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      // console.log(guild)
      message.channel.send(
        `${guild.name} มีจำนวนสมาชิกทั้งหมด ${guild.memberCount} คนค่ะ`
      );
    });
  });

  command(client, ["cc", "clearchannel"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        // console.log(results)
        message.channel.bulkDelete(results);
      });
    }
  });

  command(client, "status", (message) => {
    const content = message.content.replace("/status ", "");
    // "!status hello world" > "Hello world"

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    });
  });

  command(client, "createtextchannel", (message) => {
    const name = message.content.replace("/createtextchannel ", "");

    message.guild.channels
      .create(name, {
        type: "text",
      })
      .then((channel) => {
        // console.log(channel);
        // Set category of channel
        const categoryId = "804373834978426911";
        channel.setParent(categoryId);
      });
  });
  command(client, "createvoicechannel", (message) => {
    const name = message.content.replace("/createvoicechannel ", "");
    message.guild.channels
      .create(name, {
        type: "voice",
      })
      .then((channel) => {
        // Set user limit and category of channel
        channel.setUserLimit(10);
        const categoryId = "804373834978426911";
        channel.setParent(categoryId);
      });
  });
  command(client, "embed", (message) => {
    // console.log(message.author)
    const logoLong =
      "https://media.discordapp.net/attachments/837717732421271627/852264257756201000/Untitled-2.png";
    const logoShort =
      "https://media.discordapp.net/attachments/804374108946300968/852280504899600394/2.png";

    const embed = new Discord.MessageEmbed()
      .setTitle("Test")
      .setURL("https://www.youtube.com/")
      .setAuthor(message.author.username)
      .setImage(logoLong)
      .setThumbnail(logoShort)
      .setFooter("This is a footer", logoShort)
      .setColor("#00AAFF")
      .addFields(
        {
          name: "Field 1",
          value: "Hello World",
          inline: true,
        },
        {
          name: "Field 2",
          value: "Hello World",
          inline: true,
        },
        {
          name: "Field 3",
          value: "Hello World",
          inline: true,
        },
        {
          name: "Field 4",
          value: "Hello World",
          // inline: true,
        }
      );

    message.channel.send(embed);
  });

  command(client, "serverinfo", (message) => {
    // message.channel.send('Coming soon')
    const { guild } = message;
    // console.log(guild)

    const { name, region, memberCount, owner, afkTimeout } = guild;
    const icon = guild.iconURL();

    // console.log(name, region, memberCount, icon, afkTimeout)
    // console.log(owner.user.tag)

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .addFields(
        {
          name: "Region",
          value: region,
        },
        {
          name: "Members",
          value: memberCount,
        },
        {
          name: "Owner",
          value: owner.user.tag,
        },
        {
          name: "AFK Timeout",
          value: afkTimeout / 60,
        }
      );

    message.channel.send(embed);
  });

  command(client, "helps", (message) => {
    message.channel.send(`These are my supported commands: 
    
    **/help** - Displays the help menu
    **/add <num1> <num2>** - Adds two numbers
    **/sub <num1> <num2>** - Subtracts two numbers
    `);
  });

  const { prefix } = config;
  // console.log('PREFIX:', prefix)

  client.user.setPresence({
    activity: {
      name: `Use "${prefix} help"`,
    },
  });
});

client.login(config.token);
