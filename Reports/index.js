const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online.`);
  bot.user.setGame("on Warzone");
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}report`){

    //~report @vinixs [reason]

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Error: Couldn't find user.");
    let reason = args.join(" ").slice(22);
    let bicon = bot.user.displayAvatarURL;

    let reportEmbed = new Discord.RichEmbed()
    .setColor("#c42b4f")
    .setTitle("Warzone Reports", rUser)
    .setThumbnail(bicon)
    .addField("A report was filed for by", message.author)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Error: Please do this in the #reports channel.");



      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);

    return;
  }

});


bot.login(botconfig.token);
