module.exports = {
    name: 'dc',
    description: "disconnects bot from call",
    async execute(message, args, Discord) {
        
    const voiceChannel = message.member.voice.channel;
    const dcembed = new Discord.MessageEmbed()
    .setColor('#7CFC00')
    .setTitle('Disconnect')
    .setDescription(':wave: - Thanks for the nice party! Invite me later!')
    .setFooter('Gitbot | Made by Possible#0999')

    message.channel.send(dcembed);

    voiceChannel.leave();
    }
}