"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginBuyer, LoginBuyerSchema } from "@/app/schema/buyer";

export default function LoginBuyerPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginBuyer>({
    resolver: zodResolver(LoginBuyerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginBuyer) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log("Login result:", res);

      if (res?.ok && !res.error) {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const role = session?.user?.role;
        const buyerId = session?.user?.buyer_id;

        if (role !== "buyer") {
          router.replace("/unauthorized");
          return;
        }

        if (!buyerId) {
          alert("Invalid buyer session.");
          return;
        }

        localStorage.setItem("buyer_id", buyerId);
        router.replace("/buyers");
      } else {
        alert("Login failed. Please check your email and password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen max-w-md justify-self-center w-full bg-neutral-100 px-5 pt-[44px] pb-10 flex flex-col items-center">
      <h1 className="w-full max-w-[343px] mb-6 text-left text-lg font-bold text-primary-500">
        Sign in
        <span className="text-neutral-900 font-normal">
          &nbsp;to
          <br />
          your existing account
        </span>
      </h1>

      <div className="w-full max-w-[343px] flex justify-center mb-8 pt-12 pb-12">
        <Image
          className="w-[102px] h-[152px]"
          src="/logo/main-logo-N.svg"
          alt="Nganteen Logo"
          width={48}
          height={36}
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[343px] space-y-4 overflow-visible"
        noValidate
      >
        <TextField
          {...register("email")}
          placeholder="University Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          withAsterisk
        />

        <TextField
          {...register("password")}
          placeholder="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          withAsterisk
        />

        <Button
          type="submit"
          className="flex gap-4 mb-8 justify-start w-full max-w-[343px]"
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </form>

      <div className="flex justify-between text-center pt-4">
        <Link href="/buyers/register">
          <h2 className="text-xs font-normal">
            Don’t have an account?&ensp;
            <span className="text-primary-500 font-bold">Register</span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
