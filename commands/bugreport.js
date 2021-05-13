const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "bugreport",
    aliases: ["br"],
    cooldown: 3,
    description: "submit a bug",
    async execute(message, args) {

        const fbChannel = "839478606669283328";

        const fb = args.join(" ");
        if(!fb){
            return message.channel.send("Please enter a bug!");
        }

        const embed = new MessageEmbed()
            .setTitle("Cloudz Music Bugreport <a:astroz_success:839478588192718898>")
            .addField(`Author`, `\`${message.author.tag}\``)
            .addField(`Feedback`, "\`"+fb+"\`")
            .addField(`Member Id`, `\`${message.author.id}\``)
            .addField(`On the Server`, `\`${message.guild.name}\``)
            .addField("Server ID:", `\`${message.guild.id}\``)
            .setColor("#FF0000")
            .setTimestamp()
                    
        message.client.channels.cache.get(fbChannel).send(embed).then((msg) =>{
        }).catch((err)=>{
            throw err;
        });


        const successembed = new MessageEmbed()
        .setTitle("Success!")
        .setColor("#FF0000")
        .setDescription(` Your **Bug** is submitted successfully!`)

        message.author.send(successembed)
    }

}


console.log("Feedback cmd working")
