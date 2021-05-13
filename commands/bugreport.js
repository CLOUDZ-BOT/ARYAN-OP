const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "bugreport",
    aliases: ["br"],
    cooldown: 3,
    description: "submit a Bug",
    async execute(message, args) {

        const fbChannel = "839478606669283328";

        const fb = args.join(" ");
        if(!fb){
            return message.channel.send("Please enter a Bug!");
        }

        const embed = new MessageEmbed()
            .setTitle("Cloudz Music Bugreport <a:astroz_success:839478588192718898>")
            .addField(`Author`, `\`${message.author.tag}\``)
            .addField(`Feedback`, "\`"+fb+"\`")
            .addField(`Member Id`, `\`${message.author.id}\``)
            .addField(`On the Server`, `\`${message.guild.name}\``)
            .addField("Server ID:", `\`${message.guild.id}\``)
            .setColor("#ff0000")
            .setTimestamp()
                    
        message.client.channels.cache.get(fbChannel).send(embed).then((msg) =>{
            msg.react('<a:astroz_success:839478588192718898>');
            msg.react('<a:astroz_error:839478585642713138>');
        }).catch((err)=>{
            throw err;
        });


        const successembed = new MessageEmbed()
        .addField("Join Our Support Server", `Click Here To Join Our [Support Server](https://discord.gg/Arqg9kc8r5)`)
        .setTitle("Success!")
        .setColor("#ff0000")
        .setDescription(`<a:astroz_success:839478588192718898> Your **Bug** is submitted successfully!`)
        message.react("<a:astroz_success:839478588192718898>");

        message.author.send(successembed)
    }

}


console.log("Feedback cmd working")
