'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";


export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const router = useRouter()
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
  
      // Si el result.error === null, es decir, el login es correcto, entonces ruteamos al dashboard
      if (result?.error === null) {
        router.push('/dashboard')
      } else {
        // Si el login no es correcto, entonces devolvemos una página de error
        alert("Contraseña incorrecta")
      }
    }

    async function handleGoogleLogin() {
      const result =  await signIn('google', {
        callbackUrl: ("/dashboard")
      })


    }
  
    return (
      <div className="flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          {/* Username y password */}
        <form className='flex flex-col space-y-4 h-fit items-center justify-center' onSubmit={handleSubmit}>
          <input
          className='rounded-md outline-none border-2 border-blue-400 p-2'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
                    className='rounded-md outline-none border-2 border-blue-400 p-2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Botón del form */}
          <button 
          className='min-w-[200px] p-4 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white text-black'
          type="submit">
            Login
          </button>
        </form>

        {/* Google  */}
          <button onClick={handleGoogleLogin} className='flex space-x-1 min-w-[200px]  items-center rounded-md border-2 p-4 border-blue-400 hover:bg-blue-400 hover:text-white'>
            <FaGoogle  />
            <p>Accede con Google</p>
          </button>
      </div>
    );
}
