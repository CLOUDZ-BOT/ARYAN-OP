const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "disconnect",
    aliases: ["dc", "disconnect", "nikal"],
    description: "Leaves VC",
    async execute(message, args) {
        const { channel } = message.member.voice;
    
        if(!message.member.hasPermission('MOVE_MEMBERS')){
          const noperms = new MessageEmbed()
          .setDescription(':astroz_wrong: You Do Not Have Perms To Execute This Command! You Need `MOVE MEMBER` Perm To Execute This Command!')
          .setColor("#FF0000");
          return message.channel.send(noperms)
        }
        const serverQueue = message.client.queue.get(message.guild.id);

        const dcneedvc = new MessageEmbed()        
        .setDescription(":astroz_wrong: You need to join a voice channel which i'm in - to disconnect me!")
        .setColor("#FF0000");

        const dcembed = new MessageEmbed()
        .setDescription("<a:astroz_success:839478588192718898> 24/7 mode is now **Disabled** in this server.")
        .setColor("#FF0000")

        
        const dccembed = new MessageEmbed()
        .setDescription(`You must be in the same channel as ${message.client.user}`)
        .setColor("#FF0000")

        if (!channel) return message.reply(dcneedvc).catch(console.error);
        if (serverQueue && channel !== message.guild.me.voice.channel)
          return message.reply(dccembed).catch(console.error);

            message.member.voice.channel.leave();
            message.channel.send(dcembed)       
        return message.react("<a:astroz_success:839478588192718898>");
           
        }
    }



    console.log("DC / Disconnect working")
