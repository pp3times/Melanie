module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    execute(message, args) {
        const member = message.mentions.users.first();
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send("เตะแม่งออกละสัส")
        } else {
            message.channel.send('มึงจะเตะใครหละไอสัส');
        }
    }
}