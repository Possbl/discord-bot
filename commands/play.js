const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
 
module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args, Discord) {
        const voiceChannel = message.member.voice.channel;

        const vcembederror = new Discord.MessageEmbed()
        .setColor('#ff0000 ')
        .setTitle('Voice Channel Error')
        .setDescription('You need to be in a channel to execute this command!')
        .setFooter('Gitbot | Made by Possible#0999')

        const permsconnect = new Discord.MessageEmbed()
        .setColor('#ff0000 ')
        .setTitle('Permission Error')
        .setDescription('Please make sure I have Connect Permissions to the voice channel you are in.' + '\n\n' + 'If this is not the case please make sure you have Connect Permissions')
        .setFooter('Gitbot | Made by Possible#0999')

        const permsspeak = new Discord.MessageEmbed()
        .setColor('#ff0000 ')
        .setTitle('Permission Error')
        .setDescription('Please make sure I have Speak Permissions to the voice channel you are in.' + '\n\n' + 'If this is not the case please make sure you have Speak Permissions')
        .setFooter('Gitbot | Made by Possible#0999')

        
        const argmissing = new Discord.MessageEmbed()
        .setColor('#ff0000 ')
        .setTitle('Argument Error')
        .setDescription('Please make sure you include the song title or video title')
        .setFooter('Gitbot | Made by Possible#0999')

        const nextsong = new Discord.MessageEmbed()
        .setColor('#7CFC00')
        .setTitle('Song Over')
        .setDescription('WOOHOO that was some great music, lets turn on some more amazing music by using the +play command again!')
        .setFooter('Gitbot | Made by Possible#0999')
 
        if (!voiceChannel) return message.channel.send(vcembederror);
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(permsconnect);
        if (!permissions.has('SPEAK')) return message.channel.send(permsspeak);
        if (!args.length) return message.channel.send(argmissing);
 
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }

        const playingembed = new Discord.MessageEmbed()
        .setColor('#7CFC00')
        .setTitle('Now Playing')
        .setDescription(`:thumbsup: Now Playing ***Your Link!***` )
        .setFooter('Gitbot | Made by Possible#0999')
 
        if(validURL(args[0])){
 
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('leaving channel');
            });
 
            await message.reply(playingembed)
 
            return
        }
 
        
        const  connection = await voiceChannel.join();
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
 
        }
 
        const video = await videoFinder(args.join(' '));

        const nowplaying = new Discord.MessageEmbed()
        .setColor('#7CFC00')
        .setTitle('Now Playing')
        .setDescription(`:thumbsup: Now Playing ***${video.title}***`)
        .setFooter('Gitbot | Made by Possible#0999')
 
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                message.channel.send(nextsong);
            });
 
            await message.reply(nowplaying)
        } else {
            message.channel.send('No video results found');
        }
    }
}