require('dotenv').config()
const DOMParser = require('xmldom').DOMParser
const request   = require('request')
const Botkit    = require('botkit')

if (!process.env.token || !process.env.port) {
  console.log('Error: Specify clientId clientSecret and port in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
    hostname: '0.0.0.0',
    debug: false
})

const bot = controller.spawn({
    token: process.env.token
}).startRTM()

controller.hears(['ping'], ['direct_mention', 'mention'], function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
        bot.reply(message, 'nya~n')
    })
})

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
