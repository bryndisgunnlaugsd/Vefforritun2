"use client";

import { useCart } from "../context/cartcontext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-slate-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4 max-w-2xl">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-indigo-600 font-medium">{item.price} kr</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded-lg font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded-lg font-bold transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg ml-2 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xl font-bold">Total: {total} kr</p>
            <button
              onClick={() => router.push("/checkout/delivery")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}