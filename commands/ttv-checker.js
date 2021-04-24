const { MessageEmbed } = require("discord.js");
var api = require("twitch-api-v5");
const _ = require('lodash')
var moment = require("moment")

api.clientID = "Twitch API Client ID";

module.exports = {
  name: "twitch",
  description: "Searches for a user on Twitch and gives their information!",
  category: "Information",
  minArgs: 1,
  expectedArgs: "<Twitch Name>",
  aliases: ['tinfo', 'tlookup'], 
  execute ( message, client, args ) {
    api.search.channels({ query: `${args[0]}`}, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let final = _.first(res.channels)
        console.log(final)

        let broadcasterType = final.broadcaster_type
        if (broadcasterType === '') {
          broadcasterType = "None"
        } else if (broadcasterType === 'affiliate') {
          broadcasterType = "Affiliate"
        } else if (broadcasterType === 'partner') {
          broadcasterType = "Partner"
        } 

        let created = moment(final.created_at).format('DD-MM-YYYY')
        let lastLive = moment(final.updated_at).format('DD-MM-YYYY, HH:mm')

        const twitchEmbed = new MessageEmbed()
            .setColor("#6441a5")
            .setAuthor(`   │   ${final.display_name}`, client.user.displayAvatarURL())
            .setDescription(`${final.description}`)
            .addField('Latest Stream:', `${final.status}\f
             Game: \`${final.game}\``)
            .addField('Followers', final.followers.toLocaleString(), true)
            .addField('Views', final.views.toLocaleString(), true)
            .addField('Broadcaster Type', broadcasterType)
            .addField("Created On", created, true)
            .addField("Last Live", lastLive, true)
            .setThumbnail(final.logo)
            .setFooter(`Their URL: ${final.url}`)

            message.channel.send(twitchEmbed)
      }
    });
  },
};