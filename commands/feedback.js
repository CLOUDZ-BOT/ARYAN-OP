const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "feedback",
    aliases: ["fb"],
    cooldown: 3,
    description: "submit a feedback",
    async execute(message, args) {

        const fbChannel = "839478605209010207";

        const fb = args.join(" ");
        if(!fb){
            return message.channel.send("Please enter a feedback!");
        }

        const embed = new MessageEmbed()
            .setTitle("Cloudz Music Feedback <a:astroz_success:839478588192718898>")
            .addField(`Author`, `\`${message.author.tag}\``)
            .addField(`Feedback`, "\`"+fb+"\`")
            .addField(`Member Id`, `\`${message.author.id}\``)
            .addField(`On the Server`, `\`${message.guild.name}\``)
            .addField("Server ID:", `\`${message.guild.id}\``)
            .setColor("#ff0000")
            .setTimestamp()
                    
        message.client.channels.cache.get(fbChannel).send(embed).then((msg) =>{
            msg.react(':astroz_correct:');
            msg.react(':astroz_wrong:');
        }).catch((err)=>{
            throw err;
        });


        const successembed = new MessageEmbed()
        .addField("Join Our Support Server", `Click Here To Join Our [Support Server](https://discord.gg/Arqg9kc8r5)`)
        .setTitle("Success!")
        .setColor("#ff0000")
        .setDescription(`<a:astroz_success:839478588192718898> Your **Feedback** is submitted successfully!`)
        message.react("<a:astroz_success:839478588192718898>");

        message.author.send(successembed)
    }

}


console.log("Feedback cmd working")
