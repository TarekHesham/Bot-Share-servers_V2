module.exports = {
  name: 'setinvite',
  description: 'set link invite to your server',
  aliases: ['si'],
  execute(message, args, embed, deleteMessage, serverID, db) {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return embed.setColor('#FF0202').setDescription(`**لا تمتلك صلاحية \`ADMINISTRATOR\` | 🤔**`), message.channel.send(embed).then(deleteMessage);

    let inv = message.content.split('discord.gg/').slice(1).join(' ');


    if (!inv) return embed.setColor('#FF0202').setDescription(`**برجاء قم بوضع رابط دعوة الي سيرفرك! | ⚠️**`), message.channel.send(embed).then(deleteMessage);

    if (db.has(`${serverID}.serverInvite`) && db.get(`${serverID}.serverInvite`) == inv) {
      embed.setColor('#FF0202').setDescription(`**لقد قمت بالفعل بإضافة تلك الدعوة من قبل! | ❌**`);
      message.channel.send(embed).then(deleteMessage);
      return;
    };

    db.set(`${serverID}.serverInvite`, `https://discord.gg/${inv}`);
    embed.setDescription(`**.لقد تم إضافة رابط الدعوة بنجاح | ☑️**`);
    message.channel.send(embed).then(deleteMessage);

  },
};