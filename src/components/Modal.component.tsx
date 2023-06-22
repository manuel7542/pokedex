import { Pokemon, StatsData, TypeColor } from '@/interfaces/pokemon.interface'
import Image from 'next/image'
import React from 'react'
import Chart from '@/components/Chart.component'

export default function Modal({modal, setModal}: { modal: { item: Pokemon | null, isOpen: boolean }, setModal: any }) {
  const pokemonNumber = modal.item?.id.toString().padStart(4, '0')
  const [stats, setStats] = React.useState<StatsData[]>([])

  React.useEffect(() => {
    if (modal.item) {
      const stats = modal.item.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }))
      setStats(stats)
    }
  }, [modal])

  return (
    modal.isOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-bold text-gray-900 capitalize">
                    {modal.item?.name.replaceAll('-', ' ')} N.º {pokemonNumber}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal({ ...modal, isOpen: false })}
                  >
                    <span className="text-gray-900 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-auto">
                  <div className='bg-gray-200 rounded-lg flex justify-center items-center'>
                    <Image height={800} width={800} src={modal.item?.picture || '/pokemon_logo1.png'} alt={modal.item?.name || 'Pokemon'} />
                  </div>
                  <div className='mx-5'>
                    <p className='text-black'>{modal.item?.description}</p>
                    <div className='bg-cyan-500 my-5 grid grid-cols-2 gap-x-6 gap-y-6 rounded-lg p-6'>
                      <div>
                        <p className='text-white'>Altura</p>
                        <p className='text-black'>{modal.item!.height / 10} m</p>
                      </div>
                      <div>
                        <p className='text-white'>Peso</p>
                        <p className='text-black'>{modal.item!.weight / 10} kg</p>
                      </div>
                      <div>
                        <p className='text-white'>Movimientos</p>
                        <ul>
                          {modal.item!.moves && modal.item!.moves.map(({move}, i) => {
                            if (i < 2) {
                              const words = move.name.split('-')
                              return <li key={i} className="text-black capitalize">{words.join(" ")}</li>
                            } 
                          })}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <p className='text-black'>Tipo</p>
                      <ul className='flex'>
                        {modal.item!.types && modal.item!.types.map(({type}, i) => {
                          return <li key={i} className="text-white capitalize px-3 py-1 mr-2 my-2 rounded-lg" style={{backgroundColor: TypeColor[type.name]}}>{type.name}</li>
                        })}
                      </ul>
                    </div>
                    <div className='bg-gray-400/40 mt-5 rounded-lg p-5'>
                      <p className='text-black mb-5'>Puntos Base</p>
                      <Chart chartData={stats} color={TypeColor[modal.item!.types && modal.item!.types[0].type.name]} />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-green-600/20 text-green-700 active:bg-green-600/50 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal({ ...modal, isOpen: false })}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null
  )
}
