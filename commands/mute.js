const ms = require("ms");
module.exports = {
  name: "mute",
  description: "This command mutes a member",
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

      if (!args[1]) {
        memberTarget.roles.remove(mainRole.id);
        memberTarget.roles.add(muteRole.id);
        message.channel.send(`<@${memberTarget.user.id}> หุบปากบ้างสักหน่อยนะ`);
        return
      }
      memberTarget.roles.remove(mainRole.id);
      memberTarget.roles.add(muteRole.id);
      message.channel.send(
        `<@${memberTarget.user.id}> หุบปากไปสัก ${ms(ms(args[1]))}`
      );

      setTimeout(function () {
        memberTarget.roles.remove(muteRole.id);
        memberTarget.roles.add(mainRole.id);
        message.channel.send(`<@${memberTarget.user.id}> อ่ะๆพูดต่อได้ละ`);
        
      }, ms(args[1]));
    } else {
      message.channel.send("มึงจะเบ้าใครหละไอสัส");
    }
  },
};
