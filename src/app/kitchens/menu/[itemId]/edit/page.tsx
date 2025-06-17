"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import { Header } from "@/components/input/header";
import { z } from "zod";

const UpdateItemSchema = z.object({
  itemName: z.string().min(1),
  itemDescription: z.string().nullable(),
  itemPrice: z.number().min(0),
  itemStock: z.number().min(0),
});

type UpdateItem = z.infer<typeof UpdateItemSchema>;

export default function EditItemPage() {
  const { itemId } = useParams() as { itemId: string };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateItem>({
    resolver: zodResolver(UpdateItemSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemPrice: 0,
      itemStock: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!itemId) return;

      const res = await fetch(`/api/items/${itemId}`);
      const data = await res.json();

      reset({
        itemName: data.itemName,
        itemDescription: data.itemDescription,
        itemPrice: data.itemPrice,
        itemStock: data.itemStock,
      });
    };

    fetchData();
  }, [itemId, reset]);

  const onSubmit = async (data: UpdateItem) => {
    const res = await fetch(`/api/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error(result);
      return alert(result.error || "Update failed");
    }

    router.push("/kitchens/menu");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Header
        variant="logo"
        onLeftIconClick={() => {
          router.replace("/kitchens/menu");
        }}
      />
      <div className="w-full flex flex-col px-5 py-2 max-w-md min-h-screen justify-self-center">
        <div className="flex flex-col gap-5 py-5">
          <TextField
            label="Name"
            placeholder="Item name"
            type="text"
            {...register("itemName")}
            error={!!errors.itemName}
            helperText={errors.itemName?.message}
          />
          <TextField
            label="Description"
            placeholder="Item description"
            type="text"
            {...register("itemDescription")}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Price"
              placeholder="0"
              type="number"
              {...register("itemPrice", { valueAsNumber: true })}
              error={!!errors.itemPrice}
              helperText={errors.itemPrice?.message}
            />
            <TextField
              label="Stock"
              placeholder="0"
              type="number"
              {...register("itemStock", { valueAsNumber: true })}
              error={!!errors.itemStock}
              helperText={errors.itemStock?.message}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="solid"
          color="primary"
          className="w-full mt-2"
        >
          Modify
        </Button>
      </div>
    </form>
  );
}
