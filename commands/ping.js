module.exports = {
  name: 'ping',
  description: 'ping bot',
  execute(message, args, embed, deleteMessage, serverID, db, client) {
    let start = Date.now();
    message.channel.send(embed).then(message => {
      embed
      .setDescription(`Time taken: ${Date.now() - start} ms\nDiscord API: ${client.ws.ping.toFixed(0)} ms`);
      message.edit(embed);
    });
  },
};