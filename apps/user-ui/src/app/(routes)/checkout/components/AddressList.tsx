"use client";
import React from "react";
import { Plus } from "lucide-react";

type AddressListProps = {
  addresses: any[];
  onAddAddress: () => void;
};

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onAddAddress,
}) => {
  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <img src="/empty-address.svg" alt="No address" className="w-32 mb-4" />
        <p className="text-gray-600 text-sm mb-4">
          You do not have any saved addresses. Add an address to continue
        </p>
        <button
          onClick={onAddAddress}
          className="flex items-center gap-2 border border-[#6b2c3a] text-[#6b2c3a] px-4 py-2 rounded hover:bg-[#6b2c3a] hover:text-white transition"
        >
          <Plus size={16} /> Add Address
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Address</h2>
      {/* Map through addresses */}
      {addresses.map((address, i) => (
        <div key={i} className="border border-gray-200 rounded p-4 mb-4">
          <p className="font-medium">{address.name}</p>
          <p className="text-sm text-gray-600">{address.street}</p>
          <p className="text-sm text-gray-600">
            {address.city}, {address.postalCode}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
