import Image from "next/image";
import { Bundle } from "@/server/types/bundle";
import { Bubble } from "@/server/types/bubble";
import AddToCartButton from "../components/addtocartbutton";

async function getBundles(): Promise<Bundle[]> {
    const res = await fetch("http://localhost:3500/api/bundles", {
        cache: "no-store"
    });
    return res.json();
}

async function getBubbles(): Promise<Bubble[]>  {
  const res = await fetch("http://localhost:3500/api/bubbles", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Bundles() {

    const bundles = await getBundles();
    const bubbles = await getBubbles();

    return (
  <main className="bg-slate-50 text-slate-900 min-h-screen p-8">
    <h1 className="text-3xl font-bold mb-8">Bundles</h1>
    <div className="flex flex-col gap-4">
      {bundles.map((bundle) => {
        const bundlePrice = bundle.items.reduce((sum, itemId) => {
          const bubble = bubbles.find((b) => b.id === itemId);
          return sum + (bubble?.price ?? 0);
        }, 0);

        return (
          <div key={bundle.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex justify-between items-center shadow-sm">
            <div>
              <p className="font-semibold text-lg">{bundle.name}</p>
              {bundle.items.map((itemId) => {
                const bubble = bubbles.find((b) => b.id === itemId);
                return <p key={itemId} className="text-slate-500 text-sm">{bubble?.name}</p>;
              })}
            </div>
            <div className="flex items-center gap-6">
              <p className="font-semibold text-indigo-600 text-lg">{bundlePrice} kr</p>
              <AddToCartButton id={bundle.id} name={bundle.name} price={bundlePrice} />
            </div>
          </div>
        );
      })}
    </div>
  </main>
);
}