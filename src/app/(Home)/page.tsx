import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/ProductCard";
import { Category } from "@/lib/types";

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

export default async function Home() {
  const [categoryResponse, productsResponse] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
      next: {
        revalidate: 3600, // 1 hour
      },
    }),
    fetch(
      `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=1`,
      {
        next: {
          revalidate: 3600, // 1 hour
        },
      }
    ),
  ]);

  // Check if both requests were successful
  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  if (!productsResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  // Parse responses concurrently
  const [categories, products1] = await Promise.all([
    categoryResponse.json() as Promise<Category[]>,
    productsResponse.json() as Promise<{ data: Product[] }>,
  ]);

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
      <section>
        <div className="container px-12 mx-auto py-12">
          <Tabs
            defaultValue={categories[0]?._id}
            className="w-full"
          >
            <TabsList>
              {categories.map((category) => {
                return (
                  <TabsTrigger
                    key={category._id}
                    value={category._id}
                    className="text-md"
                  >
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => {
              return (
                <TabsContent
                  key={category._id}
                  value={category._id}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products1.data.data
                      .filter(
                        (product) => product.category._id === category._id
                      )
                      .map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                        />
                      ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </>
  );
}
