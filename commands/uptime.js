module.exports = {
  name: 'uptime',
  description: 'uptiming bot',
  aliases: ['ut'],
  execute(message, args, embed, deleteMessage, serverID, db, client) {
    let uptime = client.uptime;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;
    while (notCompleted) {
      if (uptime >= 8.64e7) {
        days++;
        uptime -= 8.64e7;
      } else if (uptime >= 3.6e6) {
        hours++;
        uptime -= 3.6e6;
      } else if (uptime >= 60000) {
        minutes++;
        uptime -= 60000;
      } else if (uptime >= 1000) {
        seconds++;
        uptime -= 1000;
      }
      if (uptime < 1000) notCompleted = false;
    }
    embed.setDescription(`**› [${days}] يوم  › [${hours}] ساعة  › [${minutes}] دقيقة › [${seconds}] ثانية**`);
    message.channel.send(embed);
  },
};