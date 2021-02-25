module.exports = {
  name: 'addpremium',
  description: 'add server to premium list by id',
  aliases: ['addpre'],
  execute(message, args, embed, deleteMessage, serverID, db, client, devs) {
    return;
/*
    if (!devs.includes(message.author.id)) return;
    const args = serverMessage.split(" ").slice(1).join(" ");
    if (!args) return embed.setDescription(`**برجاء ادخال ايدي السيرفر**`), message.channel.send(embed).then(deleteMessage);
    if (db.get(`${args}.serverPlan`) == 'Premium') return embed.setDescription(`**ان سيرفر \`${db.get(`${args}.serverName`)}\` \`Premium\` بالفعل ⚠️**`), message.channel.send(embed).then(deleteMessage);
    db.set(`${args}.serverPlan`, 'Premium');
    db.set(`${args}.serverPlanTime`, Date.now());
    embed.setDescription(`**تم إضافة سيرفر \`${db.get(`${args}.serverName`)}\` إلي الـ \`Premium\` بنجاح ${emojiSeed}**`), message.channel.send(embed).then(deleteMessage);
*/
  },
};