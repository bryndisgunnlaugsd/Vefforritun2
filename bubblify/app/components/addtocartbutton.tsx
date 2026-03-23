"use client";

import { useCart } from "../context/cartcontext";

type Props = {
  id: number;
  name: string;
  price: number;
};

export default function AddToCartButton({ id, name, price }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart({ id, name, price })}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
    >
      Add to Cart
    </button>
  );
}