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
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}