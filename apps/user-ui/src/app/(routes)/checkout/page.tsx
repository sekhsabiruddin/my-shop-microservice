"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OrderSummary from "./components/OrderSummary";
import CheckoutStepper from "./components/CheckoutStepper";
import CartItemList from "./components/CartItemList";
import AddressList from "./components/AddressList";
import AddAddressModal from "./components/AddAddressModal";
import MyOrderSummary from "./components/MyOrderSummary";
import MainPaymentComponent from "./components/MainPaymentComponent";
import axiosInstance from "../../utils/axiosinstance";
import loadRazorpayScript from "../../utils/razorpay";

import { toast } from "sonner";

// Types
type Product = {
  id: string;
  title: string;
  salePrice: number;
  regularPrice: number;
  discountPercentage?: number;
  images: { url: string }[];
  category: string;
};

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

type CartApiResponse = {
  cartItems: CartItem[];
  summary: {
    totalItems: number;
    totalAmount: number;
    itemCount: number;
  };
};

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stepParam = parseInt(searchParams.get("step") || "0", 10);
  const [step, setStep] = useState(stepParam);

  // ✅ Fetch Cart (with proper API response parsing)
  const { data, isLoading, isError } = useQuery<CartApiResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart/api/get-all-cart", {
        withCredentials: true,
      });
      return res.data.data;
    },
  });

  const cartItems: CartItem[] = data?.cartItems ?? [];
  const summary = data?.summary;

  // ✅ Mutations
  const increaseMutation = useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.patch(
        "/cart/api/increase-to-cart",
        { productId },
        { withCredentials: true }
      ),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const decreaseMutation = useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.patch(
        "/cart/api/decrease-to-cart",
        { productId },
        { withCredentials: true }
      ),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.delete("/cart/api/remove-to-cart", {
        data: { productId },
        withCredentials: true,
      }),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  // ✅ Quantity Change Handler
  const handleQuantityChange = (id: string, newQty: number) => {
    const item = cartItems.find((item) => item.productId === id);
    if (!item) return;

    if (newQty <= 0) removeMutation.mutate(id);
    else if (newQty > item.quantity) increaseMutation.mutate(id);
    else if (newQty < item.quantity) decreaseMutation.mutate(id);
  };

  const handleRemove = (id: string) => removeMutation.mutate(id);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
  // const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  // const processedToPay = async () => {
  //   const preparedItems = cartItems.map((item) => ({
  //     id: item.product.id,
  //     quantity: item.quantity,
  //     salePrice: item.product.salePrice,
  //   }));
  //   const res = await loadRazorpayScript();
  //   if (!res) {
  //     toast.error("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   try {
  //     const orderRes = await axiosInstance.post("order/api/create-order", {
  //       amount: totalAmount + 50, // shipping included
  //       cartItems: preparedItems, // Pass cart items for validation
  //     });

  //     const orderData = orderRes.data;

  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  //       amount: orderData.amount.toString(),
  //       currency: orderData.currency,
  //       name: "MyShop",
  //       description: "Order Payment",
  //       order_id: orderData.id,
  //       handler: async function (response: any) {
  //         try {
  //           // Verify payment using axiosInstance
  //           const verifyRes = await axiosInstance.post(
  //             "/api/payments/verify-payment",
  //             {
  //               razorpay_order_id: response.razorpay_order_id,
  //               razorpay_payment_id: response.razorpay_payment_id,
  //               razorpay_signature: response.razorpay_signature,
  //               orderId: orderData.orderId, // Our internal order ID
  //             }
  //           );

  //           if (verifyRes.data.success) {
  //             toast.success("Payment successful! 🎉");
  //             // Redirect to success page or clear cart
  //             window.location.href = `/order-success?orderId=${verifyRes.data.orderId}`;
  //           } else {
  //             toast.error("Payment verification failed!");
  //           }
  //         } catch (verifyError) {
  //           console.error("Payment verification error:", verifyError);
  //           toast.error("Payment verification failed. Please contact support.");
  //         }
  //       },
  //       modal: {
  //         ondismiss: function () {
  //           console.log("Payment modal closed by user");
  //           // Handle payment cancellation
  //         },
  //       },
  //       prefill: {
  //         name: "Customer Name", // You can get this from user state
  //         email: "customer@example.com", // You can get this from user state
  //         contact: "9999999999", // You can get this from user state
  //       },
  //       theme: {
  //         color: "#F37254",
  //       },
  //       timeout: 300, // 5 minutes timeout
  //       retry: {
  //         enabled: false, // Disable retry to avoid duplicate orders
  //       },
  //     };

  //     const rzp = new (window as any).Razorpay(options);

  //     // Handle payment failure
  //     rzp.on("payment.failed", function (response: any) {
  //       console.error("Payment failed:", response.error);
  //       toast.error(`Payment failed: ${response.error.description}`);
  //     });

  //     rzp.open();
  //   } catch (error) {
  //     console.error("Error during payment:", error);
  //   }
  // };

  const processedToPay = async () => {
    debugger;
    const preparedItems = cartItems.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
      salePrice: item.product.salePrice,
    }));

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded || !(window as any).Razorpay) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      // ✅ Ensure your API returns { key, order, orderId }
      const { data } = await axiosInstance.post(
        "/order/api/create-order",
        {
          amount: totalAmount + 50,
          cartItems: preparedItems,
        },
        { withCredentials: true }
      );

      const { key, order, orderId } = data; // order is the Razorpay order object
      if (!key || !order?.id) {
        console.error("Invalid order response", data);
        toast.error("Could not start payment.");
        return;
      }

      const rzp = new (window as any).Razorpay({
        key,
        order_id: order.id,
        name: "MyShop",
        description: "Order Payment",
        // amount & currency come from the order; no need to pass them again
        handler: async (response: any) => {
          try {
            const verifyRes = await axiosInstance.post(
              "/order/api/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              },
              { withCredentials: true }
            );

            if (verifyRes.data?.success) {
              toast.success("Payment successful! 🎉");
              window.location.href = `/order-success?orderId=${
                verifyRes.data.orderId ?? orderId
              }`;
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => console.log("Payment modal closed by user"),
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#F37254" },
        timeout: 300, // seconds
        retry: { enabled: false },
      });

      rzp.on("payment.failed", (resp: any) => {
        console.error("Payment failed:", resp?.error);
        toast.error(
          `Payment failed: ${resp?.error?.description ?? "Unknown error"}`
        );
      });

      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Could not initiate payment.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (step === 0) params.append("orderAndReviews", "");
    else if (step === 1) params.append("shippingAndAddress", "");
    else if (step === 2) params.append("payment", "");
    params.set("step", step.toString());
    router.push(`?${params.toString()}`);
  }, [step]);

  // ✅ Totals
  const totalMrp = cartItems.reduce(
    (sum: number, item: CartItem) =>
      sum + item.product.regularPrice * item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (sum: number, item: CartItem) =>
      sum + item.product.salePrice * item.quantity,
    0
  );

  const totalDiscount = totalMrp - totalAmount;

  // ✅ Render
  return (
    <div className="min-h-screen bg-[#F9F6F4]">
      <CheckoutStepper
        currentStep={step}
        onStepClick={(clickedStep) => {
          // Allow backward navigation, block forward
          if (clickedStep <= step) {
            setStep(clickedStep);
          }
        }}
      />

      <div className="max-w-7xl mx-auto py-8 px-4">
        {isLoading ? (
          <p>Loading cart...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load cart.</p>
        ) : (
          <>
            {step === 0 && (
              <div className="flex justify-between gap-6">
                <div className="flex-[7]">
                  <CartItemList
                    items={cartItems.map((item) => ({
                      ...item.product,
                      quantity: item.quantity,
                    }))}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                </div>
                <div className="flex-[4]">
                  <OrderSummary
                    onChooseAddress={handleNext}
                    totalMrp={totalMrp}
                    totalDiscount={totalDiscount}
                    totalAmount={totalAmount}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col lg:flex-row gap-8 w-full">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-6">Address</h1>
                  <AddressList
                    addresses={[]} // Replace with actual address list
                    onAddAddress={() => setIsModalOpen(true)}
                  />
                  <AddAddressModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={() => setIsModalOpen(false)}
                  />
                </div>
                <MyOrderSummary
                  cartItems={cartItems.map((item) => ({
                    ...item.product,
                    quantity: item.quantity,
                  }))}
                  totalMRP={totalMrp}
                  totalAmount={totalAmount}
                  discount={totalDiscount}
                  handleNext={handleNext}
                  processedToPay={processedToPay}
                />
              </div>
            )}

            {step === 2 && (
              <div className="w-full">
                <MainPaymentComponent />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
