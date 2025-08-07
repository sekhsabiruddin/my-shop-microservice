// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// // import OrderSummary from "./components/OrderSummary";
// // import CheckoutStepper from "./components/CheckoutStepper";
// // import CartItemList from "./components/CartItemList";
// // import AddressList from "./components/AddressList";
// // import AddAddressModal from "./components/AddAddressModal";
// // import MyOrderSummary from "./components/MyOrderSummary";
// // import MainPaymentComponent from "./components/MainPaymentComponent";
// // import axiosInstance from "../../utils/axiosinstance";

// // // Types
// // type Product = {
// //   id: string;
// //   title: string;
// //   salePrice: number;
// //   regularPrice: number;
// //   discountPercentage?: number;
// //   images: { url: string }[];
// //   category: string;
// // };

// // type CartItem = {
// //   id: string;
// //   productId: string;
// //   quantity: number;
// //   product: Product;
// // };

// // const Page: React.FC = () => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const queryClient = useQueryClient();
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const stepParam = parseInt(searchParams.get("step") || "0", 10);
// //   const [step, setStep] = useState(stepParam);

// //   // ✅ 1. Fetch Cart
// //   const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
// //     queryKey: ["cart"],
// //     queryFn: async () => {
// //       const res = await axiosInstance.get("/cart/api/get-all-cart", {
// //         withCredentials: true,
// //       });
// //       return res.data;
// //     },
// //   });

// //   // ✅ 2. Mutations for increase/decrease/remove
// //   const increaseMutation = useMutation({
// //     mutationFn: (productId: string) =>
// //       axiosInstance.patch(
// //         "/cart/api/increase-to-cart",
// //         { productId },
// //         { withCredentials: true }
// //       ),
// //     onSuccess: () => queryClient.invalidateQueries(["cart"]),
// //   });

// //   const decreaseMutation = useMutation({
// //     mutationFn: (productId: string) =>
// //       axiosInstance.patch(
// //         "/cart/api/decrease-to-cart",
// //         { productId },
// //         { withCredentials: true }
// //       ),
// //     onSuccess: () => queryClient.invalidateQueries(["cart"]),
// //   });

// //   const removeMutation = useMutation({
// //     mutationFn: (productId: string) =>
// //       axiosInstance.delete("/cart/api/remove-to-cart", {
// //         data: { productId },
// //         withCredentials: true,
// //       }),
// //     onSuccess: () => queryClient.invalidateQueries(["cart"]),
// //   });

// //   // ✅ 3. Quantity handlers
// //   const handleQuantityChange = (id: string, newQty: number) => {
// //     const item = cartItems.find((item) => item.productId === id);
// //     if (!item) return;

// //     if (newQty <= 0) {
// //       removeMutation.mutate(id);
// //     } else if (newQty > item.quantity) {
// //       increaseMutation.mutate(id);
// //     } else if (newQty < item.quantity) {
// //       decreaseMutation.mutate(id);
// //     }
// //   };

// //   const handleRemove = (id: string) => {
// //     removeMutation.mutate(id);
// //   };

// //   // ✅ 4. Stepper
// //   const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
// //   const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

// //   useEffect(() => {
// //     const params = new URLSearchParams();
// //     if (step === 0) params.append("orderAndReviews", "");
// //     else if (step === 1) params.append("shippingAndAddress", "");
// //     else if (step === 2) params.append("payment", "");

// //     params.set("step", step.toString());
// //     router.push(`?${params.toString()}`);
// //   }, [step]);

// //   const totalMrp = cartItems.reduce(
// //     (sum, item) => sum + item.product.regularPrice * item.quantity,
// //     0
// //   );

// //   const totalAmount = cartItems.reduce(
// //     (sum, item) => sum + item.product.salePrice * item.quantity,
// //     0
// //   );

// //   const totalDiscount = totalMrp - totalAmount;

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <CheckoutStepper currentStep={step} />

