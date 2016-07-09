'use strict'

const test = require('tape')
const getPokemon = require('./get-pokemon.js')

test('get pikachu', (t) => {
    const pika = {
        text: '*French:* Pikachu\n*English:* Pikachu',
        attachments: [{
            thumb_url: 'http://pokeapi.co/media/sprites/pokemon/25.png'
        }]
    }
    t.deepEqual(getPokemon('pika'), pika)

    t.end()
})