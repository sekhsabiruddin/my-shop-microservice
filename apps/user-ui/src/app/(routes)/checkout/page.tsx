"use client";
import React, { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import OrderSummary from "./components/OrderSummary";
import CheckoutStepper from "./components/CheckoutStepper";
import CartItemList from "./components/CartItemList";
import AddressList from "./components/AddressList";
import AddAddressModal from "./components/AddAddressModal";

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

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Beauty of Joseon Relief Sun Rice + Probiotics | Cleanser WEBSITETESTING",
      price: 1502,
      originalPrice: 1669,
      discount: "10%",
      quantity: 1,
      image: "/api/placeholder/60/60",
      variant: "50 ML",
    },
    {
      id: "2",
      name: "Beauty of Joseon Relief Sun Rice Probiotics | Cleanser WEBSITETESTING",
      price: 1502,
      originalPrice: 1669,
      discount: "10%",
      quantity: 1,
      image: "/api/placeholder/60/60",
      variant: "50 ML",
    },
    {
      id: "3",
      name: "The Inkey List Niacinamide & Ceramide Moisturizing Balsam",
      price: 1499,
      originalPrice: 1665,
      discount: "10%",
      quantity: 1,
      image: "/api/placeholder/60/60",
      variant: "MIXED QUANTITIES",
    },
    {
      id: "4",
      name: "MIXSOON Centella Biome Cleansing Oil – Ampoule Foam + Rose + Ampoule + Face Cream",
      price: 1502,
      originalPrice: 1669,
      discount: "10%",
      quantity: 1,
      image: "/api/placeholder/60/60",
      variant: "MIXED QUANTITIES",
    },
  ]);

  const [step, setStep] = useState(0);

  const handleQuantityChange = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutStepper currentStep={step} />

      <div className="max-w-6xl mx-auto px-4 py-8 border border-red-200">
        <div className="flex flex-col lg:flex-row gap-8 ">
          {step == 0 && (
            <>
              <CartItemList
                items={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
              <OrderSummary onChooseAddress={handleNext} />
            </>
          )}
          {step === 1 && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Address Section */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-6">Address</h1>
                <AddressList
                  addresses={[]} // pass actual address list
                  onAddAddress={() => setIsModalOpen(true)}
                />
                <AddAddressModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSave={(newAddress) => {
                    // setAddresses((prev) => [...prev, newAddress]);
                    setIsModalOpen(false);
                  }}
                />
              </div>
              <OrderSummary onChooseAddress={handleNext} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
