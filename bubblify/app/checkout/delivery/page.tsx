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
      <h1 className="text-2xl font-bold mb-8 text-center text-slate-900">How would you like to receive your order?</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleSelect("delivery")}
          className="border-2 border-slate-200 rounded-2xl p-6 text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all"
        >
          <h2 className="text-xl font-semibold mb-1 text-slate-900">Home Delivery</h2>
          <p className="text-slate-500">We deliver the bubbles straight to your door</p>
        </button>

        <button
          onClick={() => handleSelect("pickup")}
          className="border-2 border-slate-200 rounded-2xl p-6 text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all"
        >
          <h2 className="text-xl font-semibold mb-1 text-slate-900">Store Pickup</h2>
          <p className="text-slate-500">Pick up your bubbles at our store</p>
        </button>
      </div>
    </div>
  );
}