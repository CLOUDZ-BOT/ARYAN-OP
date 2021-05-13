const { version } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    info: {
        name: "stats",
        description: "Check the stats of the bot", 
				aliases: [],
    },

    run: async function (client, message, args) {

        let servers_count = message.client.guilds.cache.size;
        var myarray = [];
        message.client.guilds.cache.keyArray().forEach(async function(item, index) {
            
        let guildMember = message.client.guilds.cache.get(item).memberCount;
        myarray.push(guildMember)
        })
        let sum = myarray.reduce(function (a, b) {
        return a + b
        });

        let days = Math.floor(client.uptime / 86400000 );
        let hours = Math.floor(client.uptime / 3600000 ) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        const uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`\`\``;
        const servers = client.guilds.cache.size
        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)


            const embed = new MessageEmbed()

            .setTitle(`${client.user.username}`)
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=36826176`)
            .setColor("#ff0000")
            .setDescription(`Hey My Name is **${client.user.username}** and My Prefix is \`+\` `)
            .setAuthor(`${client.user.username}`, `${client.user.avatarURL()}`)
            .addField("<:servers:839478589284286495> Servers:", `\`\`\`${servers}\`\`\``, true)
            .addField("<:users:839478590591729696> Users:", `\`\`\`${sum}\`\`\``, true)
            .addField(":<a:uptime:839478595734601739> Uptime:", `${uptime}`)
            .addField("<:ram:839478592064323594> Ram:", `\`\`\`${ram}MB\`\`\``)
            .addField("<a:BOT:839493686269182009> Bot Developers:", `THE丶JUИGLΣΣ丶SHIVAMᵀˣ#5290,」𝐙𝐆𝐎𝐃#7663`)
						.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();

            message.channel.send(embed)
        }
}
