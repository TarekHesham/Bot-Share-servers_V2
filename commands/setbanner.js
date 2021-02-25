module.exports = {
  name: 'setbanner',
  description: 'set your banner by url',
  aliases: ['sb'],
  execute(message, args, embed, deleteMessage, serverID, db) {
    
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return embed.setDescription(`**لا تمتلك صلاحية \`ADMINISTRATOR\` | 🤔**`), message.channel.send(embed).then(deleteMessage);

    let banner = args.split(' ').slice(1).join(' ');

    if (!banner) return embed.setColor('#FF0202').setDescription(`**برجاء قم بوضع رابط صورة البانر! | ⚠️**`), message.channel.send(embed).then(deleteMessage);

    if (db.has(`${serverID}.serverBanner`) && db.get(`${serverID}.serverBanner`) == banner) {
      embed.setColor('#FF0202').setDescription(`**لقد قمت بالفعل بإضافة تلك الصورة من قبل! | ❌**`);
      message.channel.send(embed).then(deleteMessage);
      return;
    };

    db.set(`${serverID}.serverBanner`, banner);
    embed.setDescription(`**.لقد تم إضافة صورة بانر بنجاح | ☑️**`), message.channel.send(embed).then(deleteMessage);

  },
};