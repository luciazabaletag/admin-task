import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import conectarDB from "@/libs/database";
import User from "@/app/models/User";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "user@admintask.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          await conectarDB()

          const userFound = await User.findOne({ email: credentials?.email })
          if (!userFound) throw new Error("Usuario o contraseña inválidos");
          
          const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
          if (!passwordMatch) throw new Error("Usuario o contraseña inválidos");

          return userFound
        }
      })
    ],
    callbacks: {
      jwt({ account, token, user, profile, session}) {
          if (user) token.user = {userId: user.id};
          return token;
      },
      session({ session, token }) {
          session.user = token.user as any
          return session;
      }
    },
    pages: {
      signIn: '/'
    },
    secret: process.env.NEXTAUTH_SECRET as string,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };