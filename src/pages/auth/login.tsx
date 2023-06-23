"use client"
import Layout from "@/app/layout";
import Image from "next/image";
import { signIn, getSession, getProviders, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { validations } from '../../../utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

type FormData = {
    email   : string,
    password: string,
};

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter();
  if (session && router.isReady) {
    router.push('/')
  }
  const [ showError, setShowError ] = useState(false);
  const [ email, setEmail ] = useState('pedro.perez@gmail.com');
  const [ password, setPassword ] = useState('123456789@!');

  const onLoginUser = async (e: any) => {
    e.preventDefault();
    await signIn('credentials', { email: email, password: password, redirect: false });
    setShowError(false);
  }
  return (
    <Layout>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-200">
        <div className="py-10 rounded-xl shadow-2xl w-1/3 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              priority
              className="mx-auto h-16 w-auto"
              src="/logo.png"
              alt="Your Company"
              width={200}
              height={200}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inicia sesión en tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmitCapture={(e) => onLoginUser(e)} noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Correo
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="pedro.perez@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="invisible peer-invalid:visible text-red-700 font-light">
                    El formato del correo es incorrecto
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="invisible peer-invalid:visible text-red-700 font-light">
                    El campo no puede estar vacío
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}