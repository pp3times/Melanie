module.exports = {
  name: "reactionrole",
  description: "Sets up a reaction role message!",
  async execute(message, args, Discord, client) {
    const channel = "851630048071254026";
    const redRole = message.guild.roles.cache.find(
      (role) => role.name === "red"
    );
    const blueRole = message.guild.roles.cache.find(
      (role) => role.name === "blue"
    );

    const redEmoji = "👀";
    const blueEmoji = "💯";

    let embed = new Discord.MessageEmbed()
      .setColor("#e42643")
      .setTitle("Choose a color!")
      .setDescription(
        "Choosing a role what you want\n\n" +
          `${redEmoji} for red role\n` +
          `${blueEmoji} for blue role`
      );

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(redEmoji);
    messageEmbed.react(blueEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === redEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(redRole);
        }
        if (reaction.emoji.name === blueEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(blueRole);
        } else {
            return;
        }
      }
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === redEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(redRole);
        }
        if (reaction.emoji.name === blueEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(blueRole);
        } else {
          return;
        }
      }
    });

  },
};
