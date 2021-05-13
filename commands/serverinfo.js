const { MessageEmbed } = require('discord.js')


module.exports = {
  info: {
    name: "serverinfo",
    description: "Shows informations about server",
    aliases: ["sinfo","serverstats","guildinfo","guildstats"],
  },

    run: async function (client, message, args) {
			const embed = new MessageEmbed()

            .setAuthor(message.guild.name, message.guild.iconURL)
            .setColor("#FF0000")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`Owner: <@${message.guild.ownerID}>`, false)
            .addField('Roles',`${message.guild.roles.cache.size}`, false)
            .addField('Text Channels',`${message.guild.channels.cache.size}`, false)
            .addField('Location', message.guild.region, false)
            .addField('Member Count', `${message.guild.memberCount}`, false)
            .addField('Created At', message.guild.createdAt.toLocaleString(), false)
            .addField('Emotes', `${message.guild.emojis.cache.size}`, false)
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL());
    
          message.channel.send(embed);
    }
}
