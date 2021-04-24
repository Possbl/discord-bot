module.exports = {
    name: 'kick',
    description: "Kicks a user.",
    execute(message, args, Discord){
        const member = message.mentions.users.first();

        const KickEmbed = new Discord.MessageEmbed()
            .setColor('#00ff2f')
            .setTitle('Kick')
            .setDescription(`${member} has been kicked by ${message.author.tag}`)
            .setImage('https://media0.giphy.com/media/l3V0j3ytFyGHqiV7W/giphy.gif')
            .setFooter(`Gitbot | Made by Possible#0999`)
        const NoPerm = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error:')
            .setDescription(`You're lacking the required permission for this!`)
            .setFooter(`Gitbot | Made by Possible#0999`)
        const NoArgs = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error:')
            .setDescription(`Please use, +kick <player>`)
            .setFooter(`Gitbot | Made by Possible#0999`)
        const NoBotPerm = new Discord.MessageEmbed()
            .setColor('#ff0000')   
            .setTitle('Error:')
            .setDescription(`I don't have the required permission for this!`)
            .setFooter(`Gitbot | Made by Possible#0999`)
        const SelfKick = new Discord.MessageEmbed()
            .setColor('#ffe100')
            .setTitle('Error:')
            .setDescription(`You can't kick yourself.`)
            .setFooter(`Gitbot | Made by Possible#0999`)
        
        if (message.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
            if (!message.guild.me.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
                message.channel.send(NoBotPerm).then(r => r.delete({timeout: 5000})).then
            } else {
                if (member === message.author){ 
                    message.channel.send(SelfKick)
                } else {
                    if (member){
                        const memberTarget = message.guild.members.cache.get(member.id);
                        message.channel.send(KickEmbed)
                        memberTarget.kick();
                    } else {
                        message.channel.send(NoArgs)
                    }
                }
            }
        } else {
            message.channel.send(NoPerm)
        }
    }

}