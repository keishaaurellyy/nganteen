"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { EditKitchen, EditKitchenSchema } from "@/app/schema/kitchen";
import { Kitchen, KitchenStatus } from "@/app/types/kitchen";
import { useEffect, useState } from "react";
import { editKitchen } from "@/app/kitchens/mutations/edit";
import ReactSelect from "@/components/input/react-select";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";

export default function EditKitchenPage({ kitchen }: { kitchen: Kitchen }) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditKitchen>({
    resolver: zodResolver(EditKitchenSchema),
  });

  useEffect(() => {
    setMounted(true);
    if (kitchen) {
      reset({
        status: kitchen.status,
        kitchen_email: kitchen.kitchenEmail,
        kitchen_password: kitchen.kitchenPassword,
        kitchen_name: kitchen.kitchenName,
        admin_name: kitchen.adminName,
        admin_phone: kitchen.adminPhone,
        location: kitchen.location,
        kitchen_description: kitchen.kitchenDescription,
      });
    }
  }, [reset, kitchen]);

  const onSubmit = async (data: EditKitchen) => {
    console.log("Form data:", data);
    if (!kitchen?.kitchenId) return;
    try {
      await editKitchen({
        arg: {
          ...data,
          kitchen_id: kitchen.kitchenId,
          id: String(kitchen.kitchenId),
        },
      });
      router.push("/admin");
    } catch (err) {
      console.error("Edit Kitchen Failed:", err);
    }
  };

  const KITCHEN_STATUS = [
    { label: "ACTIVE", value: KitchenStatus.ACTIVE },
    { label: "INACTIVE", value: KitchenStatus.INACTIVE },
  ];

  // Hindari hydration mismatch dengan tidak render form sebelum mount
  if (!mounted) return null;

  return (
    <div className="min-h-screen max-w-md justify-self-center w-full bg-neutral-100 px-5 pt-[44px] pb-10 flex flex-col items-center">
      <h1 className="w-full max-w-[343px] mb-6 text-left text-lg font-bold text-primary-500">
        Edit
        <br />
        <span className="text-neutral-900 font-normal">kitchen account</span>
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[343px] space-y-4 overflow-visible"
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <ReactSelect
              {...field}
              placeholder="Kitchen Status"
              options={KITCHEN_STATUS}
              value={
                KITCHEN_STATUS.find((opt) => opt.value === field.value) ?? null
              }
              onChange={(selected) => field.onChange(selected?.value)}
            />
          )}
        />
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
          placeholder="Kitchen Name"
          type="text"
          {...register("kitchen_name")}
          error={!!errors.kitchen_name}
          helperText={errors.kitchen_name?.message}
          withAsterisk
        />
        <TextField
          placeholder="Admin Name"
          type="text"
          {...register("admin_name")}
          error={!!errors.admin_name}
          helperText={errors.admin_name?.message}
        />
        <TextField
          placeholder="Admin Phone"
          type="tel"
          {...register("admin_phone")}
          error={!!errors.admin_phone}
          helperText={errors.admin_phone?.message}
          withAsterisk
        />
        <TextField
          placeholder="Location"
          type="text"
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
        />
        <TextField
          placeholder="Description"
          type="text"
          {...register("kitchen_description")}
          error={!!errors.kitchen_description}
          helperText={errors.kitchen_description?.message}
        />

        <Button
          type="submit"
          className="flex gap-4 mb-8 justify-start w-full max-w-[343px]"
        >
          Edit Kitchen
        </Button>
      </form>
    </div>
  );
}
