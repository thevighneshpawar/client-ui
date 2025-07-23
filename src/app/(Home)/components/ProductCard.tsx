import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

import { Product } from "@/lib/types";
import ProductModal from "./ProductModal";

type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
  return (
    <Card className="border-none rounded-xl ">
      <CardHeader className="flex items-center justify-center">
        <Image
          alt="pizza-image"
          width={150}
          height={150}
          src={product.image}
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-4">
        <p>
          <span>From </span>
          <span className="font-bold">₹200</span>
        </p>

        <ProductModal product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
