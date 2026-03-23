import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-sky-200 shadow-md">
      <Image src="/bubble.png" alt="Logo" width={40} height={40} />
      <div className="flex gap-8 text-sky-900 font-medium">
        <Link href="/bubbles" className="hover:text-sky-600 transition-colors">Products</Link>
        <Link href="/bundles" className="hover:text-sky-600 transition-colors">Bundles</Link>
        <Link href="/about" className="hover:text-sky-600 transition-colors">About us</Link>
        <Link href="/cart" className="hover:text-sky-600 transition-colors">Cart</Link>
      </div>
    </nav>
  );
}