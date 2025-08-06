const AddressPageOrderSummary = ({ onProceed }: { onProceed: () => void }) => {
  return (
    <div className="lg:w-80 bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h3>

        {/* Price Details Example */}
        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹23,345</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹22,340</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discounts</span>
            <span>-₹440</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span>To be calculated</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-3">
            <span>Total Amount</span>
            <span>₹22,965</span>
          </div>
        </div>

        <button
          onClick={onProceed}
          className="w-full mt-6 bg-pink-700 text-white py-3 rounded-lg font-medium hover:bg-pink-800 transition-colors"
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};
