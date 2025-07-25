"use client";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
//import { increment } from "@/lib/store/features/cartSlice";

const CartCounter = () => {
  const dispatch = useAppDispatch();
  // const value = useAppSelector((state) => state.cart.value);
  // const handleOnclick = () => {
  //   dispatch(increment());
  // };
  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingBasket className="hover:text-primary" />
      </Link>
      <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
        1
      </span>
      {/* <Button onClick={handleOnclick}>Increment</Button> */}
    </div>
  );
};

export default CartCounter;
