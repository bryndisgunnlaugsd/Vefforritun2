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
    <main className="bg-white text-black min-h-screen p-8">
      <div className="flex flex-col items-center min-h-screen p-8">
      <Image
          src={bubble.image}
          alt={bubble.name}
          width={200}
          height={200}
          className="object-cover rounded-lg"
                    />
        <h2 className="text-xl font-semibold mt-3">{bubble.name}</h2>
        <p className="text-black-800 mt-2"> {bubble.description}</p>        
        <p className="text-gray-600 mt-1">{bubble.price} kr</p>

      <AddToCartButton id={bubble.id} name={bubble.name} price={bubble.price} />
    </div>
    </main>
  )
}