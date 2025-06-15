// This import is required for module augmentation to work,
// even if it's not used directly in the file.
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "buyer" | "kitchen" | "admin";
      kitchen_id?: string;
      buyer_id?: string;
      kitchen_id?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "buyer" | "kitchen" | "admin";
    kitchen_id?: string;
    buyer_id?: string;
  }

  interface JWT {
    id: string;
    role: "buyer" | "kitchen" | "admin";
    kitchen_id?: string;
    buyer_id?: string;
  }
}
