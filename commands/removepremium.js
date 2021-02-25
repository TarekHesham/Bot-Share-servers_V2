module.exports = {
  name: 'removepremium',
  description: 'remove server from premium list by id',
  aliases: ['repre','removepre'],
  execute(message, args, embed, deleteMessage, serverID, db, client, devs) {

    if (!devs.includes(message.author.id)) return;

    let premium = args.split(" ").slice(1).join(" ");

    if (!db.has(`${premium}.serverPlan`)) return embed.setDescription(`**ان سيرفر \`${db.get(`${premium}.serverName`)}\` \`Free\` بالفعل ⚠️**`), message.channel.send(embed).then(deleteMessage);

    db.delete(`${premium}.serverPlan`, 'premium');
    db.delete(`${premium}.serverPlanTime`, null);

    embed.setDescription(`**تم إزالة سيرفر \`${db.get(`${premium}.serverName`)}\` من الـ \`Premium\` بنجاح ☑️**`), message.channel.send(embed).then(deleteMessage);
  },
};