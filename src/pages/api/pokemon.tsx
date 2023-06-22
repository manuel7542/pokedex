import { NextApiRequest, NextApiResponse } from "next"
import { FlavorTextEntry, Pokemon, PokemonList, PokemonSpecies, Result } from "@/interfaces/pokemon.interface"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { limit, page } = JSON.parse(req.body)
    const response = await fetch(`${process.env.API_URL}pokemon?limit=${limit}&offset=${(page - 1) * limit}`)
    const data: PokemonList = await response.json()
    const pokemonList: Pokemon[] = []
    for (let i = 0; i < data.results.length; i++) {
      const pokemon = data.results[i];
      pokemonList.push(await fetchPokemon(pokemon))
    }
    res.status(200).json({
      data: pokemonList,
      count: data.count
    })
  } catch (error: unknown) {
    res.status(500).json({ error: 'Ha ocurrido un error' })
    throw new Error('Ha ocurrido un error', { cause: error });
  }
}

export const fetchPokemon = async (pokemon: Result): Promise<Pokemon> => {
  try {
    const response = await fetch(pokemon.url)
    const data: Pokemon = await response.json()
    const picture = data.sprites.other!["official-artwork"].front_default
    data.picture = picture
    data.description = await fetchSpecies(data.species.url)
    return data
  } catch (error: unknown) {
    throw new Error('Ha ocurrido un error', { cause: error });
  }
}

export const fetchSpecies = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url)
    const data: PokemonSpecies = await response.json()
    return data.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text || 'En proceso de análisis.'
  } catch (error: unknown) {
    throw new Error('Ha ocurrido un error', { cause: error });
  }
}