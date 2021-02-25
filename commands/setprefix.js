module.exports = {
  name: 'setprefix',
  description: 'set custom prefix to your server',
  aliases: ['sp'],
  execute(message, args, embed, deleteMessage, serverID, db) {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return embed.setDescription(`**لا تمتلك صلاحية \`ADMINISTRATOR\` | :no_mouth:**`), message.channel.send(embed).then(deleteMessage);

    let prefix = args.split(' ').slice(1).join(' ');

    if (!prefix) return embed.setDescription(`**برجاء ادخال البرفكس الجديد بعد الامر | ⚠️**`), message.channel.send(embed).then(deleteMessage);

    if (db.has(`${serverID}.serverPrefix`) && db.get(`${serverID}.serverPrefix`) == prefix) {
      embed.setDescription(`**هذا هوا البرفكس الخاص بالسيرفر بالفعل.! | ⚠️**`);
      message.channel.send(embed).then(deleteMessage);
      return;
    };

    db.set(`${serverID}.serverPrefix`, prefix);

    embed.setDescription(`**تم تغيير البرفكس الخاص بالسيرفر بنجاح | ☑️**\n**\`${db.get(`${serverID}.serverPrefix`)}\` البرفكس الجديد هوا**`);
    message.channel.send(embed).then(deleteMessage);

  },
};