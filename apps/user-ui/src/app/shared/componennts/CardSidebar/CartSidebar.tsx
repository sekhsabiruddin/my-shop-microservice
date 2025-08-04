import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../../store/hook";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  closeCart,
} from "../../../store/slices/cartSlice";
import { RootState } from "../../../store"; // to type our selector
import { Product } from "../../../store/slices/product.slice"; // reuse your Product type

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state: RootState) => state.cart);
  const products = useAppSelector((state: RootState) => state.product.products);

  const getProduct = (id: string): Product | undefined =>
    products.find((p) => p.id === id);

  const total = items.reduce((acc, item) => {
    const product = getProduct(item.productId);
    return acc + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div className="h-full w-96 bg-white p-4 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button
          onClick={() => dispatch(closeCart())}
          className="text-gray-600 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
        ) : (
          items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div
                key={item.productId}
                className="flex items-center justify-between border-b pb-2"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1 ml-4">
                  <p className="text-sm font-semibold">{product.title}</p>
                  <p className="text-xs text-gray-500">{product.size}</p>
                  <p className="text-sm font-medium">₹{product.price}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(decreaseQty(product.id))}
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(product.id))}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="text-red-500 ml-2"
                >
                  ✕
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t mt-4">
        <div className="flex justify-between">
          <span className="text-sm">Total</span>
          <span className="font-bold">₹{total.toLocaleString()}</span>
        </div>
        <button
          disabled={items.length === 0}
          className={`mt-4 w-full py-2 rounded text-white ${
            items.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
