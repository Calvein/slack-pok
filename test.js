'use strict'

const test = require('tape')
const getPokemon = require('./get-pokemon.js')

test('get pikachu', (t) => {
    const pika = '*French:* Pikachu\n*English:* Pikachu\nhttp://pokeapi.co/media/sprites/pokemon/25.png'
    t.equal(getPokemon('pika'), pika)

    t.end()
})