// //       <div className="max-w-6xl mx-auto px-4 py-8 border border-red-200">
// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {step === 0 && (
// //             <>
// //               <CartItemList
// //                 items={cartItems.map((item) => ({
// //                   ...item.product,
// //                   quantity: item.quantity,
// //                 }))}
// //                 onQuantityChange={handleQuantityChange}
// //                 onRemove={handleRemove}
// //               />
// //               <OrderSummary
// //                 onChooseAddress={handleNext}
// //                 totalMrp={totalMrp}
// //                 totalDiscount={totalDiscount}
// //                 totalAmount={totalAmount}
// //               />
// //             </>
// //           )}

// //           {step === 1 && (
// //             <div className="flex flex-col lg:flex-row gap-8 w-full">
// //               <div className="flex-1">
// //                 <h1 className="text-2xl font-bold mb-6">Address</h1>
// //                 <AddressList
// //                   addresses={[]} // Add address list here
// //                   onAddAddress={() => setIsModalOpen(true)}
// //                 />
// //                 <AddAddressModal
// //                   isOpen={isModalOpen}
// //                   onClose={() => setIsModalOpen(false)}
// //                   onSave={(newAddress) => {
// //                     // Save address
// //                     setIsModalOpen(false);
// //                   }}
// //                 />
// //               </div>
// //               <MyOrderSummary handleNext={handleNext} />
// //             </div>
// //           )}

// //           {step === 2 && (
// //             <div className="w-full">
// //               <MainPaymentComponent />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import OrderSummary from "./components/OrderSummary";
// import CheckoutStepper from "./components/CheckoutStepper";
// import CartItemList from "./components/CartItemList";
// import AddressList from "./components/AddressList";
// import AddAddressModal from "./components/AddAddressModal";
// import MyOrderSummary from "./components/MyOrderSummary";
// import MainPaymentComponent from "./components/MainPaymentComponent";
// import axiosInstance from "../../utils/axiosinstance";

// // Types
// type Product = {
//   id: string;
//   title: string;
//   salePrice: number;
//   regularPrice: number;
//   discountPercentage?: number;
//   images: { url: string }[];
//   category: string;
//   quantity?: number; // required for UI mapping
// };

// type CartItem = {
//   id: string;
//   productId: string;
//   quantity: number;
//   product: Product;
// };

// const Page: React.FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const queryClient = useQueryClient();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const stepParam = parseInt(searchParams.get("step") || "0", 10);
//   const [step, setStep] = useState(stepParam);

//   // ✅ Fetch Cart
//   const {
//     data: cartItems = [],
//     isLoading,
//     isError,
//   } = useQuery<CartItem[]>({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/cart/api/get-all-cart", {
//         withCredentials: true,
//       });
//       return res.data;
//     },
//   });

