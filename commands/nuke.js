const Discord = require('discord.js')

module.exports = {
    name: 'nuke',
    execute(message) {
        const NoPermf = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('INSUFFICIENT PERMISSIONS')
            .setDescription(`INSUFFICIENT PERMISSIONS  `)
            .setImage('https://media.tenor.com/images/47bde6035869e5f940c805a21b0b85f7/tenor.gif')
            .setFooter(`Gitbot | Made by Possible#0999`)

        const asmds = new Discord.MessageEmbed()
            .setColor('#fffb00')
            .setTitle('NUKED')
            .setDescription(`TACTICAL NUKE INBOUND!`)
            .setImage('https://media.tenor.com/images/b502508d2d6bef4f91802b099ecfcba4/tenor.gif')
            .setFooter(`Gitbot | Made by Possible#0999`)

        if (!message.member.hasPermission('MANAGE_MESSAGES')) { // look here for more perms https://discord.com/developers/docs/topics/permissions
            message.channel.send(NoPermf)
        }

        message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
            channel.send(asmds)
        })
        message.channel.delete()
        
    },
};