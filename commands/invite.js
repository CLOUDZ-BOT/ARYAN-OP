const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "invite",
    description: "To add/invite the vocal bots to your server",
    usage: "",
    aliases: ["inv"],
  },

  run: async function (client, message, args) {

    const av1 = "**__[Invite Me](https://discord.com/oauth2/authorize?client_id=822294569223454740&scope=bot&permissions=8)__**"
    const av2 = "**__[Invite Me](https://discord.com/oauth2/authorize?client_id=825244753377099776&scope=bot&permissions=8)__**"
    const av3 = "**__[Invite Me](https://discord.com/oauth2/authorize?client_id=825245034449993748&scope=bot&permissions=8)__**"
    const nav1 = "**__[Invite Me](https://discord.com/oauth2/authorize?client_id=822294569223454740&scope=bot&permissions=36826176)__**"
    const nav2 = "**__[Invite Me](https://discord.com/oauth2/authorize?client_id=825244753377099776&scope=bot&permissions=36826176)__**"
    const nav3 = "**__[Invite Me](https://discord.com/oauth2/authorize?client_id=825245034449993748&scope=bot&permissions=36826176)__**"
    
    let invite = new MessageEmbed()
    .setTitle(`Invite Links of Cloudz Music`)
    .addField("<a:discordgg:842055987732152371>**__Invite Me With Admin Perms__**", `<a:766034662589202502:842056330998054963> **Cloudz 1 -** ${av1}\n<a:766034662589202502:842056330998054963> **Cloudz 2 -** ${av2}\n<a:766034662589202502:842056330998054963> **Cloudz 3 -** ${av3}`)
    .addField("<a:discordgg:842055987732152371> **__Invite Me Without Admin Perms__**", `<a:766034662589202502:842056330998054963> **Cloudz 1 -** ${nav1}\n<a:766034662589202502:842056330998054963> **Cloudz 2 -** ${nav2}\n<a:766034662589202502:842056330998054963> **Cloudz 3 -** ${nav3}`)
    .addField("<<a:discordgg:842055987732152371> **__Support Server__**", `<a:766034662589202502:842056330998054963> **[Join Now](https://discord.gg/zqMJxmz67T)**`)
    .setColor("#ff0000")
    return message.channel.send(invite);
  }
}










