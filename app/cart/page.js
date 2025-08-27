"use client";
import { useCartStore } from "@/stores/cart";

export default function CartPage() {
  const cartItems = useCartStore((cartState) => cartState.items);
  const addItemToCart = useCartStore((cartState) => cartState.addItem);
  const decrementCartItem = useCartStore(
    (cartState) => cartState.decrementItem
  );
  const removeCartItem = useCartStore((cartState) => cartState.removeItem);
  const clearCart = useCartStore((cartState) => cartState.clear);

  const subtotalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                  <div className="text-gray-600">${item.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                    onClick={() => decrementCartItem(item.id)}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center">{item.qty || 1}</span>
                  <button
                    className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                    onClick={() => addItemToCart(item)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="ml-4 text-sm text-red-600 hover:underline"
                  onClick={() => removeCartItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 h-fit">
            <h2 className="font-semibold mb-2">Summary</h2>
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>${subtotalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-2 border-t mt-2 font-semibold">
              <span>Total</span>
              <span>${subtotalAmount.toFixed(2)}</span>
            </div>
            <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-black/90">
              Checkout
            </button>
            <button
              className="mt-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
