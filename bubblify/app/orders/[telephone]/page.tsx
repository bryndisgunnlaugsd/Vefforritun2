type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  customerInfo: {
    name: string;
    telephone: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  deliveryMethod: "delivery" | "pickup";
  items: OrderItem[];
};

type Props = {
  params: Promise<{ telephone: string }>;
};

async function getOrders(telephone: string): Promise<Order[]> {
  const res = await fetch(`http://localhost:3500/api/orders/${telephone}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function OrderResultsPage({ params }: Props) {
  const { telephone } = await params;
  const orders = await getOrders(telephone);

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-8">Orders for {telephone}</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found for this number.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order, index) => {
            const total = order.items.reduce(
              (sum: number, item: OrderItem) => sum + item.price * item.quantity,
              0
            );
            return (
              <div key={index} className="border rounded-xl p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="font-semibold text-lg">Order #{index + 1}</h2>
                  <span className="text-gray-500">
                    {order.deliveryMethod === "delivery" ? "Delivery" : "Pickup"}
                  </span>
                </div>
                <div className="mb-4">
                  {order.items.map((item: OrderItem) => (
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}