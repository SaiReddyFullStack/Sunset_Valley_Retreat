
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/utils/models/User";
import { DBConnection } from "@/app/utils/config/db";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      async authorize(credentials) {
        await DBConnection();

        const user = await User.findOne({
          email: credentials?.email,
        });

        if (!user) return null;

        if (credentials?.password !== user.password) return null;

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});