'use client';
import React from 'react';
import Button from '../ui/Button';
import { Heart } from 'lucide-react';
import Input from '../ui/Input';
import { useCart } from '@/providers/CartProvider';

const QuickAddCartForm = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { cart, addToCart, loading } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  console.log('cart', cart);
  console.log('loading', loading);

  const handleAddToCart = async (id: string, quantity: number) => {
    await addToCart(id, quantity);
  };
  return (
    <div className="flex items-end space-x-4">
      <div className="w-1/3">
        <label
          htmlFor="quantity"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={10}
        />
      </div>

      <div className="flex w-2/3 gap-3">
        <Button
          className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={loading}
          onClick={() =>
            handleAddToCart(product?.variants?.edges[0].node.id, quantity)
          }
        >
          <span className="block py-1">Add to Cart</span>
        </Button>
        <Button variant="outline" size="icon" className="ml-2">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuickAddCartForm;
