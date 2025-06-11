"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterBuyerSchema, RegisterBuyer } from "@/app/schema/buyer";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import { registerBuyer } from "@/app/buyers/mutations/register";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UniversityName } from "@/app/types/buyer";
import ReactSelect from "@/components/input/react-select";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RegisterBuyerPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBuyer>({
    resolver: zodResolver(RegisterBuyerSchema),
    defaultValues: {
      university_name: UniversityName.BINUS_ALAM_SUTERA,
    },
  });

  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);

  const onSubmit = async (data: RegisterBuyer) => {
    try {
      const res = await registerBuyer("/api/buyers", { arg: data });
      console.log("Register Buyer Success:", res);

      if (res?.data?.buyerId) {
        localStorage.setItem("buyer_id", res.data.buyerId);
        router.push("/buyers");
      }

      router.push("/buyers");
    } catch (err) {
      console.error("Register Buyer Failed:", err);
    }
  };

  type Option = { value: string; label: string };

  const UNIVERSITY_NAME: Option[] = [
    { label: "Binus Alam Sutera", value: UniversityName.BINUS_ALAM_SUTERA },
    { label: "Binus Kemanggisan", value: UniversityName.BINUS_KEMANGGISAN },
  ];

  return (
    <div className="min-h-screen max-w-md justify-self-center w-full bg-neutral-100 px-5 pt-[44px] pb-10 flex flex-col items-center">
      <h1 className="w-full max-w-[343px] mb-6 text-left text-lg font-bold text-primary-500">
        Join us
        <span className="text-neutral-900 font-normal">
          &nbsp;by
          <br />
          register your account
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
      >
        <Controller
          name="university_name"
          control={control}
          render={({ field }) => (
            <div>
              {isReady && (
                <ReactSelect
                  {...field}
                  placeholder="Select University"
                  options={UNIVERSITY_NAME}
                  value={
                    UNIVERSITY_NAME.find((opt) => opt.value === field.value) ??
                    null
                  }
                  onChange={(selected) => field.onChange(selected?.value)}
                />
              )}
            </div>
          )}
        />

        <TextField
          placeholder="University Email"
          type="email"
          {...register("university_email")}
          error={!!errors.university_email}
          helperText={errors.university_email?.message}
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

        <TextField
          placeholder="Confirm Password"
          type="password"
          {...register("confirm_password")}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
          withAsterisk
        />

        <TextField
          {...register("first_name")}
          placeholder="First Name"
          type="text"
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          withAsterisk
        />
        <TextField
          {...register("last_name")}
          placeholder="Last Name"
          type="text"
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
        />
        <TextField
          {...register("phone_number")}
          placeholder="Phone Number"
          type="tel"
          error={!!errors.phone_number}
          helperText={errors.phone_number?.message}
          withAsterisk
        />
        <TextField
          {...register("student_id_number")}
          placeholder="Student ID Number"
          type="text"
          error={!!errors.student_id_number}
          helperText={errors.student_id_number?.message}
        />

        <Button
          type="submit"
          className="flex gap-4 mb-8 justify-start w-full max-w-[343px]"
        >
          Register
        </Button>
      </form>

      <div className="flex justify-between text-center pt-4">
        <Link href="/buyers/login">
          <h2 className="text-xs font-normal">
            Already have an account?&ensp;
            <span className="text-primary-500 font-bold">Login</span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
