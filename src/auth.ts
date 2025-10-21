// auth.ts
import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User, { Theme } from "@/models/User";
import dbConnect from "./lib/client";

declare module "next-auth" {
  interface User {
    userName: string | null;
    role: "user" | "admin";
    theme: Theme;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      userName: string | null;
      email: string;
      role: "user" | "admin";
      theme: Theme;
      avatar?: string;
      isProfileComplete: boolean;
    };
  }
}

// Environment variable checks
if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
if (!process.env.AUTH_GOOGLE_ID) throw new Error("Missing AUTH_GOOGLE_ID");
if (!process.env.AUTH_GOOGLE_SECRET) throw new Error("Missing AUTH_GOOGLE_SECRET");
if (!process.env.AUTH_SECRET) throw new Error("Missing AUTH_SECRET");

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          
          await dbConnect();
          const user = await User.findOne({ email: credentials.email }).select("+password");
          
          if (!user) {
            console.log("No user found with email:", credentials.email);
            throw new Error("No account found with this email address.");
          }
          
          if (!user.password) {
            console.log("User exists but has no password (social login)");
            throw new Error("This account was created with social login. Please sign in with Google instead.");
          }
          
          const isValid = await user.isPasswordMatched(credentials.password as string);
          if (!isValid) {
            console.log("Invalid password for user:", credentials.email);
            throw new Error("Invalid password. Please try again.");
          }
          
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            userName: user.userName,
            role: user.role,
            theme: user.theme,
            avatar: user.avatar
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
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
      try {
        // Get fresh user data from database
        await dbConnect();
        const user = await User.findById(token.sub);
        
        if (user) {
          session.user.id = user._id.toString();
          session.user.role = user.role;
          session.user.userName = user.userName || null; // null if incomplete
          session.user.theme = user.theme;
          session.user.avatar = user.avatar;
          
          // Add a flag to indicate if user profile is complete
          session.user.isProfileComplete = !!user.userName;
        } else {
          // Fallback to token data
          session.user.id = token.sub as string;
          session.user.role = token.role as "user" | "admin";
          session.user.userName = token.userName as string;
          session.user.theme = token.theme as Theme;
          session.user.isProfileComplete = !!token.userName;
        }
        
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        // Fallback to token data
        session.user.id = token.sub as string;
        session.user.role = token.role as "user" | "admin";
        session.user.userName = token.userName as string;
        session.user.theme = token.theme as Theme;
        session.user.isProfileComplete = !!token.userName;
        return session;
      }
    },
    async signIn({ user, account, profile }) {
      // Handle OAuth sign-in
      if (account?.provider === "google") {
        try {
          await dbConnect();
          
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser) {
            // User exists, check if they have required fields
            if (!existingUser.userName) {
              // User exists but is incomplete (missing userName)
              // We'll handle this in the session callback
              console.log("Incomplete OAuth user found:", existingUser.email);
            }
            return true;
          } else {
            // New OAuth user - create with minimal data
            const newUser = new User({
              name: user.name || profile?.name || "Unknown User",
              email: user.email,
              avatar: user.image || profile?.picture,
              emailVerified: new Date(),
              role: "user",
              theme: Theme.LIGHT,
              // userName will be null initially - user needs to complete profile
            });
            
            await newUser.save();
            console.log("New OAuth user created:", user.email);
            return true;
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    }
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
});