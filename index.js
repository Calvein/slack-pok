'use strict'

const Botkit = require('botkit')
const redis = require('botkit/lib/storage/redis_storage')
const url = require('url')
const getPokemon = require('./get-pokemon.js')

// Configure redis
const redisURL = url.parse(process.env.REDIS_URL)
const redisStorage = redis({
    namespace: 'botkit-example',
    host: redisURL.hostname,
    port: redisURL.port,
    auth_pass: redisURL.auth.split(':')[1]
})

const controller = Botkit.slackbot({
    storage: redisStorage,
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
    // Make sure the token matches
    if (msg.token !== process.env.VERIFICATION_TOKEN) return

    const text = getPokemon(msg.text)
    slashCommand.replyPublic(msg, text)
})
