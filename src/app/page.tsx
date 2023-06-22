"use client"
import Card from '@/components/Card.component'
import Header from '../components/Header.component'
import { useEffect, useState } from 'react'
import { Pokemon } from '@/interfaces/pokemon.interface'
import Image from 'next/image'
import Pagination from '@/components/Pagination.component'
import Modal from '@/components/Modal.component'
import { registerables, Chart } from "chart.js";
import Select from '@/components/Select.component'
Chart.register(...registerables);
export interface ListItems {
  id: number,
  name: number,
}
const list: ListItems[] = [
  {
    id: 5,
    name: 5,
  },
  {
    id: 10,
    name: 10,
  },
  {
    id: 15,
    name: 15,
  },
  {
    id: 20,
    name: 20,
  },
  {
    id: 25,
    name: 25,
  },
  {
    id: 50,
    name: 50,
  },
]
export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [limit, setLimit] = useState<ListItems>(list[1])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [modal, setModal] = useState<{
    item: Pokemon | null,
    isOpen: boolean
  }>({
    item: null,
    isOpen: false
  })

  async function fetchData() {
    setLoading(true)
    const response = await fetch('/api/pokemon', { method: 'POST', body: JSON.stringify({ page, limit: limit.id })})
    const { data, count } = await response.json()
    setPokemonList(data)
    setCount(count)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  return (
    <main>
      <div className={`fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 ${loading ? 'flex' : 'hidden'} flex-col items-center justify-center`}>
        <div className="animate-spin loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-24 w-24 mb-4"></div>
      </div>
      <Modal modal={modal} setModal={setModal} />
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 flex justify-center flex-col">
            <div className='flex justify-between items-center'>
              <h2 className={`text-2xl font-bold text-gray-900`}>Pokédex</h2>
              <Select selected={limit} setSelected={setLimit} items={list} />
            </div>
            {pokemonList.length ? (
              <div className="my-6 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
                {pokemonList.map((pokemon: Pokemon) => (
                  <Card key={pokemon.id} pokemon={pokemon} setModal={setModal} />
                ))}
              </div>
            ) : !loading ? (
              <div className="flex justify-center items-center flex-col my-10">
                <Image src="/no_results.png" width={200} height={200} alt="No se encontraron registros" />
                <p className='mt-5 text-gray-500 text-xl font-regular'>No se encontraron registros</p>
              </div>
            ) : 
            (
              <div className="flex justify-center items-center flex-col my-10">
                <Image className='animate-pulse' src="/loading.svg" width={200} height={200} alt="Cargando..." />
              </div>
            )}
            <Pagination page={page} total={count} setPage={setPage} limit={limit.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
