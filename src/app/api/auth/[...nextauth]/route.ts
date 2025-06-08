import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/client";
import { buyers, kitchens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { User } from "next-auth";

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

        // Admin login (hardcoded)
        if (
          email === "nganteen.binus@gmail.com" &&
          password === "nganteenADMIN123"
        ) {
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
          } as User;
        }

        // Kitchen login
        const [kitchen] = await db
          .select()
          .from(kitchens)
          .where(eq(kitchens.kitchenEmail, email));

        if (
          kitchen &&
          (await bcrypt.compare(password, kitchen.kitchenPassword))
        ) {
          return {
            id: String(kitchen.kitchenId),
            name: kitchen.kitchenName,
            email: kitchen.kitchenEmail,
            role: "kitchen",
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
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
