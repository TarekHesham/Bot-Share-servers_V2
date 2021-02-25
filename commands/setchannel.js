module.exports = {
  name: 'setchannel',
  description: 'set your channel by menthion',
  aliases: ['sc'],
  execute(message, args, embed, deleteMessage, serverID, db) {
    // رومات النشر
    
    /*
        let botsIN = message.guild.members.cache.filter(m => m.user.bot).size;
        let filter = message.guild.members.cache.filter(m => m.presence.status == "online").size;
        console.log(botsIN);
    
        let memberOn = filter - botsIN;
        if (memberOn < 10) return embed.setDescription(`**يجب ان يكون هناك \`10\` اشخاص اون لاين علي الاقل لبدء استخدام البوت لديك الان \`${memberOn}\` اون لاين ⚠️**`), message.channel.send(embed).then(deleteMessage);
    */

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return embed.setColor('#FF0202').setDescription(`**لا تمتلك صلاحية \`ADMINISTRATOR\` | 🤔**`), message.channel.send(embed).then(deleteMessage);

    let messageSetting = message.mentions.channels.first();
    let ch = message.guild.channels.cache.find(c => c.id == messageSetting.id);

    if (!messageSetting || !ch) return embed.setColor('#FF0202').setDescription(`**برجاء قم بعمل منشن للروم/التشانل الخاصة للنشر! | ⚠️**`), message.channel.send(embed).then(deleteMessage);

    if (db.has(`${serverID}.serverPostChannel`) && db.get(`${serverID}.serverPostChannel`) == ch.id) {
      embed.setColor('#FF0202').setDescription(`**لقد قمت بالفعل بإضافة تلك التشانل من قبل! | ❌**`);
      message.channel.send(embed).then(deleteMessage);
      return;
    };

    db.set(`${serverID}.serverPostChannel`, ch.id);
    embed.setDescription(`**.لقد تم التثبيت بنجاح | ☑️**`), message.channel.send(embed).then(deleteMessage);

  },
};