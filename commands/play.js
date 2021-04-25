const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js')

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'loop'],
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message, args, command, client, Discord) {


        const perms = new Discord.MessageEmbed()
        .setColor('#FF000')
        .setTitle('Invalid Permissions')
        .setDescription('Please ensure I have Connect & Speak permissions')
        .setFooter('Gitbot | Made by Possible#0999')

        const novc = new Discord.MessageEmbed()
        .setColor('#FF000')
        .setTitle('No VC Found')
        .setDescription('Please ensure you are in a voice channel and I am able to see it')
        .setFooter('Gitbot | Made by Possible#0999')


        const argsmissing = new Discord.MessageEmbed()
        .setColor('#FF000')
        .setTitle('Second Arg')
        .setDescription('Please ensure you include the song/video title')
        .setFooter('Gitbot | Made by Possible#0999')

        const cantfind = new Discord.MessageEmbed()
        .setColor('#FF000')
        .setTitle('Cannot Find Video/Song')
        .setDescription('Please ensure you specify the title or link the video')
        .setFooter('Gitbot | Made by Possible#0999')

        const connect222iontime = new Discord.MessageEmbed()
        .setColor('#FF000')
        .setTitle('Cannot Connect')
        .setDescription('Request Timed out')
        .setFooter('Gitbot | Made by Possible#0999')




        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send(novc);
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(perms);
        if (!permissions.has('SPEAK')) return message.channel.send(perms);

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (command === 'play') {
            if (!args.length) return message.channel.send(argsmissing);
            let song = {};
            message.react("▶️")

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = {
                    title: song_info.videoDetails.title,
                    url: song_info.videoDetails.video_url
                }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = {
                        title: video.title,
                        url: video.url
                    }
                } else {
                    message.channel.send(cantfind);
                }
            }

            
        const added = new Discord.MessageEmbed()
        .setColor('#00FF43')
        .setTitle('Added To Queue')
        .setDescription(`👍 **${song.title}** added to queue!`)
        .setFooter('Gitbot | Made by Possible#0999')


            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue) {

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [],
                    loop: false,
                }

                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send(connectiontime);
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                return message.channel.send(added);
            }
        } else if (command === 'skip') skip_song(message, server_queue);
        else if (command === 'stop') stop_song(message, server_queue);
        else if (command === 'loop') loop_song(message, server_queue);
    }

}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    const nowplayfffing = new Discord.MessageEmbed()
    .setColor('#00FF43')
    .setTitle('Now Playing')
    .setDescription(`🎶 Now playing **${song.title}**`)
    .setFooter('Gitbot | Made by Possible#0999')



    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, {
        filter: 'audioonly'
    });
    song_queue.connection.play(stream, {
            seek: 0,
            volume: 0.5
        })
        .on('finish', () => {
            if (!song_queue.loop) song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });

    await song_queue.text_channel.send(nowplayfffing)
}

const skip_song = (message, server_queue) => {

    const no2vc = new Discord.MessageEmbed()
    .setColor('#FF000')
    .setTitle('No VC Found')
    .setDescription('Please ensure you are in a voice channel and I am able to see it')
    .setFooter('Gitbot | Made by Possible#0999')

    const nosongqueue = new Discord.MessageEmbed()
    .setColor('#FF000')
    .setTitle('No Songs Left')
    .setDescription('Play more song pweaz')
    .setFooter('Gitbot | Made by Possible#0999')

    if (!message.member.voice.channel) return message.channel.send(no2vc);
    if (!server_queue) {
        return message.channel.send(nosongqueue);
    }

    message.react("⏭️")

    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {

    const n2o2vc = new Discord.MessageEmbed()
    .setColor('#FF000')
    .setTitle('No VC Found')
    .setDescription('Please ensure you are in a voice channel and I am able to see it')
    .setFooter('Gitbot | Made by Possible#0999')

    if (!message.member.voice.channel) return message.channel.send(n2o2vc);
    server_queue.songs = [];

    message.react("❌")

    server_queue.connection.dispatcher.end();
}

const loop_song = (message, server_queue) => {

    
    const n22o2vc = new Discord.MessageEmbed()
    .setColor('#FF000')
    .setTitle('No VC Found')
    .setDescription('Please ensure you are in a voice channel and I am able to see it')
    .setFooter('Gitbot | Made by Possible#0999')

    const nosongq2ueue = new Discord.MessageEmbed()
    .setColor('#FF000')
    .setTitle('No Songs Left')
    .setDescription('Play more song pweaz')
    .setFooter('Gitbot | Made by Possible#0999')

    const looped = new Discord.MessageEmbed()
    .setColor('#FF000')
    .setTitle('Looping Songs')
    .setDescription(`🔁 I have now ${server_queue.loop ? `**Enabled**` : `**Disabled**`} loop.`)
    .setFooter('Gitbot | Made by Possible#0999')

    if (!message.member.voice.channel) return message.channel.send(n22o2vc);
    if (!server_queue) return message.channel.send(nosongq2ueue);

    server_queue.loop = !server_queue.loop

    message.react("🔁")

    return message.channel.send(looped)



}
