"use client";

import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import { EditKitchen, EditKitchenSchema } from "@/app/schema/kitchen";
import { KitchenStatus } from "@/app/types/kitchen";
import ReactSelect from "@/components/input/react-select";

export default function EditKitchenPage() {
  const { kitchenId } = useParams() as { kitchenId: string };
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditKitchen>({
    resolver: zodResolver(EditKitchenSchema),
    defaultValues: {
      status: KitchenStatus.ACTIVE,
      kitchen_email: "",
      kitchen_password: "",
      kitchen_name: "",
      kitchen_description: "",
      admin_name: "",
      admin_phone: "",
      location: "",
    },
  });

  const KITCHEN_STATUS = useMemo<{ label: string; value: KitchenStatus }[]>(
    () => [
      { label: "ACTIVE", value: KitchenStatus.ACTIVE },
      { label: "INACTIVE", value: KitchenStatus.INACTIVE },
    ],
    []
  );

  const [statusValue, setStatusValue] = useState<{
    label: string;
    value: KitchenStatus;
  }>(KITCHEN_STATUS[0]);

  useEffect(() => {
    const fetchData = async () => {
      if (!kitchenId) return;

      const res = await fetch(`/api/kitchens/${kitchenId}`);
      const data = await res.json();

      reset({
        status: data.status,
        kitchen_email: data.kitchenEmail,
        kitchen_password: data.kitchenPassword,
        kitchen_name: data.kitchenName,
        kitchen_description: data.kitchenDescription ?? "",
        admin_name: data.adminName,
        admin_phone: data.adminPhone,
        location: data.location,
      });

      setStatusValue(
        KITCHEN_STATUS.find((opt) => opt.value === data.status) ??
          KITCHEN_STATUS[0]
      );
    };

    fetchData();
    setIsReady(true);
  }, [kitchenId, reset, KITCHEN_STATUS]);

  const onSubmit = async (data: EditKitchen) => {
    console.log(data);
    const res = await fetch(`/api/kitchens/${kitchenId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error(result);
      return alert(result.error || "Update failed");
    }

    router.push("/admin");
  };

  const onError = (errors: any) => {
    console.warn("Form errors:", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col">
      <div className="min-h-screen max-w-md justify-self-center w-full bg-neutral-100 px-5 pt-[44px] pb-10 flex flex-col items-center">
        <h1 className="w-full max-w-[343px] mb-6 text-left text-lg font-bold text-primary-500">
          Edit
          <br />
          <span className="text-neutral-900 font-normal">kitchen account</span>
        </h1>

        <div className="w-full max-w-[343px] space-y-4 overflow-visible">
          {isReady && (
            <ReactSelect
              value={statusValue}
              onChange={(selected) => {
                const option =
                  (selected as { label: string; value: KitchenStatus }) ??
                  KITCHEN_STATUS[0];
                setStatusValue(option);
                setValue("status", option.value);
              }}
              options={KITCHEN_STATUS}
              placeholder="Kitchen Status"
            />
          )}

          <TextField
            placeholder="Kitchen Email"
            type="email"
            {...register("kitchen_email")}
            error={!!errors.kitchen_email}
            helperText={errors.kitchen_email?.message}
          />
          <TextField
            placeholder="Kitchen Password"
            type="password"
            {...register("kitchen_password")}
            error={!!errors.kitchen_password}
            helperText={errors.kitchen_password?.message}
          />
          <TextField
            placeholder="Kitchen Name"
            type="text"
            {...register("kitchen_name")}
            error={!!errors.kitchen_name}
            helperText={errors.kitchen_name?.message}
          />
          <TextField
            placeholder="Admin Name"
            type="text"
            {...register("admin_name")}
          />
          <TextField
            placeholder="Admin Phone"
            type="tel"
            {...register("admin_phone")}
            error={!!errors.admin_phone}
            helperText={errors.admin_phone?.message}
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
            variant="solid"
            color="primary"
            className="flex gap-4 mb-8 justify-start w-full max-w-[343px]"
          >
            Edit Kitchen
          </Button>
        </div>
      </div>
    </form>
  );
}
