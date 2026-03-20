"use client";

import { createContext, useContext, useState } from "react";

type DeliveryMethod = "delivery" | "pickup" | null;

type CustomerInfo = {
  name: string;
  telephone: string;
  address?: string;
  city?: string;
  postalCode?: string;
};

type CheckoutContextType = {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    telephone: "",
  });

  return (
    <CheckoutContext.Provider
      value={{ deliveryMethod, setDeliveryMethod, customerInfo, setCustomerInfo }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within a CheckoutProvider");
  return context;
}