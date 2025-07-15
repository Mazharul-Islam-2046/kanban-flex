import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        // Replace this with your actual DB logic
        if (email === "test@example.com" && password === "password") {
          return { id: "1", name: "Test User", email };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin", // Optional: custom sign-in page
    error: "/auth/error", // Optional: error page
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        if (session.user) {
          session.user.id = typeof token.id === "string" ? token.id : String(token.id);
        }
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
