export default function About() {
    return(
        <main className="bg-slate-50 min-h-screen flex flex-col items-center py-16 px-8">
          <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">About Bubblify</h1>
            <p className="text-slate-600 leading-relaxed">
                Welcome to Bubblify — the world's leading bubble emporium! Founded in 2024,
                we are passionate about bringing joy and wonder to people of all ages through
                our extraordinary range of bubble products.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
                From our classic Plain Bubbles to the mysterious Dark Matter variety, every
                product is crafted with care and a touch of magic. Whether you're looking for
                a fun gift or just want to fill your day with a little more sparkle, Bubblify
                has something for everyone.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
                Our mission is simple — spread happiness, one bubble at a time.
            </p>
          </div>
        </main>
    )
}