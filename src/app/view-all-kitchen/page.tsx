import { Header } from "@/components/header";
import CardKitchen from "./components/card-kitchen";

export default function ViewAllKitchenPage() {
  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header leftIcon rightIcon="sidebar">
        Pick Kitchen
      </Header>
      
      <main className="px-5 pt-4 pb-10">
        <div
          className="grid justify-items-center gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          }}
        >
          <CardKitchen name="Dapur Penyet" description="Indonesian Spicy Dish"/>
          <CardKitchen name="Dapur Nietta" description="Mozarella fried chicken, smashed"/>
          <CardKitchen name="Es Coklat Impian" description="Choco Drink" />
          <CardKitchen name="Good Waffle" description="Filled Waffle" />
          <CardKitchen name="Koffielogik" description="Coffee, Tea, Drinks" />
          <CardKitchen name="Nara Kitchen" description="Comfort Food" />
          <CardKitchen name="Rocky" description="Fried Chicken" />
          <CardKitchen name="Teh Poci" description="Tea, Flavored Tea" />
        </div>
      </main>
    </div>
  );
}
