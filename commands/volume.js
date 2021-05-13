const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "To change the server song queue volume",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("<a:astroz_error:839478585642713138> I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("<a:astroz_error:839478585642713138> There is nothing playing in this server.", message.channel);
    if (!serverQueue.connection) return sendError("There is nothing playing in this server.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('<a:astroz_error:839478585642713138> You can\'t set the volume more than 150. or lower than 0',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`I set the volume to: **${args[0]/1}/100**`)
    .setAuthor("Server Volume Manager", "https://images-ext-1.discordapp.net/external/k3fef3p4I2XTIUN4tykUa_4XKHc_WHrG5-1uiKbJR98/https/cdn.discordapp.com/avatars/822294569223454740/06d90b47826d04bc369fef70fd8b515a.webp")
    .setColor("#ff0000")
    return message.channel.send(xd);
  },
};
