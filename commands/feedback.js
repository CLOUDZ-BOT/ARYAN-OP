const {MessageEmbed} = require('discord.js')
const { EMOJI_DONE , BOT_ID , CHECK_DM , EMBED_COLOR } = require('../config.json');
module.exports = {
    name: "feedback",
    aliases: ["fb"],
    cooldown: 3,
    description: "submit a feedback",
    async execute(message, args) {

        const fbChannel = "822580249728122891";

        const fb = args.join(" ");
        if(!fb){
            return message.channel.send("Please enter a feedback!");
        }

        const embed = new MessageEmbed()
            .setTitle("Astroz Music Feedback :astroz_correct:")
            .addField(`Author`, `\`${message.author.tag}\``)
            .addField(`Feedback`, "\`"+fb+"\`")
            .addField(`Member Id`, `\`${message.author.id}\``)
            .addField(`On the Server`, `\`${message.guild.name}\``)
            .addField("Server ID:", `\`${message.guild.id}\``)
            .setColor(EMBED_COLOR)
            .setTimestamp()
                    
        message.client.channels.cache.get(fbChannel).send(embed).then((msg) =>{
            msg.react(':astroz_correct:');
            msg.react(':astroz_wrong:');
        }).catch((err)=>{
            throw err;
        });


        const successembed = new MessageEmbed()
        .addField("Join Our Support Server", `Click Here To Join Our [Support Server](https://discord.gg/m7W2t3bsZj)`)
        .setTitle("Success!")
        .setColor(EMBED_COLOR)
        .setDescription(`${EMOJI_DONE} Your **Feedback** is submitted successfully!`)
        message.react(EMOJI_DONE);

        message.author.send(successembed)
    }

}


console.log("Feedback cmd working")
