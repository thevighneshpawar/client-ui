import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = async ({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) => {
  const [categoryResponse, productsResponse] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
      next: {
        revalidate: 3600, // 1 hour
      },
    }),
    fetch(
      `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=${searchParams.restaurantId}`,
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
                      (product: Product) =>
                        product.category._id === category._id
                    )
                    .map((product: Product) => (
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
  );
};

export default ProductList;
