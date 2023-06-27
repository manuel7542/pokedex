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
import Layout from "../app/layout"
Chart.register(...registerables);
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
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
    MySwal.fire({
      title: <p>Cargando...</p>,
      didOpen: async () => {
        MySwal.showLoading()
        const response = await fetch('/api/pokemon', { method: 'POST', body: JSON.stringify({ page, limit: limit.id })})
        const { data, count } = await response.json()
        setPokemonList(data)
        setCount(count)
        MySwal.close()
      },
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  return (
    <Layout>
      <Modal modal={modal} setModal={setModal} />
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 flex justify-center flex-col">
            <div className='flex justify-between items-center'>
              <h1 className={`text-2xl font-bold text-gray-900`}>Pokédex</h1>
              <Select selected={limit} setSelected={setLimit} items={list} />
            </div>
            {pokemonList.length ? (
              <div id='pokemon-list' className="my-6 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
                {pokemonList.map((pokemon: Pokemon) => (
                  <Card data-test-id="pokemon-card" key={pokemon.id} pokemon={pokemon} setModal={setModal} />
                ))}
              </div>
            ) : !loading ? (
              <div className="flex justify-center items-center flex-col my-10">
                <Image priority src="/no_results.png" width={200} height={200} alt="No se encontraron registros" />
                <p className='mt-5 text-gray-500 text-xl font-regular'>No se encontraron registros</p>
              </div>
            ) : 
            (
              <div className="flex justify-center items-center flex-col my-10">
                <Image priority className='animate-pulse' src="/loading.svg" width={200} height={200} alt="Cargando..." />
                <p className='text-gray-500 text-xl font-regular'>Cargando...</p>
              </div>
            )}
            <Pagination page={page} total={count} setPage={setPage} limit={limit.id} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
