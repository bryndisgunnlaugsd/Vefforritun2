"use server";

type OrderPayload = {
  customerInfo: {
    name: string;
    telephone: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  deliveryMethod: "delivery" | "pickup" | null;
  items: { id: number; name: string; price: number; quantity: number }[];
};

export async function submitOrder(payload: OrderPayload) {
  const telephone = payload.customerInfo.telephone;
  
    await fetch(`http://localhost:3500/api/orders/${telephone}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}