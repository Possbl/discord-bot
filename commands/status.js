

module.exports = {
    name: 'status',
    description: "Status",
    async execute(message, args, Discord){
        const statusembed = new Discord.MessageEmbed()
        .setColor('#7CFC00')
        .setTitle('Status')
        .setDescription('Bot is online')
        .setFooter('Gitbot | Made by Possible#0999')

        message.channel.send(statusembed);
    }
}
