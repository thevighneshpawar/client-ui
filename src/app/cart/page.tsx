import React from "react";
import CartItems from "./cartItems/CartItems";

const CartPage = () => {
  return (
    <section className=" ">
      <div className="container  px-12 mx-auto my-6 ">
        <h1 className="text-lg font-bold">Shopping cart</h1>
        <div className="bg-white rounded-lg p-6 mt-6">
          <CartItems />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
