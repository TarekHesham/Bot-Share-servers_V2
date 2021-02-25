module.exports = {
  name: 'black',
  description: 'add server to black list by id',
  execute(message, args, embed, deleteMessage, serverID, db, client, devs) {
    if (!devs.includes(message.author.id)) return;
    const black = args.split(" ").slice(1).join(" ");
    if (db.has(`${black}.serverBlackList`)) return embed.setDescription(`**لقد تم حظر السيرفر بالفعل | ⚠️**`), message.channel.send(embed).then(deleteMessage);
    db.set(`${black}.serverBlackList`, true);
    embed.setDescription(`**لقد تم حظر السيرفر بنجاح | ☑️**`), message.channel.send(embed).then(deleteMessage);
  },
};