const { MessageEmbed } = require('discord.js')


module.exports = {
  info: {
    name: "uptime",
    description: "Shows Uptime of bot",
    aliases: ["up"],
  },

    run: async function (client, message, args) {
			
			let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;    
        const RemoveUseless = (Duration) => {
      return Duration.replace("0 Day\n", "").replace("0 Hour\n", "").replace("0 Minute\n", "");
    };
    let Uptime = await RemoveUseless(`\`${Days}\` ${Days > 1 ? "Days" : "Day"} \`${Hours}\` ${Hours > 1 ? "Hours" : "Hour"} \`${Minutes}\` ${Minutes > 1 ? "Minutes" : "Minute"} \`${Seconds}\` ${Seconds > 1 ? "Seconds" : "Second"}`);
    
    const embed = new MessageEmbed()
    
    .setTitle("<a:uptime:839478595734601739> Bot Uptime")
    .setDescription(`Bot is online from ${Uptime}`)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp();

          message.channel.send(embed);
    }
}
