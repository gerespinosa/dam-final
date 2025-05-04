'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

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
  
      console.log(username, password)
      console.log(result);
    }
  
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">enviar</button>
        </form>
      </div>
    );
}
