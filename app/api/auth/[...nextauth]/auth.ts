import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/(database)/db";
import User from "@/app/(auth)/(models)/User";
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await db(); // Asegúrate de ejecutar db()
      
        const user = await User.findOne({ username: credentials?.username });
      
        if (!user) {
          // No existe el usuario
          return null;
        }
      
        const isMatch = await bcrypt.compare(credentials?.password as string, user.password);
      
        if (!isMatch) {
          // Password incorrecto
          return null;
        }
      
        // Si todo va bien, devuelve el usuario
        console.log(user)
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    error: '/error', // Evita el error 405 redirigiendo a una ruta válida
  },
};
