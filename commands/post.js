const pretty = require("pretty-ms");
module.exports = {
  name: 'post',
  description: 'post your server',
  execute(message, args, embed, deleteMessage, serverID, db, client) {
    // الرومات الي هيتنشر فيها  
    if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return embed.setColor('#FF0202').setDescription(`**برجاء عدم العبث في صلاحيات البوت لكي تتجنب حظر السيرفر! | ⚠️**`), message.channel.send(embed);

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return embed.setColor('#FF0202').setDescription(`**لا تمتلك صلاحية \`ADMINISTRATOR\` | 🤔**`), message.channel.send(embed).then(deleteMessage);

    const postChannel = db.has(`${serverID}.serverPostChannel`); // الوقت بتاع نشر السيرفر فيه كام ثانية

    if (!postChannel) return embed.setColor('#FF0202').setDescription(`**برجاء قم بعمل روم خاصة للنشر! | ⚠️**`), message.channel.send(embed);

    if (!db.has(`${message.guild.id}.serverDescription`)) return embed.setColor('#FF0202').setDescription(`**برجاء قم بإضافة وصف للسيرفر قبل النشر عن طريق كتابة \`${db.get(`${message.guild.id}.serverPrefix`)}sd\` | ⚠️**`), message.channel.send(embed).then(deleteMessage);

    const cooldown = 8.64e7; // اليوم بالثانية

    const filter = client.channels.cache.get(db.get(`${serverID}.serverPostChannel`));
    const postTime = db.get(`${serverID}.serverPostTime`);


    if (postChannel && !filter) return db.delete(`${serverID}.serverPostChannel`), embed.setDescription(`**إذا قمت بحذف الروم مرة اخري سوف يتم حظر السيرفر! | ⚠️**`).setColor("#FF0202"), message.channel.send(embed);

    if (db.has(`${serverID}.serverPostTime`) && postTime !== null && cooldown - (Date.now() - postTime) > 0) {
      const postServerTime = cooldown - (Date.now() - postTime); // حساب الثواني المتبقية
      embed.setDescription(`**:stopwatch: | ${message.author.username}, الوقت المتبقي لإعادة نشر السيرفر\n\`${pretty(postServerTime, { verbose: true })}.\`**`);
      message.channel.send(embed);
      return;
    } else {
      db.set(`${serverID}.serverPostTime`, Date.now()); // كول داون نشر السيرفر

      const emoji = [];
      message.guild.emojis.cache.some(emo => {
        if (emoji.length < 6) {
          emoji.push(emo);
        };
      });

      db.fetchAll().forEach(res => {
        const channelsPost = client.channels.cache.find(ch => ch.id == db.get(`${res.ID}.serverPostChannel`));
        if (channelsPost) {
          const chann = client.channels.cache.find(ch => ch.id == db.get(`${message.guild.id}.serverPostChannel`));
          chann.createInvite({
            temporary: true,
            max_uses: 0,
            max_age: 0
          }).then(invite => {

            const messagePosts = {
              description: `:crown: __**Owner:**__ ${message.guild.owner ? message.guild.owner.user.tag : message.guild.author.tag}\n:earth_africa: __**Region:**__ ${message.guild.region}\n:timer: __**Created:**__ ${message.guild.createdAt.toLocaleString()}\n\n${db.get(`${message.guild.id}.serverDescription`) ? db.get(`${message.guild.id}.serverDescription`) : ''}\n\n:link: **Server Invite**\n**[Join Now](${db.get(`${message.guild.id}.serverInvite`) || invite.url})**\n:busts_in_silhouette: **Members** \`${message.guild.memberCount}\`\n**Humans:** \`${(message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size)}\` | **Bots:** \`${message.guild.members.cache.filter(m => m.user.bot).size}\`\n:grinning: **Emotes** \`${message.guild.emojis.cache.size}\`\n${emoji.join(' ')}`,
              color: 'RANDOM',
              author: {
                name: message.guild.name,
                icon_url: message.guild.iconURL(),
              },
              footer: {
                text: "Posted by " + message.author.username,
                icon_url: message.author.avatarURL(),
              },
              image: {
                url: db.get(`${message.guild.id}.serverBanner`),
              },
              thumbnail: {
                url: message.guild.iconURL({ dynamic: true }),
              },
              timestamp: new Date(),
            };

            if (channelsPost && messagePosts) {
              hook(messagePosts, channelsPost, client);
            };
          }).catch(err => console.log(err));
        } else {
          console.log(`Not found channel in server ${db.get(`${res.ID}.serverName`)}`);
        };
      });
    };
  },
};

function hook(messagePost, channelsPost, client) {
  try {
    channelsPost.send({ embed: messagePost });
    channelsPost.createOverwrite(channelsPost.guild.id, {
      SEND_MESSAGES: false,
      READ_MESSAGES: true,
      VIEW_CHANNEL: true
    });
  } catch { 
    console.log(`ERR POST IN SERVER ${channelsPost.guild.name} | ID: ${channelsPost.guild.id}`);
   };
};