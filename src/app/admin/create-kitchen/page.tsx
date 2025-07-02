"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterKitchen, RegisterKitchenSchema } from "@/app/schema/kitchen";
import { registerKitchen } from "@/app/kitchens/mutations/register";
import { KitchenStatus } from "@/app/types/kitchen";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";

export default function RegisterKitchenPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterKitchen>({
    resolver: zodResolver(RegisterKitchenSchema),
    defaultValues: {
      status: KitchenStatus.ACTIVE,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterKitchen) => {
    try {
      const res = await registerKitchen("/api/kitchens", { arg: data });
      console.log("Register Kitchen Success:", res);

      router.push("/admin");
    } catch (err) {
      console.error("Register Kitchen Failed:", err);
    }
  };

  return (
    <div className="min-h-screen max-w-md justify-self-center w-full bg-neutral-100 px-5 pt-[44px] pb-10 flex flex-col items-center">
      <h1 className="w-full max-w-[343px] mb-6 text-left text-lg font-bold text-primary-500">
        Create
        <br />
        <span className="text-neutral-900 font-normal">kitchen account</span>
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[343px] space-y-4 overflow-visible"
        noValidate
      >
        <TextField
          placeholder="Email"
          type="email"
          {...register("kitchen_email")}
          error={!!errors.kitchen_email}
          helperText={errors.kitchen_email?.message}
          withAsterisk
        />

        <TextField
          placeholder="Password"
          type="password"
          {...register("kitchen_password")}
          error={!!errors.kitchen_password}
          helperText={errors.kitchen_password?.message}
          withAsterisk
        />

        <TextField
          {...register("kitchen_name")}
          placeholder="Kitchen Name"
          type="text"
          error={!!errors.kitchen_name}
          helperText={errors.kitchen_name?.message}
          withAsterisk
        />
        <TextField
          {...register("admin_name")}
          placeholder="Admin Name"
          type="text"
          error={!!errors.admin_name}
          helperText={errors.admin_name?.message}
        />
        <TextField
          {...register("admin_phone")}
          placeholder="Admin Phone"
          type="tel"
          error={!!errors.admin_phone}
          helperText={errors.admin_phone?.message}
          withAsterisk
        />
        <TextField
          {...register("location")}
          placeholder="Location"
          type="text"
          error={!!errors.location}
          helperText={errors.location?.message}
        />
        <TextField
          {...register("kitchen_description")}
          placeholder="Description"
          type="text"
          error={!!errors.kitchen_description}
          helperText={errors.kitchen_description?.message}
        />

        <Button
          type="submit"
          className="flex gap-4 mb-8 justify-start w-full max-w-[343px]"
          isLoading={isSubmitting}
        >
          Register Account
        </Button>
      </form>
    </div>
  );
}
