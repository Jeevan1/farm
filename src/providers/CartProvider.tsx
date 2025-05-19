'use client';
import CartContext, { CartItem } from '@/contexts/CartContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]); // local cart state
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('cartId');
    if (storedId) {
      setCartId(storedId);
      fetchCart(storedId);
    } else {
      createCart();
    }
  }, []);

  const createCart = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'create' }),
      });
      const json = await res.json();
      const id = json.data.cartCreate.cart.id;
      setCartId(id);
      localStorage.setItem('cartId', id);
      setLoading(false);
    } catch (error) {
      console.error('Error creating cart:', error);
      setLoading(false);
    }
  };

  const fetchCart = async (id: string) => {
    if (!id) return;
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'fetch', cartId: id }),
      });
      const json = await res.json();

      console.log('fetchCart response:', json);
      //   total = json.data.cart.subtotalAmount.amount;
      const total = json.data.cart.cost.subtotalAmount.amount;

      setTotal(total);
      const lines = json.data.cart.lines.edges;
      updateCartFromShopify(lines);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (variantId: string, quantity: number) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'add', cartId, variantId, quantity }),
      });

      const json = await res.json();
      console.log('addToCart response:', json);

      const cart = json?.data?.cartLinesAdd?.cart;
      if (!cart || !cart.lines) {
        console.error('Invalid cart response from Shopify:', json);
        return;
      }

      await fetchCart(cart.id);

      toast.success('Product added to cart successfully');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'edit', cartId, lineId, quantity }),
      });
      const json = await res.json();
      const lines = json.data.cartLinesUpdate.cart.lines.edges;
      //   updateCartFromShopify(lines);
      await fetchCart(cartId);
      toast.success('Cart updated successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
      setLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cartId) return;
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'remove', cartId, lineId }),
      });
      const json = await res.json();
      const lines = json.data.cartLinesRemove.cart.lines.edges;
      //   updateCartFromShopify(lines);
      await fetchCart(cartId);
      toast.success('Product removed from cart successfully');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove product from cart');
    }
  };

  const updateCartFromShopify = (edges: any[]) => {
    const updatedCart = edges.map(({ node }: any) => ({
      ...node,
    }));

    console.log('updatedCart', edges);

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cartId');
    setCartId(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        cartId,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
