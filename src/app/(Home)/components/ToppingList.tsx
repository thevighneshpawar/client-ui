import React, { useState, useEffect, startTransition } from "react";
import ToppingCard from "./ToppingCard";
import { Topping } from "@/lib/types";
import { useSearchParams } from "next/navigation";

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${
          searchParams.get("restaurantId") as string
        }`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings.data.data);
      console.log("toppings", toppings);
    };
    fetchData();
  }, []);
  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => {
          return (
            <ToppingCard
              topping={topping}
              key={topping._id}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
