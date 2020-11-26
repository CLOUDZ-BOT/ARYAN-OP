const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "play",
    description: "To play songs :D",
    usage: "<YouTube_URL> | <song_name>",
    aliases: ["p"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);
    if (!permissions.has("SPEAK"))return sendError("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return sendError("You didn't poivide want i want to play", message.channel);
   	const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
   var serverQueue = message.client.queue.get(message.guild.id);

     let songInfo = null;
    let song = null;
    if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
       try {
          songInfo = await ytdl.getInfo(url)
          if(!songInfo)return sendError("Looks like i was unable to find the song on YouTube", message.channel);
        song = {
       id: songInfo.videoDetails.videoId,
       title: songInfo.videoDetails.title,
       url: songInfo.videoDetails.video_url,
       img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
      duration: songInfo.videoDetails.lengthSeconds,
      ago: songInfo.videoDetails.publishDate,
      views: String(songInfo.videoDetails.viewCount).padStart(10, ' '),
      req: message.author

        };

      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }else {
      try {
        var searched = await yts.search(searchString);
    if(searched.videos.length === 0)return sendError("Looks like i was unable to find the song on YouTube", message.channel)
    
     songInfo = searched.videos[0]
        song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Song has been added to queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("YELLOW")
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true,
      loop: false
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        sendError("Leaving the voice channel because I think there are no songs in the queue. If you like the bot stay 24/7 in voice channel go to `commands/play.js` and remove the line number 61\n\nThank you for using my code! [GitHub](https://github.com/SudhanPlayz/Discord-MusicBot)", message.channel)
        if(!queue) return;
        queue.voiceChannel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
        return;
      }
  let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

  try {
    if (song.url.includes("youtube.com")) {
      stream = await ytdlDiscord(song.url, { quality: 'highestaudio', highWaterMark: 1 << 25 });
    } 
  } catch (error) {
if (queue) {
        queue.songs.shift();
        play(queue.songs[0]);
      }
    return sendError(`An unexpected error has occurred.`,message.channel).catch(console.error);;
  }
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

      const dispatcher = queue.connection
         .play(stream, { type: streamType})
        .on("finish", () => {
           const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            };
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
      .setAuthor("Started Playing Music!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return sendError(`I could not join the voice channel: ${error}`, message.channel);
    }
  


},

};