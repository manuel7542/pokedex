"use client"
import Layout from "@/app/layout";
import Image from "next/image";
import { signIn, getSession, getProviders, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { validations } from '../../../utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
interface ErrorMessage {
  show: boolean, message: string
}
export default function Login() {
  const { data: session } = useSession()
  const router = useRouter();
  if (session && router.isReady) {
    router.push('/')
  }
  const [ showErrorEmail, setShowErrorEmail ] = useState<ErrorMessage>({ show: true, message: '' });
  const [ showErrorPassword, setShowErrorPassword ] = useState<ErrorMessage>({ show: true, message: '' });
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const onLoginUser = async (e: any) => {
    e.preventDefault();
    MySwal.fire({
      title: <p>Verificando...</p>,
      didOpen: () => {
        MySwal.showLoading()
      },
    })
    const verify = await signIn('credentials', { email: email, password: password, redirect: false });
    if (verify && !verify.ok) {
      MySwal.fire({
        title: verify.error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    } else {
      MySwal.fire({
        title: 'Bienvenido Nuevamente!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  const onChangeValue = (value: string, type: string) => {
    let inValid: string | undefined = undefined
    switch (type) {
      case 'email':
        setEmail(value);
        inValid = validations.isEmail(value)
        !inValid ? setShowErrorEmail({ show: false, message: '' }) : setShowErrorEmail({ show: true, message: inValid });
        break;
      case 'password':
        setPassword(value);
        inValid = validations.isPassword(value)
        !inValid ? setShowErrorPassword({ show: false, message: '' }) : setShowErrorPassword({ show: true, message: inValid });
        break;
    }
  }

  const setDefaultUser = () => {
    onChangeValue('pedro.perez@gmail.com', 'email')
    onChangeValue('123456789Test!@', 'password')
  }

  return (
    <Layout>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-200">
        <div className="p-10 rounded-xl shadow-2xl w-1/3 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              priority
              className="mx-auto h-16 w-auto"
              src="/logo.png"
              alt="Your Company"
              width={200}
              height={200}
            />
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inicia sesión en tu cuenta
            </h1>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
            <form className="space-y-6" onSubmitCapture={(e) => onLoginUser(e)}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Correo
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="pedro.perez@gmail.com"
                    value={email}
                    onChange={(e) => onChangeValue(e.target.value, 'email')}
                    className="peer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p id="email-error" className={`${showErrorEmail.show ? 'visible' : 'invisible' } text-red-700 font-light`}>
                    {email.length === 0 ? 'El campo no debe estar vacío' : showErrorEmail.message}
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
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    minLength={8}
                    onChange={(e) => onChangeValue(e.target.value, 'password')}
                    className="peer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p id="password-error" className={`${showErrorPassword.show ? 'visible' : 'invisible' } text-red-700 font-light`}>
                    {password.length === 0 ? 'El campo no debe estar vacío' : password.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : showErrorPassword.message}
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={email.length === 0 || password.length === 0 || showErrorEmail.show || showErrorPassword.show}
                  className="disabled:bg-indigo-300 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar Sesión
                </button>
              </div>
              <div className="text-center mt-6 text-sm font-semibold leading-5 text-indigo-500">
                <a href="#" onClick={setDefaultUser}>Default user</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}