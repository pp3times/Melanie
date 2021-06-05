module.exports = {
    name: 'command',
    description: "Embeds!",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('กฎของห้อง')
        .setURL('https://jrm.codingtime.dev')
        .setDescription('เอาไว้อ่านกฎ')
        .addFields(
            {name: 'กฎข้อที่ 1', value: 'Be nice'},
            {name: 'กฎข้อที่ 2', value: 'learning'},
            {name: 'กฎข้อที่ 3', value: 'no memes'}
        )
        .setImage('https://i.imgur.com/W9MGlop.jpeg')
        .setFooter('Make sure you know read rules')
        message.channel.send(newEmbed)
    }

}