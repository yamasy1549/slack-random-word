require('dotenv').config()
const DOMParser = require('xmldom').DOMParser
const request   = require('request')
const Botkit    = require('botkit')

const controller = Botkit.slackbot({
    debug: false
})

const bot = controller.spawn({
    token: process.env.token
}).startRTM()

controller.hears(['theme', 'テーマ'], 'ambient', function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
        url = 'https://ja.wikipedia.org/w/api.php?format=xml&action=query&list=random&rnnamespace=0&rnlimit=1'
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const parser = new DOMParser()
                const dom = parser.parseFromString(body, 'text/xml')
                const word = dom.documentElement.getElementsByTagName('page')[0].getAttribute('title')
                bot.reply(message, word + "\n https://ja.wikipedia.org/wiki/" + word)
            }
        })
    })
})
