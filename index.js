'use strict'

const Botkit = require('botkit')

const pokemons = require('./pokemons.json')
// Same order of each items in pokemons.json
const languages = [
    'French',
    'English',
]

const controller = Botkit.slackbot({
    json_file_store: './db_slackbutton_slash_command/',
}).configureSlackApp({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scopes: ['commands'],
})

controller.setupWebserver(process.env.PORT, (err, webserver) => {
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
    if (msg.command !== '/pok') {
        return slashCommand.replyPublic(msg, `I'm afraid I don't know how to ${msg.command} yet.`)
    }

    // Make sure the token matches!
    if (msg.token !== process.env.VERIFICATION_TOKEN) return

    const search = new RegExp(msg.text, 'i')
    const text = pokemons
        .filter((list) => list.some((pokemon) => search.test(pokemon)))
        .map((d) => d.map((name, i) => `*${languages[i]}:* ${name}`).join('\n'))
        .join('\n---\n')

    slashCommand.replyPublic(msg, text)
})
