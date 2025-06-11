"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginBuyer } from "@/app/buyers/mutations/login";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginBuyer, LoginBuyerSchema } from "@/app/schema/buyer";

export default function LoginBuyerPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBuyer>({
    resolver: zodResolver(LoginBuyerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginBuyer) => {
    try {
      const res = await loginBuyer("/api/login", { arg: data });

      if (res.user && res.user.role === "buyer") {
        localStorage.setItem("buyerId", res.user.id);
        router.push("/home");
      } else {
        alert("Login gagal: User tidak ditemukan atau bukan buyer.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.response?.data?.error) {
        alert(`Login gagal: ${err.response.data.error}`);
      } else {
        alert("Login gagal. Periksa email dan password Anda.");
      }
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
          src="/logo/main-logo-n.svg"
          alt="Nganteen Logo"
          width={48}
          height={36}
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[343px] space-y-4 overflow-visible"
      >
        <TextField
          placeholder="University Email"
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
