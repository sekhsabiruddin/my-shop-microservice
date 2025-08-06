import React from "react";

const OrderSummary = ({ onChooseAddress }: { onChooseAddress: () => void }) => {
  return (
    <div className="lg:w-80">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {/* Header */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Offers & Coupons
          </h3>

          {/* Coupons Section */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <button className="bg-pink-200 text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-pink-300 transition-colors">
              APPLY
            </button>
          </div>

          <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 mb-6">
            <span className="text-sm text-gray-700">
              4 Coupons & Offers available
            </span>
            <span className="text-gray-400 text-lg">›</span>
          </div>

          {/* Gift Option */}
          <div className="flex items-start gap-2 border border-gray-200 rounded-lg p-4 mb-6">
            <input type="checkbox" className="mt-1 w-4 h-4" />
            <p className="text-sm text-gray-700">
              Ordering as a gift? <br />
              <span className="text-xs text-gray-500">
                Get your order gift wrapped for ₹50
              </span>
            </p>
          </div>

          {/* Price Details */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-gray-900">Price Details</h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total MRP</span>
                <span className="text-gray-900">₹23,345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹22,340</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discounts</span>
                <span className="text-green-600">-₹440</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Fee</span>
                <span className="text-gray-500">To be calculated</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span>₹22,965</span>
              </div>
            </div>
          </div>

          {/* Choose Address Button */}
          <button
            className="w-full bg-pink-700 text-white py-3 rounded-lg font-medium hover:bg-pink-800 transition-colors"
            onClick={onChooseAddress}
          >
            CHOOSE ADDRESS
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
