import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User';
import { db } from '@/app/lib/db';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../[...nextauth]/auth';

export async function PATCH(req: NextRequest) {
  await db();
  const body = await req.json();
  const { userId, username, email, password, imgUrl } = body;
  console.log("lo que llega wey", userId, username, imgUrl)

    // Comprobar sesión
    const session = await getServerSession(authConfig);
  const sessionUser = (session?.user ?? {}) as any;
  if (!session || (sessionUser.id !== userId && sessionUser.email !== email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log("Hola soy la session", session.user)

  // Buscar usuario por userId
  if (!userId) {
    return NextResponse.json({ error: 'No se proporcionó userId' }, { status: 400 });
  }
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  // Actualizar los campos proporcionados
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  if (imgUrl) user.imgUrl = imgUrl;

  await user.save();
  console.log("Usuario guardado:", user);

  const updatedSession = await getServerSession(authConfig);
  console.log("🔄 Nueva sesión:", updatedSession?.user);

  return NextResponse.json({ message: 'Usuario actualizado correctamente' });
}