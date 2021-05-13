const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "join",
        description: "Enables/Disables 24/7 of the bot in the server",
        usage: "",
        aliases: ["j", "24/7"]
    },

    run: async function(client, message, args){
		const vc = new MessageEmbed()
		.setDescription(`You're not in a voice channel!`)
		.setTitle("Error!")
		.setColor("#fe0000")
    if (!message.member.voice.channel) return message.channel.send(vc);

      		const nsvc = new MessageEmbed()
		.setDescription(`<@${client.user.id}> **Is Already Playing Music In Other VC**!`)
		.setTitle("Error!")
		.setColor("#fe0000")
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nsvc);

		const svc = new MessageEmbed()
		.setDescription(`<@${client.user.id}> **Is Already In Your VC!**`)
		.setTitle("Error!")
		.setColor("#ff0000")
        if (message.guild.me.voice.channel && message.member.voice.channel.id == message.guild.me.voice.channel.id) return message.channel.send(svc);

        await message.member.voice.channel.join()

        const joinembed = new MessageEmbed()

        .setDescription(`<a:astroz_success:839478588192718898> SUCCESSFULLY JOINED THE VOICE CHANNEL. `)
        .setColor("#ff0000")
    
        message.channel.send(joinembed);
	}
}
