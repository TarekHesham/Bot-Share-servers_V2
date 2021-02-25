module.exports = {
  name: 'help',
  description: 'help command menu',
  execute(message, args, embed, deleteMessage, serverID, db, client) {
    const serverPrefix = db.get(`${serverID}.serverPrefix`); // برفكس السيرفر
    embed.setAuthor('قائمة المساعدة | 👨‍💻')
      .setThumbnail(client.user.avatarURL())
      .addFields(
        { name: 'اوامر الاعدادات :gear:', value: `\`${serverPrefix}setChannel\` | \`${serverPrefix}setDescription\` | \`${serverPrefix}setBanner\` \n \`${serverPrefix}setInvite\` | \`${serverPrefix}setPrefix\` | \`${serverPrefix}Post\`\n**اختصارات :** [\`${serverPrefix}sc\` | \`${serverPrefix}sd\` | \`${serverPrefix}sb\` | \`${serverPrefix}si\` | \`${serverPrefix}sp\`]`, inline: false },
        { name: 'الاوامر العامة :camping:', value: `\`${serverPrefix}ping\` | \`${serverPrefix}help\` | \`${serverPrefix}botinfo & bi\` | \`${serverPrefix}uptime\``, inline: false },
        { name: 'روابط :link:', value: '[دعم فني](https://discord.gg/AUNtvrMyr6) | [دعوة البوت](https://bit.ly/3rNPA7N)', inline: false },
      );
    message.channel.send(embed);
  },
};