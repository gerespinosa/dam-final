import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User';
import { db } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await db();
  const { password, email, username } = await req.json();

  // Buscar usuario por email o username (ajusta según tu lógica de login)
  const user = await User.findOne(email ? { email } : { username });
  if (!user) {
    return NextResponse.json({ valid: false, error: 'Usuario no encontrado' }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);
  return NextResponse.json({ valid });
}
