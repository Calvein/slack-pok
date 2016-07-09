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

    const attachments = results.map((d) => {
        const text = d.names
            .map((name, i) => `*${languages[i]}:* ${name}`)
            .join('\n')

        const img = `http://pokeapi.co/media/sprites/pokemon/${d.id}.png`

        return {
            pretext: text,
            image_url: img,
            mrkdwn_in: ['pretext'],
        }
    })

    return { attachments }
}
