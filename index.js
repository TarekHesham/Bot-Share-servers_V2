const fetch = require('node-fetch');
// منتور لنفسه
setInterval(() => {
  fetch(`http://${process.env.PROJECT_DOMAIN}.repl.co`)
}, 60000);

setInterval(() => {
  fetch('https://tarek-dev.glitch.me/')
}, 60000);

//************************************************ Z C o o L ************************************************************

// الاساس
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.TOKEN);

// باكدجات
const fs = require("fs");
const db = require("quick.db");

// المتحكمين
const devs = ["369810939165409280"];

client.commands = new Discord.Collection();
const folderCommands = fs.readdirSync('./commands/', { encoding: 'utf-8' }).filter(file => file.endsWith('.js'));
for (const file of folderCommands) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

// servers
client.on("message", async message => {
  if (message.channel.type == "dm") return;
  if (!db.has(message.guild.id)) db.set(message.guild.id, {
    "serverName": message.guild.name,
    "serverPrefix": 'p!'
  });
  const [cmd] = message.content.toLowerCase().split(' ');
  const serverID = message.guild ? message.guild.id : 'null';
  const serverPrefix = await db.get(`${serverID}.serverPrefix`); // برفكس السيرفر

  // المتغيرات واختصاراتها
  const args = message.content.toLowerCase(); // كود الرسالة اللي هيكتبها الاولي
  const embed = new Discord.MessageEmbed().setColor('#274e92'); // كود الامبيد
  const deleteMessage = m => m.delete({ timeout: 5000 }); // كول داون مسح الرسالة

  if (db.has(`${serverID}.serverBlackList`)) return embed.setDescription(`**لقد تم حظر السيرفر لمخالفة الشروط والقوانين | ⚠️**`), message.channel.send(embed).then(deleteMessage);
  let test = await message.mentions.users.first();
  if (test && test.id == client.user.id) {
    embed.setDescription(`**:reminder_ribbon: | البرفكس الخاص بهذا السيرفر هو 👇\n\`${serverPrefix}\`**`);
    message.channel.send(embed);
    return;
  };

  if (!cmd.startsWith(serverPrefix) || message.author.bot || message.channel.type == "dm") return;
  client.commands.find(command => {
    try {
      if (command.name == cmd.slice(serverPrefix.length) || command.aliases && command.aliases.includes(cmd.slice(serverPrefix.length))) return command.execute(message, args, embed, deleteMessage, serverID, db, client, devs);
    } catch (err) {
      console.log(err);
    };
  });
});

// لوج البوت لما يشتغل
client.on("ready", async () => {
  console.log("╔[════════════]╗");
  console.log(" System Is Online");
  console.log("╚[════════════]╝");
  const statuss = [
    `Welcome To ${client.user.username}`,
    `Everyone here is a family`,
    `Developer: ❥⟨☆ﾟᵗ.*ᶤ･ᵗ｡ᵒﾟ⟩↝•♪•`,
    `p!help | ${client.user.username}`,
    `Servers: ${client.guilds.cache.size} | Users: ${client.users.cache.size}`
  ];
  setInterval(() => {
    client.user.setActivity(
      statuss[Math.floor(Math.random() * statuss.length)]
      , { type: 'PLAYING' });
  }, 15000);

  setInterval(async () => {
    await db.fetchAll().forEach(async res => {
      let check = await client.guilds.cache.get(res.ID);
      if (!check) db.delete(res.ID);
    });
  }, 60000 * 60);
});

client.on("guildCreate", async guild => {
  if (await !db.has(guild.id)) return await db.set(guild.id, {
    "serverName": guild.name,
    "serverPrefix": 'p!'
  });
});

client.on('guildDelete', async guild => {

  if (await db.has(guild.id) && await db.has(`${guild.id}.serverBlackList`)) {
    await db.delete(guild.id);
    await db.set(`${guild.id}.serverBlackList`, true);
  } else {
    await db.delete(guild.id);
  };

});