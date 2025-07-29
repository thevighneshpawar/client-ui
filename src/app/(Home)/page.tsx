import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "./components/ProductCard";
import { Suspense } from "react";
import ProductList from "./components/ProductList";

const products: Product[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description:
      "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    image: "/pizza-main.png",
    price: 200,
  },
  {
    id: "2",
    name: "main Pizza",
    description:
      "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    image: "/pizza-main.png",
    price: 200,
  },
  {
    id: "3",
    name: "main Pizza",
    description:
      "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    image: "/pizza-main.png",
    price: 200,
  },
  {
    id: "4",
    name: "main Pizza",
    description:
      "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    image: "/pizza-main.png",
    price: 200,
  },
  {
    id: "5",
    name: "main Pizza",
    description:
      "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    image: "/pizza-main.png",
    price: 200,
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) {
  return (
    <>
      <section className="bg-white ">
        <div className="container px-12 mx-auto flex items-center justify-between py-24">
          <div>
            <h1 className="text-7xl font-black font-sans ">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              src={"/pizza-main.png"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
      <Suspense fallback={"loading........"}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
