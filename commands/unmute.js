module.exports = {
  name: "unmute",
  description: "This command unmutes a member",
  execute(message, args) {
    const target = message.mentions.users.first();
    if (target) {
      let mainRole = message.guild.roles.cache.find(
        (role) => role.name === "mod"
      );
      let muteRole = message.guild.roles.cache.find(
        (role) => role.name === "mute"
      );

      let memberTarget = message.guild.members.cache.get(target.id);

      memberTarget.roles.remove(muteRole.id);
      memberTarget.roles.add(mainRole.id);
      message.channel.send(`<@${memberTarget.user.id}> พูดต่อได้แล้วจ้า`);
    } else {
      message.channel.send("เปิดปากให้ใครไม่รู้จัก");
    }
  },
};
