"use client";
import { useRouter } from "next/navigation";
import { instance } from "@/app/lib/axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import bcrypt from "bcryptjs";

import NewCategoryButton from "./(components)/NewCategoryButton";
import { dateAdapter } from "@/app/adapters/dateAdapter";

const page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const { data: session } = useSession();

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedFields: { [key: string]: string } = {};
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (imgUrl) updatedFields.imgUrl = imgUrl;

    // Si se quiere cambiar la contraseña
    if (password && nuevoPassword) {
      // Verificar la contraseña actual con el backend
      try {
        const verify = await instance.post("/api/auth/verify-password", {
          password,
        });
        if (verify.data.valid) {
          // Si coincide, hasheamos la nueva contraseña
          const hashed = await bcrypt.hash(nuevoPassword, 12);
          updatedFields.password = hashed;
        } else {
          setError("La contraseña actual no es correcta");
          return;
        }
      } catch (err) {
        setError("Error verificando la contraseña actual");
        return;
      }
    }

    console.log("🧾 Enviando PATCH:", updatedFields);

    let userId = (session?.user as any)?.id;
    if (!userId && session?.user?.email) {
      // Si no hay id, intentar obtenerlo por email
      try {
        const res = await instance.post("/auth/get-user-id", {
          email: session.user.email,
        });
        userId = res.data.userId;
      } catch {
        setError("No se pudo obtener el id del usuario.");
        return;
      }
    }
    if (!userId) {
      setError("No se pudo obtener el id del usuario.");
      return;
    }
    try {
      const response = await instance.patch("auth/update", {
        userId,
        ...updatedFields,
      });
      if (response.status === 200) {
        router.refresh();
        router.push("/");
      } else {
        setError("Error al actualizar usuario");
      }
    } catch (err) {
      console.error(err);
      setError("Error al actualizar usuario");
    }
  }

  return (
    <div className="h-full max-h-[100vh] flex gap-4 w-full space-y-4  p-4">
      {/* Parte izquierda */}
      <div className="w-full flex flex-col items-start gap-4">
        {/* New category */}
        <div className="flex flex-col gap2 w-fit">
          <h3 className="text-2xl font-semibold">Nueva Categoría</h3>
          <NewCategoryButton />
        </div>

        {/* User data */}
        <div className="w-1/2 h-fit p-4 rounded-md border-2 border-blue-400 gap-4">
          <h3 className="text-2xl font-semibold">Modificar usuario</h3>
          <form
            className="flex flex-col items-start gap-2 justify-between w-full"
            onSubmit={handleSubmit}
          >
            <label className="self-start">Username</label>
            <input
              className="rounded-md outline-none border-2 border-blue-400 p-2 w-full "
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="self-start">eMail</label>
            <input
              className="rounded-md outline-none border-2 border-blue-400 p-2 w-full "
              type="email"
              placeholder="eMail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="self-start">Contraseña actual</label>
            <input
              className="rounded-md outline-none border-2 border-blue-400 p-2 w-full"
              type="password"
              placeholder="Contraseña actual"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Nueva contraseña */}
            <label className="self-start">Nueva contraseña</label>
            <input
              className="rounded-md outline-none border-2 border-blue-400 p-2 w-full"
              type="password"
              placeholder="Nueva contraseña"
              value={nuevoPassword}
              onChange={(e) => setNuevoPassword(e.target.value)}
            />
            {/* Imagen de perfil */}
            <label className="self-start">URL de imagen de perfil</label>
            <input
              className="rounded-md outline-none border-2 border-blue-400 p-2 w-full"
              type="text"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            {/* Botón del form */}
            <button
              className="min-w-[200px]  max-w-[200px] p-4 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white text-black"
              type="submit"
            >
              Modificar
            </button>
          </form>
        </div>
      </div>

      {/* Parte derecha */}
      <div className="w-1/2 border rounded-md p-4 shadow-md bg-white space-y-2">
        <img
          src={session?.user?.imgUrl}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <div className="text-center">
          <p className="font-semibold">{session?.user.username}</p>
          <p className="text-sm text-gray-500">ID: {session?.user.id}</p>
          <p className="text-sm text-gray-500">
            {/* Unid@ el {dateAdapter(session?.user.createdAt)} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
