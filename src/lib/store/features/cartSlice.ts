import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Product, Topping } from "@/lib/types";
import { hashTheItem } from "@/lib/utils";

export interface CartItem
  extends Pick<Product, "_id" | "name" | "image" | "priceConfiguration"> {
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  qty: number;
  hash?: string;
}

// Define a type for the slice state
interface CartState {
  cartItems: CartItem[]; // Array of cart items
}

// Define the initial state using that type
const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashTheItem(action.payload);

      const newItem = {
        ...action.payload,
        hash: hash,
        // product: action.payload.product,
        // chosenConfiguration: action.payload.chosenConfiguration,
      };

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem])
      );
      return {
        cartItems: [...state.cartItems, newItem],
      };
    },

    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems.push(...action.payload);
    },
  },
});

export const { addToCart, setInitialCartItems } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.cart.value;

export default cartSlice.reducer;
