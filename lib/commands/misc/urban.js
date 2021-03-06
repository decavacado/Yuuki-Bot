var commandos = require("discord.js-commando")
var { MessageEmbed } = require("discord.js")
var embed = MessageEmbed
var fetch = require('node-fetch')

class Chuck extends commandos.Command {
    constructor(client){
        super(client, {
            name: "urban",
            aliases: ["dict","simp"],
            group: "misc",
            memberName: "urban",
            description: "The bot  gets urban dictionary definition for you ",
            details: "This command fetches urban dictionary defintion for your use",
            examples: [".yu urban simp", ".yu urban bot"],
            args: [{
                key: "keyword",
                prompt: "What do you want to search up?",
                type: "string"
            }]
        })
    }
    async run(msg, {keyword}) {
        let send_em = new embed()
        send_em.setTitle("Urban")
        send_em.setColor(0x7900a8)
        send_em.setFooter("Powered by Urban dictionary")
        let res = await fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${keyword}`, {headers: {"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com", "x-rapidapi-key": process.env.RAPIDAPI_KEY}})
        let data = await res.json()
        let random_num = Math.floor(Math.random() * data.list.length)
        let defintion = data.list[random_num]
        if(defintion){
            send_em.addFields([
                {
                    name: defintion.word,
                    value: defintion.definition
                },
                {
                    name: "Author",
                    value: defintion.author
                },
                {
                    name: "Example",
                    value: defintion.example
                },
                {
                    name: "Thumbs Up",
                    value: defintion.thumbs_up,
                    inline: true
                },
                {
                    name: "Thumbs Down",
                    value: defintion.thumbs_down,
                    inline: true
                }
            ])
            return msg.embed(send_em)
        }else {
            return msg.say('Nothing found');
        }
    }
}
module.exports = Chuck