"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "../../context/checkoutContext";
import { useState } from "react";

export default function InfoPage() {
  const { deliveryMethod, setCustomerInfo } = useCheckout();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    telephone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.telephone) newErrors.telephone = "Telephone is required";
    if (deliveryMethod === "delivery") {
      if (!form.address) newErrors.address = "Address is required";
      if (!form.city) newErrors.city = "City is required";
      if (!form.postalCode) newErrors.postalCode = "Postal code is required";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setCustomerInfo(form);
    router.push("/checkout/review");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">
        {deliveryMethod === "delivery" ? "Delivery Information" : "Pickup Information"}
      </h1>

      <div className="flex flex-col gap-4">
        <div>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            name="telephone"
            placeholder="Telephone"
            value={form.telephone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
          {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
        </div>

        {deliveryMethod === "delivery" && (
          <>
            <div>
              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <input
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>
          </>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-lg p-3 mt-4 hover:bg-blue-600 transition-colors"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}