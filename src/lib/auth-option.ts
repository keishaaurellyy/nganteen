import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/client";
import { buyers, kitchens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { User } from "next-auth";

export const ADMIN_EMAIL = "nganteen.binus@gmail.com";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        // Admin login; the bcrypt hash lives in the ADMIN_PASSWORD_HASH env var
        if (email === ADMIN_EMAIL) {
          const hash = process.env.ADMIN_PASSWORD_HASH;
          if (!hash || !(await bcrypt.compare(password, hash))) return null;
          return {
            id: "admin-id",
            name: "Admin",
            email,
            role: "admin",
          } as User;
        }

        // Buyer login
        const [buyer] = await db
          .select()
          .from(buyers)
          .where(eq(buyers.universityEmail, email));

        if (buyer && (await bcrypt.compare(password, buyer.password))) {
          return {
            id: String(buyer.buyerId),
            name: `${buyer.firstName} ${buyer.lastName ?? ""}`,
            email: buyer.universityEmail,
            role: "buyer",
            buyer_id: String(buyer.buyerId),
          } as User;
        }

        // Kitchen login
        const [kitchen] = await db
          .select()
          .from(kitchens)
          .where(eq(kitchens.kitchenEmail, email));

        if (kitchen && (await bcrypt.compare(password, kitchen.kitchenPassword))) {
          return {
            id: String(kitchen.kitchenId),
            name: kitchen.kitchenName,
            email: kitchen.kitchenEmail,
            role: "kitchen",
            kitchen_id: String(kitchen.kitchenId),
          } as User;
        }

        // Not found
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.buyer_id = (user as any).buyer_id;
        token.kitchen_id = (user as any).kitchen_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).buyer_id = token.buyer_id;
        (session.user as any).kitchen_id = token.kitchen_id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
