"use client";

import { useCart } from "../../context/cartcontext";
import { useEffect } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const { cart, removeFromCart } = useCart();

  // Clear the cart on success
  useEffect(() => {
    cart.forEach((item) => removeFromCart(item.id));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your order! Your bubbles are on their way. We hope they bring lots of joy!
      </p>
      <Link
        href="/bubbles"
        className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}