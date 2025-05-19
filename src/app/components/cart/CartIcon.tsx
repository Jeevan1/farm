'use client';
import { useCart } from '@/providers/CartProvider';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import Cart from './Cart';

const CartIcon = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative z-50 w-8 cursor-pointer">
      <ShoppingCart
        className="h-5 w-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {cart.length > 0 && (
        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
          {cart.length}
        </span>
      )}
      {
        // @ts-ignore
        isOpen && <Cart onClose={() => setIsOpen(false)} />
      }
    </div>
  );
};

export default CartIcon;
