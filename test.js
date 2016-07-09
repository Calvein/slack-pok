'use strict'

const test = require('tape')
const getPokemon = require('./get-pokemon.js')

test('get pikachu', (t) => {
    const pika = {
        attachments: [{
            pretext: ':fr:: Pikachu\n:uk:: Pikachu',
            image_url: 'http://pokeapi.co/media/sprites/pokemon/25.png',
            mrkdwn_in: ['pretext']
        }]
    }
    t.deepEqual(getPokemon('pika'), pika)

    t.end()
})

test('get nothing', (t) => {
    const req = 'lel'
    const errText = {
        text: `Ain't no pokemon called *${req}*, fool.`
    }
    t.deepEqual(getPokemon(req), errText)

    t.end()
})