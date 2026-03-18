"use client";

import { useCart } from "../context/cartcontext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="text-black bg-white min-h-screen p-8">
      <h1 className="text-black font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="border rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-black-600">{item.price} kr</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="text-black  bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="text-black bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-xl font-bold">Total: {total} kr</p>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 bg-green-500 text-black px-6 py-3 rounded"
            >
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}