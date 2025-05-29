'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUpForm = () => {

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState('');
      
        const router = useRouter()

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });

  if(response.ok){
    router.push("/")
  } else {
    router.push("/signup")
  }
}

  return (
      <div className="flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
            type="email"
            placeholder="eMail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Registrarse
          </button>
        </form>
    </div>
  )
}

export default SignUpForm
