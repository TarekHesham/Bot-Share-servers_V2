module.exports = {
  name: 'unblack',
  description: 'add server to black list by id',
  execute(message, args, embed, deleteMessage, serverID, db, devs) {
    if (!devs.includes(message.author.id)) return;

    var black = serverMessage.split(" ").slice(1).join(" ");

    if (db.has(`${black}.serverBlackList`)) return embed.setDescription(`**ان السيرفر ليس في قائمة الحظر | ⚠️**`), message.channel.send(embed).then(deleteMessage);

    db.delete(`${black}.serverBlackList`);

    embed.setDescription(`**لقد تم إزالة الحظر من السيرفر بنجاح | ☑️**`), message.channel.send(embed).then(deleteMessage);
  },
};