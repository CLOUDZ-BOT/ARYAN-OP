const { MessageEmbed } = require('discord.js')


module.exports = {
  info: {
    name: "ping",
    description: "Shows  Latency and API of bot",
    aliases: [" "],
  },

    run: async function (client, message, args) {
			const m = await message.channel.send("Please wait .....")
  
  const embed = new MessageEmbed()
  .setTitle("<a:astorzping:839478615028793376> Pong!")
  .setColor('#FF0000')
  .setTimestamp()
  .addField("<a:online:839478653288185936> Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("<a:online:839478653288185936> API Latency", `${Math.round(client.ws.ping)}ms`, true)
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  m.edit(embed)

	
    }
}
