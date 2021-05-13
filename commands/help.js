const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "To show all commands",
        aliases: ["commands"]
    },

    run: async function(client, message, args){

        let embed = new MessageEmbed()
        .setAuthor("Commands of "+client.user.username, "https://images-ext-1.discordapp.net/external/oVHlY2qCVNh13xNwI0E9Exlw05pSj-Aj8amYa84qoRM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/822294569223454740/06d90b47826d04bc369fef70fd8b515a.png?width=427&height=427")
        .setColor("#FF0000")
				.setDescription("Hey my prefix in this server is **+**")
				.addField("<a:Music:841963243676106752> __**Music Commands**__", "`play`, `skip`, `join`, `leave`, `volume`, `queue`, `np`, `stop`, `loop`, `pause`, `resume`, `lyrics`, `playlist`, `remove`, `shuffle`, `skipto`, `search`, `24/7`", false)
				.addField("<a:alert:839493679030730764> __**Utility Commands**__", "`ping`, `invite`, `uptime`, `serverinfo`, `stats`, `feedback`, `bugreport`, `help`", false)
        .setFooter(`To get info of each command you can do +help [command]`)
				.addField("<a:BOT:839493686269182009> __**Developer Commands**__", "`eval`, `serverlist`, `setstatus`,", false)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Unknown Command")
            let commandinfo = new MessageEmbed()
            .setAuthor("Command: "+command.info.name+" info", "https://images-ext-2.discordapp.net/external/7HyqpdPfpT_FhZUWawY5MXBmRzCMqrowXHlrQCucuY0/https/cdn.discordapp.com/emojis/715629948932587560.gif")
            .setColor("#FF0000")
            .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${client.config.prefix}${command.info.name}\`\`
Aliases: ${command.info.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
    }
}
