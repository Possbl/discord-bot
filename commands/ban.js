require('dotenv').config();

const prefix =  process.env.Prefix

module.exports = {
    name: 'ban',
    description: "Bans a user",
    execute(message, args, Discord){
        const member = message.mentions.users.first();

        const BanEmbed = new Discord.MessageEmbed()
            .setColor('#00ff2f')
            .setTitle('Ban')
            .setDescription(`${member} has been banned by ${message.author.tag}`)
            .setImage('https://media1.tenor.com/images/de413d89fff5502df7cff9f68b24dca5/tenor.gif?itemid=12850590')
            .setFooter(`Gitbot | Made by Possible#0999 & DWORD`)
        const NoPerm = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error:')
            .setDescription(`You're lacking the required permission for this!`)
            .setFooter(`Gitbot | Made by Possible#0999 & DWORD`)
        const NoArgs = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error:')
            .setDescription(`Please use, ${prefix}ban <player>`)
            .setFooter(`Gitbot | Made by Possible#0999 & DWORD`)
        const NoBotPerm = new Discord.MessageEmbed()
            .setColor('#ff0000')   
            .setTitle('Error:')
            .setDescription(`I don't have the required permission for this!`)
            .setFooter(`Gitbot | Made by Possible#0999 & DWORD`)
        const SelfBan = new Discord.MessageEmbed()
            .setColor('#ffe100')
            .setTitle('Error:')
            .setDescription(`You can't ban yourself.`)
            .setFooter(`Gitbot | Made by Possible#0999 & DWORD`)
        
        if (message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
            if (!message.guild.me.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
                message.channel.send(NoBotPerm)
            } else {
                if (member === message.author){ 
                    message.channel.send(SelfBan)
                } else {
                    if (member){
                        const memberTarget = message.guild.members.cache.get(member.id);
                        message.channel.send(BanEmbed)
                        memberTarget.ban();
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
