import { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
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
        console.log("Hola soy el user que buscas", user)
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          imgUrl: user.imgUrl
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name,
          email: profile.email,
          imgUrl: profile.imgUrl,
          username: profile.name,
        };
      },
    }),
  ],
  pages: {
    error: '/error', // Evita el error 405 redirigiendo a una ruta válida
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? user.name ?? null;
        token.email = user.email;
        token.imgUrl = user.imgUrl || user.picture
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        username: token.username,
        email: token.email,
        name: token.username,
        imgUrl: token.imgUrl,
      };
      return session;
    },
  },
};