//   // ✅ Mutations
//   const increaseMutation = useMutation({
//     mutationFn: (productId: string) =>
//       axiosInstance.patch(
//         "/cart/api/increase-to-cart",
//         { productId },
//         { withCredentials: true }
//       ),
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   const decreaseMutation = useMutation({
//     mutationFn: (productId: string) =>
//       axiosInstance.patch(
//         "/cart/api/decrease-to-cart",
//         { productId },
//         { withCredentials: true }
//       ),
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   const removeMutation = useMutation({
//     mutationFn: (productId: string) =>
//       axiosInstance.delete("/cart/api/remove-to-cart", {
//         data: { productId },
//         withCredentials: true,
//       }),
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   // ✅ Quantity Change Handler
//   const handleQuantityChange = (id: string, newQty: number) => {
//     const item = cartItems.find((item) => item.productId === id);
//     if (!item) return;

//     if (newQty <= 0) removeMutation.mutate(id);
//     else if (newQty > item.quantity) increaseMutation.mutate(id);
//     else if (newQty < item.quantity) decreaseMutation.mutate(id);
//   };

//   const handleRemove = (id: string) => removeMutation.mutate(id);

//   const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
//   const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

//   useEffect(() => {
//     const params = new URLSearchParams();
//     if (step === 0) params.append("orderAndReviews", "");
//     else if (step === 1) params.append("shippingAndAddress", "");
//     else if (step === 2) params.append("payment", "");
//     params.set("step", step.toString());
//     router.push(`?${params.toString()}`);
//   }, [step]);

//   // ✅ Totals
//   const totalMrp = cartItems.reduce(
//     (sum, item) => sum + item.product.regularPrice * item.quantity,
//     0
//   );
//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.product.salePrice * item.quantity,
//     0
//   );
//   const totalDiscount = totalMrp - totalAmount;

//   // ✅ Render
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <CheckoutStepper currentStep={step} />

//       <div className="max-w-6xl mx-auto px-4 py-8 border border-red-200">
//         <div className="flex flex-col lg:flex-row gap-8 border border-green-700">
//           {isLoading ? (
//             <p>Loading cart...</p>
//           ) : isError ? (
//             <p className="text-red-500">Failed to load cart.</p>
//           ) : (
//             step === 0 && (
//               <>
//                 <div className="min-w-[80%]">
//                   <CartItemList
//                     items={cartItems.map((item) => ({
//                       ...item.product,
//                       quantity: item.quantity,
//                     }))}
//                     onQuantityChange={handleQuantityChange}
//                     onRemove={handleRemove}
//                   />
//                 </div>
//                 <div className="w-[20%]">
//                   <OrderSummary
//                     onChooseAddress={handleNext}
//                     totalMrp={totalMrp}
//                     totalDiscount={totalDiscount}
//                     totalAmount={totalAmount}
//                   />
//                 </div>
//               </>
//             )
//           )}

//           {step === 1 && (
//             <div className="flex flex-col lg:flex-row gap-8 w-full">
//               <div className="flex-1">
//                 <h1 className="text-2xl font-bold mb-6">Address</h1>
//                 <AddressList
//                   addresses={[]}
//                   onAddAddress={() => setIsModalOpen(true)}
//                 />
//                 <AddAddressModal
//                   isOpen={isModalOpen}
//                   onClose={() => setIsModalOpen(false)}
//                   onSave={() => setIsModalOpen(false)}
//                 />
//               </div>
//               <MyOrderSummary handleNext={handleNext} />
//             </div>
//           )}

//           {step === 2 && (
//             <div className="w-full">
//               <MainPaymentComponent />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import OrderSummary from "./components/OrderSummary";
// import CheckoutStepper from "./components/CheckoutStepper";
// import CartItemList from "./components/CartItemList";
// import AddressList from "./components/AddressList";
// import AddAddressModal from "./components/AddAddressModal";
// import MyOrderSummary from "./components/MyOrderSummary";
// import MainPaymentComponent from "./components/MainPaymentComponent";
// import axiosInstance from "../../utils/axiosinstance";

// // Types
// type Product = {
//   id: string;
//   title: string;
//   salePrice: number;
//   regularPrice: number;
//   discountPercentage?: number;
//   images: { url: string }[];
//   category: string;
// };

// type CartItem = {
//   id: string;
//   productId: string;
//   quantity: number;
//   product: Product;
// };

// const Page: React.FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const queryClient = useQueryClient();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const stepParam = parseInt(searchParams.get("step") || "0", 10);
//   const [step, setStep] = useState(stepParam);

//   // ✅ 1. Fetch Cart
//   const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/cart/api/get-all-cart", {
//         withCredentials: true,
//       });
//       return res.data;
//     },
//   });

//   // ✅ 2. Mutations for increase/decrease/remove
//   const increaseMutation = useMutation({
//     mutationFn: (productId: string) =>
//       axiosInstance.patch(
//         "/cart/api/increase-to-cart",
//         { productId },
//         { withCredentials: true }
//       ),
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   const decreaseMutation = useMutation({
//     mutationFn: (productId: string) =>
//       axiosInstance.patch(
//         "/cart/api/decrease-to-cart",
//         { productId },
//         { withCredentials: true }
//       ),
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   const removeMutation = useMutation({
//     mutationFn: (productId: string) =>
//       axiosInstance.delete("/cart/api/remove-to-cart", {
//         data: { productId },
//         withCredentials: true,
//       }),
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   // ✅ 3. Quantity handlers
//   const handleQuantityChange = (id: string, newQty: number) => {
//     const item = cartItems.find((item) => item.productId === id);
//     if (!item) return;

//     if (newQty <= 0) {
//       removeMutation.mutate(id);
//     } else if (newQty > item.quantity) {
//       increaseMutation.mutate(id);
//     } else if (newQty < item.quantity) {
//       decreaseMutation.mutate(id);
//     }
//   };

//   const handleRemove = (id: string) => {
//     removeMutation.mutate(id);
//   };

//   // ✅ 4. Stepper
//   const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
//   const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

//   useEffect(() => {
//     const params = new URLSearchParams();
//     if (step === 0) params.append("orderAndReviews", "");
//     else if (step === 1) params.append("shippingAndAddress", "");
//     else if (step === 2) params.append("payment", "");

//     params.set("step", step.toString());
//     router.push(`?${params.toString()}`);
//   }, [step]);

//   const totalMrp = cartItems.reduce(
//     (sum, item) => sum + item.product.regularPrice * item.quantity,
//     0
//   );

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.product.salePrice * item.quantity,
//     0
//   );

//   const totalDiscount = totalMrp - totalAmount;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <CheckoutStepper currentStep={step} />

//       <div className="max-w-6xl mx-auto px-4 py-8 border border-red-200">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {step === 0 && (
//             <>
//               <CartItemList
//                 items={cartItems.map((item) => ({
//                   ...item.product,
//                   quantity: item.quantity,
//                 }))}
//                 onQuantityChange={handleQuantityChange}
//                 onRemove={handleRemove}
//               />
//               <OrderSummary
//                 onChooseAddress={handleNext}
//                 totalMrp={totalMrp}
//                 totalDiscount={totalDiscount}
//                 totalAmount={totalAmount}
//               />
//             </>
//           )}

//           {step === 1 && (
//             <div className="flex flex-col lg:flex-row gap-8 w-full">
//               <div className="flex-1">
//                 <h1 className="text-2xl font-bold mb-6">Address</h1>
//                 <AddressList
//                   addresses={[]} // Add address list here
//                   onAddAddress={() => setIsModalOpen(true)}
//                 />
//                 <AddAddressModal
//                   isOpen={isModalOpen}
//                   onClose={() => setIsModalOpen(false)}
//                   onSave={(newAddress) => {
//                     // Save address
//                     setIsModalOpen(false);
//                   }}
//                 />
//               </div>
//               <MyOrderSummary handleNext={handleNext} />
//             </div>
//           )}

//           {step === 2 && (
//             <div className="w-full">
//               <MainPaymentComponent />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

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

// Types
type Product = {
  id: string;
  title: string;
  salePrice: number;
  regularPrice: number;
  discountPercentage?: number;
  images: { url: string }[];
  category: string;
  quantity?: number; // required for UI mapping
};

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stepParam = parseInt(searchParams.get("step") || "0", 10);
  const [step, setStep] = useState(stepParam);

  // ✅ Fetch Cart
  const {
    data: cartItems = [],
    isLoading,
    isError,
  } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart/api/get-all-cart", {
        withCredentials: true,
      });
      return res.data;
    },
  });

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
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

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
    (sum, item) => sum + item.product.regularPrice * item.quantity,
    0
  );
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0
  );
  const totalDiscount = totalMrp - totalAmount;

  // ✅ Render
  return (
    <div className="min-h-screen bg-[#F9F6F4]">
      <CheckoutStepper currentStep={step} />
      <div className="max-w-7xl mx-auto py-8 border border-red-200">
        {isLoading ? (
          <p>Loading cart...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load cart.</p>
        ) : (
          step === 0 && (
            <div className="flex justify-between gap-3">
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
          )
        )}

        {step === 1 && (
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-6">Address</h1>
              <AddressList
                addresses={[]}
                onAddAddress={() => setIsModalOpen(true)}
              />
              <AddAddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={() => setIsModalOpen(false)}
              />
            </div>
            <MyOrderSummary handleNext={handleNext} />
          </div>
        )}

        {step === 2 && (
          <div className="w-full">
            <MainPaymentComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
