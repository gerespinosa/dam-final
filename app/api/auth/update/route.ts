import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User';
import { db } from '@/app/lib/db';

export async function PATCH(req: NextRequest) {
  await db();
  const body = await req.json();
  const { userId, username, email, password, imgUrl } = body;

  console.log("🧾 PATCH recibido con:", { userId, username, email, imgUrl });

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

  console.log("✅ Usuario actualizado:", user);

  return NextResponse.json({ message: 'Usuario actualizado correctamente' });
}
