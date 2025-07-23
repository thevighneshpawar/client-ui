import React, { useState, useEffect } from "react";
import ToppingCard from "./ToppingCard";
import { Topping } from "@/lib/types";

const ToppingList = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        // todo: make tenantId dynamic
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=1`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings.data.data);
      console.log("toppings", toppings);
    };
    fetchData();
  }, []);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element._id === topping._id
    );

    if (isAlreadyExists) {
      setSelectedToppings((prev) =>
        prev.filter((elm: Topping) => elm._id !== topping._id)
      );
      return;
    }

    setSelectedToppings((prev: Topping[]) => [...prev, topping]);
  };

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
