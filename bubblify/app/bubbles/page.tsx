import { Bubble } from "@/server/types/bubble";
import Link from "next/link";
import Image from "next/image";

async function getBubbles(): Promise<Bubble[]> {
  try {
    const res = await fetch("http://localhost:3500/api/bubbles", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Failed to fetch bubbles:", err);
    return [];
  }
}

export default async function Bubbles() {
  const bubbles = await getBubbles();

  return (
    <main className="bg-white text-black min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Bubble Products</h1>
      <div className="grid grid-cols-3 gap-6">
        {bubbles.map((bubble) => (
          <Link href={`/bubbles/${bubble.id}`} key={bubble.id}>
            <div className="border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <Image
                src={bubble.image}
                alt={bubble.name}
                width={400}
                height={400}
                className="w-full object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-3">{bubble.name}</h2>
              <p className="text-gray-600 mt-1">{bubble.price} kr</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
