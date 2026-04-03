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
      <h1 className="text-2xl font-bold mb-8 text-center text-slate-900">Review Your Order</h1>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4 shadow-sm">
        <h2 className="font-semibold text-lg mb-2 text-slate-900">Delivery Method</h2>
        <p className="text-slate-500">{deliveryMethod === "delivery" ? "Home Delivery" : "Store Pickup"}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4 shadow-sm">
        <h2 className="font-semibold text-lg mb-2 text-slate-900">Your Information</h2>
        <p className="text-slate-500">Name: {customerInfo.name}</p>
        <p className="text-slate-500">Telephone: {customerInfo.telephone}</p>
        {deliveryMethod === "delivery" && (
          <>
            <p className="text-slate-500">Address: {customerInfo.address}</p>
            <p className="text-slate-500">City: {customerInfo.city}</p>
            <p className="text-slate-500">Postal Code: {customerInfo.postalCode}</p>
          </>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
        <h2 className="font-semibold text-lg mb-2 text-slate-900">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-slate-500 py-1">
            <span>{item.name} x{item.quantity}</span>
            <span>{item.price * item.quantity} kr</span>
          </div>
        ))}
        <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-semibold text-slate-900">
          <span>Total</span>
          <span>{total} kr</span>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-3 font-medium transition-colors"
      >
        Confirm Order
      </button>
    </div>
  );
}