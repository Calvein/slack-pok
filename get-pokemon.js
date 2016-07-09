'use strict'

const pokemons = require('./pokemons.json')
// Same order of each items in pokemons.json
const languages = [
    'French',
    'English',
]

module.exports = (pokemon) => {
    const search = new RegExp(pokemon, 'i')
    return pokemons
        .filter((list) => list.names.some((pokemon) => search.test(pokemon)))
        .map((d) => {
            const names = d.names
                .map((name, i) => `*${languages[i]}:* ${name}`)
                .join('\n')

            const img = `http://pokeapi.co/media/sprites/pokemon/${d.id}.png`

            return names + '\n' + img
        })
        .join('\n---\n')
}
