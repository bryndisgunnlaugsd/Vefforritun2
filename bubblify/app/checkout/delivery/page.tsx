"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "../../context/checkoutContext";

export default function DeliveryPage() {
  const { setDeliveryMethod } = useCheckout();
  const router = useRouter();

  const handleSelect = (method: "delivery" | "pickup") => {
    setDeliveryMethod(method);
    router.push("/checkout/info");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">How would you like to receive your order?</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleSelect("delivery")}
          className="border-2 border-gray-200 rounded-xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <h2 className="text-xl font-semibold mb-1">Home Delivery</h2>
          <p className="text-gray-500">We deliver the bubbles straight to your door</p>
        </button>

        <button
          onClick={() => handleSelect("pickup")}
          className="border-2 border-gray-200 rounded-xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <h2 className="text-xl font-semibold mb-1">Store Pickup</h2>
          <p className="text-gray-500">Pick up your bubbles at our store</p>
        </button>
      </div>
    </div>
  );
}