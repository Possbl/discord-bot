require('dotenv').config();

module.exports = {
    name: 'help',
    execute(client, message, args, Discord) {

        if (message.guild) {
            message.react('📜')
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }), 'https://github.com/PossibleTM/discord-bot')
                .setThumbnail(client.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle('Help')
                .setColor('RANDOM')
                .setDescription(`Commands for BigClouds`)
                .addFields({
                    name: 'play, loop, stop or skip',
                    value: `plays youtube songs.\n Usage: ${process.env.PREFIX}play <youtube-url\n ${process.env.PREFIX}play <songname>\n ${process.env.PREFIX}skip (skips a song)\n ${process.env.PREFIX}loop (to loop the current song)\n ${process.env.PREFIX}stop (bot stops playing music)`
                }, {
                    name: 'tv',
                    value: `You can check someones Twitch Profile with it.\n Usage: ${process.env.PREFIX}tv <TwitchName>\n`
                }, {
                    name: 'san',
                    value: `just some covid things you know.\n Usage: ${process.env.PREFIX}san\n`
                },  {
                    name: 'fake',
                    value: `Creats Fake Personal Informations.\n Usage: ${process.env.PREFIX}fake\n`
                }, {
                    name: 'help',
                    value: `shows this info.\n Usage: ${process.env.PREFIX}help\n`

                })
                .setFooter('Made with 💖 by Possible & DWORD', client.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }, {
                    name: 'help',
                    value: `shows this info.\n Usage: ${process.env.PREFIX}help\n`

                }))
            message.author.send(embed);
        }
        if (!message.guild) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }), 'https://github.com/PossibleTM/discord-bot')
                .setThumbnail(client.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle('Help')
                .setColor('RANDOM')
                .setDescription(`Commands for BigClouds`)
                .addFields({
                    name: 'play, loop, stop or skip',
                    value: `plays youtube songs.\n Usage: ${process.env.PREFIX}play <youtube-url\n ${process.env.PREFIX}play <songname>\n ${process.env.PREFIX}skip (skips a song)\n ${process.env.PREFIX}loop (to loop the current song)\n ${process.env.PREFIX}stop (bot stops playing music)`
                }, {
                    name: 'tv',
                    value: `You can check someones Twitch Profile with it.\n Usage: ${process.env.PREFIX}tv <TwitchName>\n`
                }, {
                    name: 'san',
                    value: `just some covid things you know.\n Usage: ${process.env.PREFIX}san\n`
                },  {
                    name: 'fake',
                    value: `Creats Fake Personal Informations.\n Usage: ${process.env.PREFIX}fake\n`
                }, {
                    name: 'help',
                    value: `shows this info.\n Usage: ${process.env.PREFIX}help\n`

                })
                .setFooter('Made with 💖 by Possible & DWORD', client.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
            message.author.send(embed);
        }

    }
}