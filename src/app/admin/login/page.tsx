"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LoginAdmin } from "@/app/schema/admin";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAdmin>();
  const [error, setError] = useState("");

  const router = useRouter();
  const onSubmit = async (data: LoginAdmin) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau password salah.");
    } else {
      router.push("/admin");
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[343px] space-y-4 overflow-visible"
      >
        <TextField
          placeholder="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          withAsterisk
        />

        <TextField
          placeholder="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          withAsterisk
        />

        <Button
          type="submit"
          className="flex gap-4 mb-8 justify-start w-full max-w-[343px]"
        >
          Login
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
