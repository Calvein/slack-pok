'use strict'

const pokemons = require('./pokemons.json')
// Same order of each items in pokemons.json
const languages = [
    'French',
    'English',
]

module.exports = (pokemon) => {
    const search = new RegExp(pokemon, 'i')
    const results = pokemons
        .filter((list) => list.names.some((pokemon) => search.test(pokemon)))

    const text = results.map((d) => {
        return d.names
            .map((name, i) => `*${languages[i]}:* ${name}`)
            .join('\n')

        const img = `http://pokeapi.co/media/sprites/pokemon/${d.id}.png`

        return names + '\n' + img
    })
    .join('\n---\n')

    const images = results.map((d) => ({
        thumb_url: `http://pokeapi.co/media/sprites/pokemon/${d.id}.png`
    }))

    return {
        text: text,
        attachments: images,
    }
}
