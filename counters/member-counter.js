module.exports = async (client) => {
  const guild = client.guilds.cache.get("837717732421271622");
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get("851652472523194398");
    channel.setName(`สมาชิกทั้งหมด : ${memberCount.toLocaleString()}`);
    console.log("Updating Member Count");
  }, 5000);
};
