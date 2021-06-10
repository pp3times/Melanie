const firstMessage = require("./first-Message");

module.exports = (client) => {
  const channelId = "837732344281825340";

  // const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

  const emojis = {
    "☑️": "🚦 IT-Freshy 🚦",
    // "🐶": "Python",
  };

  const reactions = [];

  let emojiText = "น้องๆสามารถกดรับ Role ได้ตรงนี้เลยครับ\n\n";
  for (const key in emojis) {
    // const emoji = getEmoji(key)
    const emoji = key;
    reactions.push(emoji);

    const role = emojis[key];
    // emojiText += `${emoji} = ${role}\n`;
    emojiText += "กดรับ Role แล้วอย่าลืมเปลี่ยนชื่อเป็นชื่อเล่นตัวเองตามด้วยชื่อจริงนะครับ เช่น เอก-ภาณุ"
  }

  firstMessage(client, channelId, emojiText, reactions);

  const handleReaction = (reaction, user, add) => {
    if (user.id === "850323858161795082") {
      return;
    }

    // console.log(reaction)

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;

    const roleName = emojis[emoji];
    if (!roleName) {
      return;
    }

    const role = guild.roles.cache.find((role) => role.name === roleName);
    const member = guild.members.cache.find((member) => member.id === user.id);

    if (add) {
      member.roles.add(role);
    } else {
      member.roles.remove(role);
    }
  };

  client.on("messageReactionAdd", (reaction, user) => {
    // console.log('add')
    if (reaction.message.channel.id === channelId) {
      //   console.log("add");
      //   handleReaction(reaction, user, false);
      if (user.bot) {
        return false;
      }
      for (const emo in emojis) {
        if (reaction.emoji.name === emo) {
          let emojiRole = reaction.message.guild.roles.cache.find(
            (role) => role.name === emojis[emo]
          );
          reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(emojiRole);
        }
      }
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      //   console.log("remove");
      if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, false);
      }
    }
  });
};
