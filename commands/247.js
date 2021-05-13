const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "24/7",
    aliases: ["j", "join"],
    description: "Join your VC for 27/7",
    async execute(message, args) {
        const { channel } = message.member.voice;

        const novc = new MessageEmbed()
        .setDescription(`<a:astroz_error:839478585642713138> You need to join a voice channel first!`)
        .setColor("#FF0000");

        const joinn = new MessageEmbed()
        .setDescription("<a:astroz_success:839478588192718898> 24/7 mode is now **Enabled** in this server.")
        .setColor("#FF0000");

        const serverQueue = message.client.queue.get(message.guild.id);
        const nosamechannel = new MessageEmbed()
        .setDescription(`<a:astroz_error:839478585642713138> You must be in the same channel as ${message.client.user}`)
        .setColor("FF0000");
        message.channel.send(joinn)
        

        if (serverQueue && channel !== message.guild.me.voice.channel)
          return message.channel.send(nosamechannel).catch(console.error);          

            await message.member.voice.channel.join()
  
        }
    }
