import NextAuth from "next-auth/next";
import React from "react";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";


export async function getUser(email) {
  try {
    const user = await sql`SELECT * FROM user WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user", error);
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parseCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parseCredentials.success) {
          const { email, password } = parseCredentials.data;
          const user = await getSupportedBrowsers(email);
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
