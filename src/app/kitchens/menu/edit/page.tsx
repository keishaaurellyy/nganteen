"use client";

import { useState } from "react";
import { Button } from "@/components/input/button";
import { FAB } from "@/components/input/fab";
import { Header } from "@/components/input/header";
import { TextField } from "@/components/input/text-field";
import { Plus, TrashIcon } from "lucide-react";

type Item = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function KitchenEditPage() {
  const [items, setItems] = useState<Item[]>([
    { name: "", description: "", price: 0, stock: 0 },
  ]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { name: "", description: "", price: 0, stock: 0 },
    ]);
  };

  const handleDeleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="w-full max-w-md min-h-screen justify-self-center">
      <Header variant="logo" />
      <div className="flex flex-row justify-between items-center px-3">
        <span className="font-bold text-xl">Items</span>
        <FAB
          onClick={handleAddItem}
          size="medium"
          variant="solid"
          color="warning"
          icon={<Plus />}
        />
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-5 p-3">
          <TextField
            label="Name"
            placeholder="Enter a name for this item."
            type="text"
            value={item.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "name", e.target.value)
            }
          />
          <TextField
            label="Description"
            placeholder="Enter a description for this item."
            type="text"
            value={item.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "description", e.target.value)
            }
          />
          <div className="flex flex-row gap-2">
            <TextField
              label="Price"
              placeholder="0"
              type="number"
              value={item.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "price", Number(e.target.value))
              }
            />
            <TextField
              label="Stock"
              placeholder="0"
              type="number"
              value={item.stock}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "stock", Number(e.target.value))
              }
            />
          </div>
          <Button
            leftIcon={<TrashIcon />}
            variant="outline"
            color="error"
            onClick={() => handleDeleteItem(index)}
            size="medium"
            className="w-fit self-end"
          >
            Delete
          </Button>
          <hr className="border-t border-neutral-300" />
        </div>
      ))}
    </div>
  );
}
