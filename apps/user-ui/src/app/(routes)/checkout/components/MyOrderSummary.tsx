import React from "react";
import { Info } from "lucide-react";
interface MyOrderSummaryProps {
  handleNext: () => void;
}

const MyOrderSummary: React.FC<MyOrderSummaryProps> = ({ handleNext }) => {
  const orderItems = [
    {
      id: 1,
      brand: "BEAUTY OF JOSEON",
      name: "Beauty of Joseon Matte Sun Stick Mugwort + Camelia with SPF 50 PA++++",
      size: "120 ML",
      quantity: 1,
      price: 1492,
    },
    {
      id: 2,
      brand: "BEAUTY OF JOSEON",
      name: "Beauty of Joseon Matte Sun Stick Mugwort + Camelia with SPF 50 PA++++",
      size: "120 ML",
      quantity: 1,
      price: 1492,
    },
    {
      id: 3,
      brand: "BEAUTY OF JOSEON",
      name: "Beauty of Joseon Matte Sun Stick Mugwort + Camelia with SPF 50 PA++++",
      size: "120 ML",
      quantity: 1,
      price: 1492,
    },
  ];

  const totalMRP = 23345;
  const sellingPrice = 22340;
  const discount = 440;
  const shippingFee = 50;
  const totalAmount = 21955;

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Order Summary{" "}
          <span className="text-sm font-normal text-gray-500">(7 items)</span>
        </h2>
      </div>

      {/* Order Items */}
      <div className="max-h-80 overflow-y-auto">
        <div className="p-4 space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              {/* Product Image Placeholder */}
              <div className="w-12 h-12 bg-amber-100 rounded flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 bg-amber-200 rounded"></div>
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                  {item.brand}
                </p>
                <p className="text-sm text-gray-900 leading-tight mb-2">
                  {item.name}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{item.size}</span>
                    <span>QTY: {item.quantity}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{item.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Details */}
      <div className="border-t border-gray-200">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Price Details
          </h3>

          <div className="space-y-3">
            {/* Total MRP */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Total MRP</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-sm text-gray-900">
                ₹{totalMRP.toLocaleString()}
              </span>
            </div>

            {/* Selling Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Selling Price of Items
                </span>
              </div>
              <span className="text-sm text-gray-900">
                ₹{sellingPrice.toLocaleString()}
              </span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Discount</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-sm text-green-600">-₹{discount}</span>
            </div>

            {/* Shipping Fee */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Shipping Fee</div>
                <div className="text-xs text-gray-500">(Standard Shipping)</div>
              </div>
              <span className="text-sm text-gray-900">₹{shippingFee}</span>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              Total Amount
            </span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Proceed to Payment Button */}
        <div className="p-4">
          <button
            className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-3 px-4 rounded transition-colors duration-200"
            onClick={handleNext}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrderSummary;
