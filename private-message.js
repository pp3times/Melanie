module.exports = (client, triggerText, replyText) => {
  // message.channel.type === 'dm' is mean dm only not in server channel
  client.on("message", (message) => {
    if (
      message.channel.type !== "dm" &&
      message.content.toLowerCase() === triggerText.toLowerCase()
    ) {
      message.author.send(replyText);
    }
  });
}