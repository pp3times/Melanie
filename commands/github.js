module.exports = {
    name: 'github',
    description: "sends the github link!",
    execute(message, args) {

        // if (message.member.roles.cache.has('793282142951964703')) {
        //     message.channel.send('https://github.com/pp3times/RFTENDANCE');

        let role = message.guild.roles.cache.find(r => r.name === "mod");
        // ========== [ Check by permission ] ==========
        // if (message.member.permissions.has("KICK_MEMBERS")){
        //     message.channel.send("You have the permission to kick members");
        // }


        // ========== [ Check by role ] ==========
        if (message.member.roles.cache.some(r => r.name === "mod")) {
            message.channel.send('https://github.com/pp3times/RFTENDANCE');
        } else {
            message.channel.send('เห็นคุณไม่มี role ให้ฉันจัดการให้คุณสิ 📢');
            message.member.roles.add(role).catch(console.error);
        }

    }
}