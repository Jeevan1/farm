import { Badge, MapPin } from 'lucide-react';
import React from 'react';
import Button from './Button';

const SellerCard = ({ seller }: { seller: any }) => {
  return (
    <div
      key={seller.id}
      className="flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={seller.image}
          alt={seller.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-lg font-semibold text-gray-800">
          {seller.name}
        </h3>
        <p className="mb-3 flex-1 text-sm text-gray-600">
          {seller.description}
        </p>
        <div className="mb-3 flex flex-wrap gap-1">
          {seller.categories
            .slice(0, 3)
            .map((category: string, index: number) => (
              <span
                className="flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                key={index}
              >
                {category}
              </span>
            ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            {seller.location}
          </div>
          <Button size="sm" className="bg-agro-primary hover:bg-agro-dark">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
