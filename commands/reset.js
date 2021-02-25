module.exports = {
  name: 'reset',
  description: 'reset server data',
  execute(message, args, embed, deleteMessage, serverID, db, client, devs) {
    if (!devs.includes(message.author.id)) return;

    const resetID = args.split(" ").slice(1).join(" ");

    if (!resetID) return embed.setDescription(`**برجاء ادخال ايدي السيرفر**`), message.channel.send(embed).then(deleteMessage);

    let server = client.guilds.cache.get(resetID);

    if (!server) return embed.setDescription(`**لم اتمكن من إجاد هذا السيرفر**`), message.channel.send(embed).then(deleteMessage);

    if (server) embed.setDescription(`**...جاري إعادة تعيين بيانات سيرفر \`${db.get(`${resetID}.serverName`)}\`**`), message.channel.send(embed).then(deleteMessage);
    db.delete(server.id);
    setTimeout(() => {
      db.set(server.id, {
        "serverName": server.name,
        "serverPrefix": 'p!'
      });
      embed.setDescription(`**تم إعادة تعيين بيانات سيرفر \`${db.get(`${resetID}.serverName`)}\` بنجاح | ☑️**`), message.channel.send(embed).then(deleteMessage);
    }, 3000);
  },
};