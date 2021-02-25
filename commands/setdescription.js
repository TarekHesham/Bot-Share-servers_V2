module.exports = {
  name: 'setdescription',
  description: 'set description to your server',
  aliases: ['sd'],
  execute(message, args, embed, deleteMessage, serverID, db) {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return embed.setColor('#FF0202').setDescription(`**لا تمتلك صلاحية \`ADMINISTRATOR\` | 🤔**`), message.channel.send(embed).then(deleteMessage);

    let description = message.content.split(' ').slice(1).join(' ');

    if (!description) return embed.setColor('#FF0202').setDescription(`**برجاء قم بكتابة وصف للسيرفر الخاص بك ! | ⚠️**`), message.channel.send(embed).then(deleteMessage);

    if (db.has(`${serverID}.serverDescription`) && db.get(`${serverID}.serverDescription`) == description) {
      embed.setColor('#FF0202').setDescription(`**لقد قمت بالفعل بإضافة ذلك الوصف من قبل ! | ❌**`);
      message.channel.send(embed).then(deleteMessage);
      return;
    };
    let des = description.includes('@')?description.replace(/@/gi, '-'):description;
    db.set(`${serverID}.serverDescription`, des);


    embed.setDescription(`**.لقد تم إضافة وصف السيرفر بنجاح | ☑️**`), message.channel.send(embed).then(deleteMessage);

  },
};