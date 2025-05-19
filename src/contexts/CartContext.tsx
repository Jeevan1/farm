'use client';
import { createContext } from 'react';
export type CartItem = {
  id: string;
  name?: string;
  price?: number;
  quantity: number;
  variantId?: string;
  image?: string;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (variantId: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  cartId: string | null;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export default CartContext;
