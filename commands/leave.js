const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "leave",
        aliases: ["goaway", "disconnect"],
        description: "Leave The Voice Channel!",
        usage: "Leave",
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("<a:alert:839493679030730764> I'm sorry but you need to be in a voice channel!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("<a:alert:839493679030730764> I Am Not In Any Voice Channel!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("<a:alert:839493679030730764> Trying To Leave The Voice Channel...", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Leave Voice Channel")
            .setColor("#ff0000")
            .setTitle("Success")
            .setDescription("<a:astroz_success:839478588192718898> Sucessfully Left The Voice Channel")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("<a:astroz_success:839478588192718898> Sucessfully Left The Voice Channel"));
    },
};
