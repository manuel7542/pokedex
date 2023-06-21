import { Pokemon } from '@/interfaces/pokemon.interface';
import Image from 'next/image';
import React from 'react'

export default function Card({ pokemon, setModal }: { pokemon: Pokemon, setModal: any }) {
  return (
    <div key={pokemon.id} className="group relative bg-gray-100 shadow-lg rounded-lg cursor-pointer" onClick={() => setModal({ item: pokemon, isOpen: true })} >
      <div className="relative h-64 w-full flex flex-col justify-center align-center overflow-hidden group-hover:opacity-75 rounded-t-lg bg-white">
        <Image
          src={pokemon.picture || '/pokemon_logo1.png'}
          alt={pokemon.name}
          className="h-64 w-full object-contain object-center mb-4 p-6"
          width={2000}
          height={2000}
          priority
        />
        <div className='absolute bottom-2 right-2 inline-flex items-center rounded-xl bg-green-600/20 px-2 py-1 text-md text-green-700 ring-1 ring-green-600/20'>
          Peso: {pokemon.weight / 10} kg
        </div>
      </div>
      <div className='mt-6 mb-6 md:mb-0 pb-6 ml-6'>
        <h3 className="text-2xl font-bold text-gray-900 capitalize mb-5">
          {pokemon.name.replaceAll('-', ' ')}
        </h3>
        {pokemon.moves.map(({move}, i) => {
          if (i < 2) {
            const words = move.name.split('-')
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            words.join(" ");
            return <span key={i} className="text-base font-thin text-green-600/60 capitalize">{`#${words.join("")} `}</span>
          } 
        })}
      </div>
    </div>
  )
}
