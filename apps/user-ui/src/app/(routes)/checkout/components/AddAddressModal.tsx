"use client";
import React, { useState } from "react";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: any) => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    pincode: "",
    city: "",
    state: "",
    address: "",
    locality: "",
    type: "Home",
    name: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Add an Address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-sm font-medium">Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium">City/District *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Locality/Town *</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Address Type */}
          <div>
            <label className="text-sm font-medium">Save Address as</label>
            <div className="flex gap-2 mt-1">
              {["Home", "Office", "Others"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-4 py-2 rounded border ${
                    formData.type === type
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, type }))}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mobile No *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full bg-pink-700 text-white py-3 rounded-lg font-medium hover:bg-pink-800 transition"
          >
            ADD ADDRESS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
