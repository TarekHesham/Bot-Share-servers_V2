const Discord = require("discord.js");
module.exports = {
  name: 'botinfo',
  description: 'bot info detials',
  aliases: ['bi'],
  execute(message, args, embed, deleteMessage, serverID, db, client) {
    embed.setAuthor(client.user.username, client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())
      .addField(":crown: Bot",
       [`**Servers**\n\`${client.guilds.cache.size}\`\n**Channels**\n\`${client.channels.cache.size}\`\n**Users**\n\`${client.users.cache.size}\`\n**Language**\n\`Javascript\` `]
       , true)
      .addField(":globe_with_meridians: Server", 
      [`**Ping**\n\`${Date.now() - message.createdTimestamp} ms\`\n**RAM Usage**\n\`${(process.memoryUsage().rss / 1048576).toFixed()} Mb\` `]
      , true);
    message.channel.send(embed);
  },
};