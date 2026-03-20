"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "../../context/checkoutContext";
import { useCart } from "../../context/cartcontext";
import { submitOrder} from "../../actions/submitOrder";

export default function ReviewPage() {
  const { deliveryMethod, customerInfo } = useCheckout();
  const { cart, } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = async () => {
    await submitOrder({
      customerInfo,
      deliveryMethod,
      items: cart,
    });
    router.push("/checkout/success");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Review Your Order</h1>

      <div className="border rounded-xl p-4 mb-4">
        <h2 className="font-semibold text-lg mb-2">Delivery Method</h2>
        <p className="text-gray-600 capitalize">{deliveryMethod === "delivery" ? "Home Delivery" : "Store Pickup"}</p>
      </div>

      <div className="border rounded-xl p-4 mb-4">
        <h2 className="font-semibold text-lg mb-2">Your Information</h2>
        <p className="text-gray-600">Name: {customerInfo.name}</p>
        <p className="text-gray-600">Telephone: {customerInfo.telephone}</p>
        {deliveryMethod === "delivery" && (
          <>
            <p className="text-gray-600">Address: {customerInfo.address}</p>
            <p className="text-gray-600">City: {customerInfo.city}</p>
            <p className="text-gray-600">Postal Code: {customerInfo.postalCode}</p>
          </>
        )}
      </div>

      <div className="border rounded-xl p-4 mb-6">
        <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-600 py-1">
            <span>{item.name} x{item.quantity}</span>
            <span>{item.price * item.quantity} kr</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>{total} kr</span>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition-colors"
      >
        Confirm Order
      </button>
    </div>
  );
}