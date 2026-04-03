"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!telephone) {
      setError("Please enter a telephone number");
      return;
    }

    const res = await fetch(`http://localhost:3500/api/orders/${telephone}`);
    const data = await res.json();

    if (!data || data.length === 0) {
      setError("No orders found for that telephone number");
      return;
    }

    router.push(`/orders/${telephone}`);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Find Your Orders</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your telephone number"
          value={telephone}
          onChange={(e) => {
            setTelephone(e.target.value);
            setError("");
          }}
          className="w-full border rounded-lg p-3"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition-colors"
        >
          Search Orders
        </button>
      </div>
    </div>
  );
}