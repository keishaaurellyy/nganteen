"use client";

import { useSession } from "next-auth/react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ExtendedRegisterItemSchema, RegisterItem } from "@/app/schema/item";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import { FAB } from "@/components/input/fab";
import { Plus, TrashIcon } from "lucide-react";
import { Header } from "@/components/input/header";

export default function CreateItemsForm() {
  const { data: session } = useSession();
  const kitchenId = session?.user?.kitchen_id;
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterItem>({
    resolver: zodResolver(ExtendedRegisterItemSchema),
    defaultValues: {
      items: [
        {
          item_name: "",
          item_description: "",
          item_price: 0,
          item_stock: 0,
        },
      ],
    },
  });

  const { fields, prepend, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = async (data: RegisterItem) => {
    if (!kitchenId) return alert("Kitchen ID not found in session");

    const formData = new FormData();
    data.items.forEach((item, index) => {
      formData.append(`items[${index}].item_name`, item.item_name);
      formData.append(
        `items[${index}].item_description`,
        item.item_description ?? ""
      );
      formData.append(`items[${index}].item_price`, item.item_price.toString());
      formData.append(`items[${index}].item_stock`, item.item_stock.toString());
    });

    const res = await fetch(`/api/kitchens/${kitchenId}/items`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const result = await res.json();
      console.error(result);
      return alert(result.error || "Failed to create items");
    }

    router.push("/kitchens/menu");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-self-center"
    >
      <Header
        variant="logo"
        onLeftIconClick={() => {
          router.replace("/kitchens/menu");
        }}
      />
      <div className="w-full flex flex-col px-5 py-2 max-w-md min-h-screen">
        <div className="flex flex-row justify-between items-center">
          <span className="font-bold text-xl">Items</span>
          <FAB
            onClick={() =>
              prepend({
                item_name: "",
                item_description: "",
                item_price: 0,
                item_stock: 0,
              })
            }
            size="medium"
            variant="solid"
            color="warning"
            icon={<Plus />}
            type="button"
          />
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-5 py-5 border-b border-neutral-300"
          >
            <TextField
              label="Name"
              placeholder="Item name"
              type="text"
              {...register(`items.${index}.item_name`)}
              error={!!errors.items?.[index]?.item_name}
              helperText={errors.items?.[index]?.item_name?.message}
            />
            <TextField
              label="Description"
              placeholder="Item description"
              type="text"
              {...register(`items.${index}.item_description`)}
              error={!!errors.items?.[index]?.item_description}
              helperText={errors.items?.[index]?.item_description?.message}
            />
            <div className="flex flex-row gap-2">
              <TextField
                label="Price"
                placeholder="0"
                type="number"
                {...register(`items.${index}.item_price`, {
                  valueAsNumber: true,
                })}
                error={!!errors.items?.[index]?.item_price}
                helperText={errors.items?.[index]?.item_price?.message}
              />
              <TextField
                label="Stock"
                placeholder="0"
                type="number"
                {...register(`items.${index}.item_stock`, {
                  valueAsNumber: true,
                })}
                error={!!errors.items?.[index]?.item_stock}
                helperText={errors.items?.[index]?.item_stock?.message}
              />
            </div>
            <Button
              leftIcon={<TrashIcon />}
              variant="outline"
              color="error"
              onClick={() => remove(index)}
              size="medium"
              type="button"
              className="w-fit self-end"
            >
              Delete
            </Button>
          </div>
        ))}

        <Button
          type="submit"
          variant="solid"
          color="primary"
          className="flex gap-4 my-5 w-full"
          isLoading={isSubmitting}
        >
          Create
        </Button>
      </div>
    </form>
  );
}
