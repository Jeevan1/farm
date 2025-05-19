import React from 'react';

import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Button from '../ui/Button';
import Link from 'next/link';
import { useCart } from '@/providers/CartProvider';
import Image from 'next/image';

import { useEffect, useRef } from 'react';

const CartLayout = ({
  onClose,
  children,
}: {
  onClose?: () => void;
  children: React.ReactNode;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll lock
    document.body.classList.add('overflow-hidden');

    // Outside click handler
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up scroll lock and event listener
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div
        ref={panelRef}
        className="h-full w-full max-w-md translate-x-0 transform bg-white shadow-xl transition-transform duration-300"
      >
        {children}
      </div>
    </div>
  );
};

const Cart: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <CartLayout onClose={onClose}>
        <div className="flex h-full w-full flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6 cursor-pointer" />
          </button>
          <div className="flex flex-col items-center justify-center px-4 py-12">
            <ShoppingBag className="mb-4 h-20 w-20 text-gray-300" />
            <h2 className="mb-2 text-xl font-medium text-gray-700">
              Your cart is empty
            </h2>
            <p className="mb-6 text-center text-gray-500">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild onClick={onClose}>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </CartLayout>
    );
  }

  return (
    <CartLayout onClose={onClose}>
      <div className="flex h-full w-full flex-col bg-gray-100">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <h2 className="mb-4 text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6 cursor-pointer" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {cart &&
              cart.map((item: any) => (
                <div
                  key={item?.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={item?.merchandise?.image?.originalSrc}
                      alt={item?.merchandise?.product?.title}
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {item?.merchandise?.product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item?.sku && `SKU: ${item?.sku}`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="py-2"
                      onClick={() =>
                        updateQuantity(item?.id, item?.quantity - 1)
                      }
                      disabled={item?.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2 w-8 text-center">
                      {item?.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="py-2"
                      onClick={() =>
                        updateQuantity(item?.id, item?.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-medium">
                    Rs. {item?.cost?.subtotalAmount.amount}
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="py-2 text-red-500"
                    onClick={() => removeFromCart(item?.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        <div className="border-t bg-gray-50 p-4">
          <div className="mb-4 flex justify-between text-lg font-medium">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </CartLayout>
  );
};

export default Cart;
