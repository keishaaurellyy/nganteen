import { getServerSession } from "next-auth";
import { OrderData } from "@/app/types/order";
import HistoryCard from "@/components/buyers/history-card";
import { authOptions } from "@/lib/auth-option";
import { Header } from "@/components/input/header";
import NoOrderHistory from "@/components/buyers/no-order-history";

export default async function OrderHistoryPage() {
  const session = await getServerSession(authOptions);
  const buyerId = session?.user?.buyer_id;

  let orders: OrderData[] = [];

  if (buyerId) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const res = await fetch(
      `${baseUrl}/api/orders/buyers/history?buyer_id=${buyerId}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const result = await res.json();
      orders = result.data || [];
    }
  }

  return (
    <div className="w-full max-w-md min-h-screen bg-neutral-100 justify-self-center">
      {/* Header */}
      <Header leftIcon rightIcon="sidebar">
        Order History
      </Header>

      {/* Order History */}
      <main className="px-5 pb-10 flex flex-col items-center">
        {orders.length > 0 ? (
          orders.map((order, idx) => (
            <HistoryCard
              key={idx}
              transactionId={order.transactionId}
              orderDate={order.orderDate}
              items={order.items}
            />
          ))
        ) : (
          <div className="flex flex-1 justify-items-center w-full min-h-[calc(100vh-27vh)]">
            <NoOrderHistory />
          </div>
        )}
      </main>
    </div>
  );
}
