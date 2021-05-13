const { MessageEmbed } = require("discord.js");

module.exports = {
    info: {
        name: "servers-list",
        aliases: ["s"],
        description: "Get the list of servers",
        usage: "",
    },

    run: async function (client, message, args, data) {
        
	    if(message.author.id != "764546128204005436") {
	    return message.channel.send("Only Bot Owner Can Use This Command")
	    }
	    
	    await message.delete();

		let i0 = 0;
		let i1 = 10;
		let page = 1;

		let description = 
        `${client.guilds.cache.size}\n\n`+
		client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
			.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount}`)
			.slice(0, 10)
			.join("\n");

		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setColor("#ff0000")
			.setFooter(client.user.username)
			.setTitle(`${page}/${Math.ceil(client.guilds.cache.size/10)}`)
			.setDescription(description);

		const msg = await message.channel.send(embed);
        
		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

		collector.on("collect", async(reaction) => {

			if(reaction._emoji.name === "⬅") {

				i0 = i0-10;
				i1 = i1-10;
				page = page-1;
                
				if(i0 < 0){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}
                
				description = `${client.guilds.cache.size}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount}`)
					.slice(i0, i1)
					.join("\n");

				embed.setTitle(`${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				msg.edit(embed);
            
			}

			if(reaction._emoji.name === "➡"){

				i0 = i0+10;
				i1 = i1+10;
				page = page+1;

				if(i1 > client.guilds.cache.size + 10){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}

				description = `${client.guilds.cache.size}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount}`)
					.slice(i0, i1)
					.join("\n");

				embed.setTitle(`${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				msg.edit(embed);

			}

			if(reaction._emoji.name === "❌"){
				return msg.delete(); 
			}

			await reaction.users.remove(message.author.id);

		});
    },
};
