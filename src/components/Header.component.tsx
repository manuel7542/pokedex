'use client'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { data: session, status,  } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              priority
              className="h-8 w-auto"
              src="/logo.png"
              alt=""
              width={250}
              height={250}
            />
          </Link>
        </div>
        <div className="flex ">
          <button
            type="button"
            id='menu'
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog as="div" className="" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-gray-700/30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                priority
                className="h-8 w-auto"
                src="/logo.png"
                alt=""
                width={250}
                height={250}
              />
            </Link>
            <button
              type="button"
              id='menu'
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            {status === 'authenticated' ? (
              <div className='flex flex-col items-center justify-center my-5'>
                <Image
                  className="h-36 w-36 rounded-full ring-2 ring-white"
                  src={(session.user as any).avatar}
                  alt=""
                  width={250}
                  height={250}
                />
                <p className='text-center font-semibold text-xl mt-5 text-black'>{ session.user?.name }</p>
              </div>
            ) : null}
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                {status !== 'authenticated' ? (
                  <Link
                    href="/auth/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Iniciar Sesión
                  </Link>
                ) : (
                  <>
                    <Link href="/me" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Perfil
                    </Link>
                    <Link onClick={() => signOut()} href='#' className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Cerrar sesión
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}