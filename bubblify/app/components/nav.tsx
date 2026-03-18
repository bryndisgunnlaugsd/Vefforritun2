import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-sky-200">
    <Image src="/bubble.png" alt="Logo" width={40} height={40} />
      <div className="flex gap-4 text-black">
        <Link href="/about">About Us</Link>
        <Link href="/bubbles">Bubble Products</Link>
        <Link href="/bundles">Bundles</Link>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
}