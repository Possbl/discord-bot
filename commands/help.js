module.exports = {
    name: 'help',
    description: "sends a list of all the commands",
    execute(message, args, Discord){
        const helpembed = new Discord.MessageEmbed()
        .setColor('#7CFC00')
        .setTitle('Help')
        .setDescription('**+ban** @user reason - Bans mentioned user from the server' + '\n\n' + '**+kick** @user reason - Kicks mentioned user from the server' + '\n\n' + '**+nuke** - Clears the entire history of a channel' + '\n\n' + '**+status** - Test command to check if bot is online' + '\n\n' + '**+play** song title/video title - plays a song/video of your choice' + '\n\n' + '**+dc** - Disconnects the bot from the current channel')
        .setFooter('Gitbot | Made by Possible#0999')

        message.channel.send(helpembed);
    }
}