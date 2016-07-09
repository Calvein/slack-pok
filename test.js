'use strict'

const test = require('tape')
const getPokemon = require('./get-pokemon.js')

test('get pikachu', (t) => {
    const pika = {
        attachments: [{
            pretext: '*French:* Pikachu\n*English:* Pikachu',
            image_url: 'http://pokeapi.co/media/sprites/pokemon/25.png',
            mrkdwn_in: ['pretext']
        }]
    }
    t.deepEqual(getPokemon('pika'), pika)

    t.end()
})