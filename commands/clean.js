module.exports = {
    name: 'clean',
    description: "clean messages!",
    async execute(message, args) {
        if (!args[0]) return message.reply("กรอกจำนวนข้อความที่ต้องการลบ");
        if (isNaN(args[0])) return message.reply("กรอกเป็นจำนวนเต็ม!");

        if (args[0] > 100) return message.reply("ไม่สามารถลบข้อความเกิน 100 ข้อความได้");
        if (args[0] < 1) return message.reply("อย่างน้อยต้องลบ 1 ข้อความนะ");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}