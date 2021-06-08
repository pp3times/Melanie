module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("ต้องอยู่ในห้องพูดคุยถึงจะหยุดเพลงได้นะ");
        await voiceChannel.leave();
        await message.channel.send('ออกจากแชนแนล :smiling_face_with_tear:');
    }
}