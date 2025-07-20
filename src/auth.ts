// auth.ts
import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User, { Theme } from "@/models/User";
import dbConnect from "./db/client";

declare module "next-auth" {
  interface User {
    userName: string;
    role: "user" | "admin";
    theme: Theme;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      userName: string;
      email: string;
      role: "user" | "admin";
      theme: Theme;
      avatar?: string;
    };
  }
}

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        
        if (!user) throw new Error("No user found with this email");
        if (!user.password) throw new Error("This account uses social login");
        
        const isValid = await user.isPasswordMatched(credentials.password as string);
        if (!isValid) throw new Error("Invalid password");
        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          userName: user.userName,
          role: user.role,
          theme: user.theme,
          avatar: user.avatar
        };
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.userName = user.userName;
        token.theme = user.theme;
      }
      
      // Update theme if changed via session update
      if (trigger === "update" && session?.theme) {
        token.theme = session.theme;
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin";
      session.user.userName = token.userName as string;
      session.user.theme = token.theme as Theme;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
});