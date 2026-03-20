import { CheckoutProvider } from "../context/checkoutContext";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}