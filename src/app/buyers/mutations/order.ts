import { CreateOrder } from "@/app/schema/order-item";

export async function createOrder(buyerId: number, payload: CreateOrder) {
  try {
    const res = await fetch(`/api/buyers/${buyerId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Order creation failed:", result);
      throw new Error(result.error || "Failed to create order");
    }

    return result.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
