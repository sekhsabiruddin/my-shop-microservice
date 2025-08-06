"use client";
import React from "react";
import { Trash2 } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  quantity: number;
  image: string;
  variant: string;
};

interface CartItemListProps {
  items: CartItem[];
  onQuantityChange: (id: string, newQty: number) => void;
  onRemove: (id: string) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  items,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="bg-[#f9f6f4] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Bag ({items.length} items)
        </h2>
        <button className="text-sm text-[#773d4c] font-medium flex items-center gap-2 hover:underline">
          ❤ ADD ITEMS FROM YOUR WISHLIST
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-6">
            {/* Product Info */}
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold">
                  {item.name.split(" ")[0]} {/* Brand/First word */}
                </p>
                <p className="text-sm text-gray-900 font-medium">{item.name}</p>
                <p className="text-xs text-[#773d4c] mt-1">{item.variant}</p>
                <div className="mt-2 text-sm">
                  <span className="font-semibold text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="ml-2 line-through text-gray-400">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 text-green-600">
                    ({item.discount} off)
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity + Remove */}
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() =>
                    onQuantityChange(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                >
                  −
                </button>
                <span className="px-4 text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
