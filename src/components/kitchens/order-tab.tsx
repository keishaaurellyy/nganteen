interface OrdersTabProps {
  activeTab: "incoming" | "confirmed";
  setActiveTab: (tab: "incoming" | "confirmed") => void;
}

export function OrdersTab({ activeTab, setActiveTab }: OrdersTabProps) {
  return (
    <div className="w-full flex text-sm">
      <button
        className={`flex-1 p-1.5 text-center border-b-2 transition-colors duration-150 ${
          activeTab === "incoming"
            ? "text-neutral-900 font-extrabold border-neutral-900"
            : "text-neutral-600 font-normal border-neutral-600"
        }`}
        onClick={() => setActiveTab("incoming")}
      >
        Incoming Order
      </button>
      <button
        className={`flex-1 p-1.5 text-center border-b-2 transition-colors duration-150 ${
          activeTab === "confirmed"
            ? "text-neutral-900 font-extrabold border-neutral-900"
            : "text-neutral-600 font-normal border-neutral-600"
        }`}
        onClick={() => setActiveTab("confirmed")}
      >
        Order Confirmed
      </button>
    </div>
  );
}
