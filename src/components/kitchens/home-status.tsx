import { useSession } from "next-auth/react";
import KitchenStatus from "../input/toggle";
import Spinner from "../input/spinner";

export default function KitchenUpdateStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner size="extraLarge" />;
  }

  const kitchenId = session?.user?.kitchen_id;

  if (!kitchenId) {
    return <p>No kitchen ID found in session</p>;
  }
  return (
    <div className="w-full flex gap-3 items-start">
      <KitchenStatus kitchenId={kitchenId} />
    </div>
  );
}
