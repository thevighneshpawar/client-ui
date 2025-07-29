import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cartSlice";
import CryptoJs from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheItem(payload: CartItem): string {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });

  const hash = CryptoJs.SHA256(jsonString).toString();

  return hash;
}
