// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "buyer" | "kitchen";
  }

  interface Session {
    user: {
      name: string;
      email: string;
      role: "admin" | "buyer" | "kitchen";
    };
  }

  interface JWT {
    role: "admin" | "buyer" | "kitchen";
  }
}
