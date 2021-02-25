const pretty = require('pretty-ms');
module.exports = {
  name: 'premium',
  description: 'add server to black list by id',
  aliases: ['pre'],
  execute(message, args, embed, deleteMessage, serverID, db, client, devs) {

    if (!devs.includes(message.author.id)) return;
    if (db.get(`${serverID}.serverPlan`) == 'Free') return embed.setDescription(`**ان سيرفر \`${db.get(`${serverID}.serverName`)}\`  ليس مشترك في الـ \`Premium\` ⚠️**`), message.channel.send(embed).then(deleteMessage);
    const cooldown = 2.4192e9;
    const preTime = db.get(`${serverID}.serverPlanTime`); // الوقت بتاع المستخدم فيه كام ثانية
    const preNow = cooldown - (Date.now() - preTime);
    if (preTime !== null && preNow > 0) {
      embed.setDescription(`**الوقت المتبقي علي إنتهاء الاشتراك \`${pretty(preNow, { verbose: true })}\`**`), message.channel.send(embed);
    } else {
      db.set(`${serverID}.serverLanguage`, 'arabic')
      db.set(`${serverID}.serverPrefix`, '-')
      db.set(`${serverID}.serverPlan`, 'Free')
      db.set(`${serverID}.serverPlanTime`, null)
      embed.setDescription(`**انتهي اشتراك البرايم في هذا السيرفر ⚠️**`), message.channel.send(embed).then(deleteMessage);
    };

    
  },
};