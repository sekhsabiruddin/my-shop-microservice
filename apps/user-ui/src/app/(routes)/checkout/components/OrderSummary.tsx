// import React from "react";

// const OrderSummary = ({ onChooseAddress }: { onChooseAddress: () => void }) => {
//   return (
//     <div className="lg:w-80">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-6">
//           {/* Header */}
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Offers & Coupons
//           </h3>

//           {/* Coupon Input */}
//           <div className="flex gap-2 mt-2">
//             <div className="flex-1 border border-[#EAEAEA] h-[40px] px-3 py-[9.5px] rounded">
//               <input
//                 type="text"
//                 placeholder="Enter coupon code"
//                 className="sub-heading-04-regular outline-none w-full disabled:bg-white disabled:cursor-not-allowed"
//               />
//             </div>
//             <button className="paragraph-06-medium bg-secondary-60 text-surface-10 h-[40px] px-4 rounded hover:bg-secondary-80 transition-all whitespace-nowrap">
//               APPLY
//             </button>
//           </div>

//           {/* Price Details Title */}
//           <h2 className="heading-03-regular-mobile lg:sub-heading-01-regular mt-6 lg:mt-8">
//             Price Details
//           </h2>

//           {/* Total MRP */}
//           <div className="mt-4 flex justify-between items-center">
//             <span className="paragraph-06-regular text-neutral-40">
//               Total MRP
//             </span>
//             <span className="paragraph-06-medium-mobile lg:paragraph-03-medium">
//               ₹500
//             </span>
//           </div>

//           {/* Discounts */}
//           <div className="mt-4 flex justify-between items-center">
//             <span className="paragraph-06-regular text-neutral-40">
//               Discounts
//             </span>
//             <span className="paragraph-06-medium-mobile lg:paragraph-03-medium text-success-40">
//               -₹700
//             </span>
//           </div>

//           {/* Subtotal */}
//           <div className="mt-4 flex justify-between items-center">
//             <span className="paragraph-06-regular text-neutral-40">
//               Subtotal
//             </span>
//             <span className="paragraph-06-medium-mobile lg:paragraph-03-medium">
//               ₹12,400
//             </span>
//           </div>

//           {/* Shipping Fee */}
//           <div className="mt-4 flex justify-between items-center">
//             <span className="paragraph-06-regular text-neutral-40">
//               Shipping Fee
//             </span>
//             <span className="paragraph-06-medium-mobile lg:paragraph-03-medium text-success-40">
//               Free
//             </span>
//           </div>

//           {/* Divider */}
//           <div className="mt-6 mb-4 border-t border-secondary-20" />

//           {/* Total Amount */}
//           <div className="flex justify-between items-center">
//             <span className="heading-04-regular-mobile lg:paragraph-06-regular font-semibold">
//               Total Amount
//             </span>
//             <span className="paragraph-06-medium-mobile lg:paragraph-03-medium text-neutral-90 font-semibold">
//               ₹15,000
//             </span>
//           </div>

//           {/* Action Button */}
//           <div className="mt-6 lg:mt-8">
//             <button
//               className="paragraph-06-medium bg-secondary-60 text-surface-10 w-full py-3 h-[45px] rounded-lg hover:bg-secondary-80 transition-all"
//               onClick={onChooseAddress}
//             >
//               CHOOSE ADDRESS
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;

import React from "react";

type Props = {
  onChooseAddress: () => void;
  totalMrp: number;
  totalDiscount: number;
  totalAmount: number;
};

const OrderSummary: React.FC<Props> = ({
  onChooseAddress,
  totalMrp,
  totalDiscount,
  totalAmount,
}) => {
  return (
    <div className="lg:w-80">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Offers & Coupons
          </h3>

          <div className="flex gap-2 mt-2">
            <div className="flex-1 border border-[#EAEAEA] h-[40px] px-3 py-[9.5px] rounded">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="sub-heading-04-regular outline-none w-full"
              />
            </div>
            <button className="paragraph-06-medium bg-secondary-60 text-surface-10 h-[40px] px-4 rounded hover:bg-secondary-80 transition-all">
              APPLY
            </button>
          </div>

          <h2 className="heading-03-regular-mobile lg:sub-heading-01-regular mt-6 lg:mt-8">
            Price Details
          </h2>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-neutral-40">Total MRP</span>
            <span>₹{totalMrp.toLocaleString()}</span>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-neutral-40">Discounts</span>
            <span className="text-success-40">
              −₹{totalDiscount.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-neutral-40">Subtotal</span>
            <span>₹{(totalMrp - totalDiscount).toLocaleString()}</span>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-neutral-40">Shipping Fee</span>
            <span className="text-success-40">Free</span>
          </div>

          <div className="mt-6 mb-4 border-t border-secondary-20" />

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount</span>
            <span className="font-semibold">
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>

          <div className="mt-6 lg:mt-8">
            <button
              className="w-full py-3 h-[45px]  bg-secondary-60 text-white transition-all"
              onClick={onChooseAddress}
            >
              CHOOSE ADDRESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
