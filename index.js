'use strict'

const Botkit = require('botkit')

const config = require('./config.json')
const pokemons = require('./pokemons.json')
// Same order of each items in pokemons.json
const languages = [
    'French',
    'English',
]

const controller = Botkit.slackbot({
    json_file_store: './db_slackbutton_slash_command/',
}).configureSlackApp({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    scopes: ['commands'],
})

controller.setupWebserver(config.port, (err, webserver) => {
    controller.createWebhookEndpoints(controller.webserver)
    controller.createOauthEndpoints(controller.webserver, (err, req, res) => {
        if (err) {
            res.status(500).send('ERROR: ' + err)
        } else {
            res.send('Success!')
        }
    })
})


controller.on('slash_command', (slashCommand, msg) => {
    // Make sure the token matches
    if (msg.token !== config.verificationToken) return

    // Prepare regex
    const search = new RegExp(msg.text, 'i')

    // Create text to send
    const text = pokemons
        .filter((list) => list.some((pokemon) => search.test(pokemon)))
        .map((d) => d.map((name, i) => `*${languages[i]}:* ${name}`).join('\n'))
        .join('\n---\n')

    // Send message
    slashCommand.replyPublic(msg, text)
})
