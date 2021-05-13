require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client, MessageEmbed } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX,
  SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

client.on("message", async (message) => {
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
            const HELLO_SERVER = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`About ${client.user.username}`)
            .setThumbnail(client.user.avatarURL())
            .setDescription(`My Prefix Here Is: \`${process.env.PREFIX}\`\nMy Devloper: **THE丶JUИGLΣΣ丶SHIVAMᵀˣ** \n \n You can play music by joining a voice channel and typing \`${process.env.PREFIX}play\`. Type \`${process.env.PREFIX}help\` To Get All Commands Help Menu.\n \n [Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support](https://discord.gg/Arqg9kc8r5)`)
            .setTimestamp();
            return message.channel.send(HELLO_SERVER);
        }
})

client.on('guildCreate', guild => {
  guild.members.fetch //guild.ownerID
  
  let embed = new MessageEmbed()
    .setTitle('**JOINED NEW SERVER**')
    .setColor("#ff0000")
    .setDescription("Hey, Developer look I've joined a new server!")
    .addField('**Server Name**', `${guild.name}`)
    .addField('**Server ID**', `${guild.id}`)
    .addField('**Member Count**', `${guild.memberCount}`)
    .addField('**Owner**', `<@${guild.ownerID}>`)
    .setThumbnail(guild.iconURL())
    .setFooter(`Thanks For Choosing Cloudz Music`, client.user.avatarURL())
    .setTimestamp();
  client.channels.cache.get('839478605209010207').send(embed)
});

client.on('guildDelete', guild => {
  guild.members.fetch //guild.ownerID
  
  let embed = new MessageEmbed()
    .setTitle('**LEFT A SERVER**')
    .setColor("#ff0000")
    .setDescription("Hey, Developer look I've been kicked from a server!")
    .addField('**Server Name**', `${guild.name}`)
    .addField('**Server ID**', `${guild.id}`)
    .addField('**Member Count**', `${guild.memberCount}`)
    .addField('**Owner**', `<@${guild.ownerID}>`)
    .setThumbnail(guild.iconURL())
    .setFooter(`Thanks For Choosing Cloudz Music`, client.user.avatarURL())
    .setTimestamp();
  client.channels.cache.get('839478606669283328').send(embed)
});


//Logging in to discord
client.login(process.env.TOKEN)
