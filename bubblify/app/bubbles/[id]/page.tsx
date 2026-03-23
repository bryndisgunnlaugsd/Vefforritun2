import Image from "next/image";
import { Bubble } from "@/server/types/bubble";
import AddToCartButton from "@/app/components/addtocartbutton";

type Params = {
  params: { id: string };
};

async function getBubblebyID(id: string): Promise<Bubble> {
  const res = await fetch(`http://localhost:3500/api/bubbles/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function BubbleDetailPage({ params }: Params) {
    const { id } = await params;
    const bubble = await getBubblebyID(id);
  
  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mt-8 flex flex-col items-center">
        <Image
          src={bubble.image}
          alt={bubble.name}
          width={200}
          height={200}
          className="object-cover rounded-xl"
        />
        <h2 className="text-2xl font-bold mt-4">{bubble.name}</h2>
        <p className="text-slate-500 mt-2 text-center">{bubble.description}</p>
        <p className="text-indigo-600 font-semibold text-lg mt-2">{bubble.price} kr</p>
        <div className="mt-6">
          <AddToCartButton id={bubble.id} name={bubble.name} price={bubble.price} />
        </div>
      </div>
    </main>
  )
}