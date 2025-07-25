// components/CartCounterWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const CartCounterWithoutSSR = dynamic(() => import("./CartCounter"), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
    </div>
  ),
});

export default CartCounterWithoutSSR;
