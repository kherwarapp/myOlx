"use client";
import React, { useMemo, useState } from "react";
import { Search, MapPin, IndianRupee, Filter, X, ListFilter, Tag, Clock } from "lucide-react";


// --- Mock Data (replace with API later) ---
const MOCK_POSTS = [
  {
    id: "car-001",
    title: "Maruti Swift VXi 2018",
    price: 375000,
    category: "Cars",
    location: "Hiran Magri, Udaipur",
    date: "2025-08-05",
    images: [
      "https://picsum.photos/id/1043/800/600",
      "https://picsum.photos/id/1067/800/600",
    ],
    description:
      "Single owner, 52,000 km, service records available. Excellent condition, no accidents.",
    seller: { name: "Raj Motors", phone: "+91 98xxxxxx21" },
  },
  {
    id: "bike-014",
    title: "Honda Activa 6G 2022",
    price: 68000,
    category: "Bikes & Scooters",
    location: "Sector 11, Udaipur",
    date: "2025-08-08",
    images: [
      "https://picsum.photos/id/1074/800/600",
      "https://picsum.photos/id/1050/800/600",
    ],
    description: "Lightly used, 9,800 km, first owner, insurance valid till Dec 2025.",
    seller: { name: "Aayush", phone: "+91 90xxxxxx10" },
  },
  {
    id: "home-221",
    title: "1 BHK Flat for Rent – Ayad",
    price: 8500,
    category: "Real Estate",
    location: "Ayad, Udaipur",
    date: "2025-08-10",
    images: [
      "https://picsum.photos/id/1018/800/600",
      "https://picsum.photos/id/1025/800/600",
    ],
    description:
      "Semi-furnished, near market & bus stop, 24x7 water. Family preferred. Deposit 1 month.",
    seller: { name: "Shreya", phone: "+91 88xxxxxx45" },
  },
  {
    id: "furn-311",
    title: "Solid Wood Queen Bed + Mattress",
    price: 15500,
    category: "Furniture",
    location: "Sukher, Udaipur",
    date: "2025-08-09",
    images: [
      "https://picsum.photos/id/1021/800/600",
      "https://picsum.photos/id/1011/800/600",
    ],
    description:
      "Hardwood frame, 6-inch foam mattress included. Pickup only. Minor scratches.",
    seller: { name: "Meera", phone: "+91 79xxxxxx33" },
  },
  {
    id: "elec-402",
    title: "iPhone 12 128GB – Blue",
    price: 27500,
    category: "Mobiles",
    location: "Fatehpura, Udaipur",
    date: "2025-08-11",
    images: [
      "https://picsum.photos/id/1060/800/600",
      "https://picsum.photos/id/1057/800/600",
    ],
    description:
      "Battery health 87%, box + charger. No dents, Face ID working. Bill available.",
    seller: { name: "Karan", phone: "+91 97xxxxxx02" },
  },
];

const CATEGORIES = [
  "All",
  "Cars",
  "Bikes & Scooters",
  "Mobiles",
  "Furniture",
  "Real Estate",
];

function formatINR(n: string | number | bigint) {
  return new Intl.NumberFormat("en-IN",
     { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

function timeAgo(dateStr: string | number | Date) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hrs ago`;
  const days = Math.floor(hrs / 24);
  return `${days} days ago`;
}

export default function OLXUdaipur() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("latest");
  const [open, setOpen] = useState(null); // post id for details modal

  const filtered = useMemo(() => {
    let data = [...MOCK_POSTS];

    if (category !== "All") data = data.filter((p) => p.category === category);

    if (q.trim()) {
      const s = q.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.location.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s)
      );
    }

    const min = parseInt(minPrice || "0", 10);
    const max = parseInt(maxPrice || "0", 10);
    if (!isNaN(min) && min > 0) data = data.filter((p) => p.price >= min);
    if (!isNaN(max) && max > 0) data = data.filter((p) => p.price <= max);

    if (sort === "price-asc") data.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") data.sort((a, b) => b.price - a.price);
    else if (sort === "latest") data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return data;
  }, [q, category, minPrice, maxPrice, sort]);

  const openPost = filtered.find((p) => p.id === open) || MOCK_POSTS.find((p) => p.id === open) || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold">OLX</span>
            <div className="leading-tight">
              <h1 className="text-xl font-semibold">Udaipur Listings</h1>
              <p className="text-xs text-slate-500">Buy • Sell • Rent — Fast & Safe</p>
            </div>
          </div>

          {/* Search */}
          <div className="ml-auto flex-1 max-w-2xl">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search in Udaipur (car, phone, 1BHK, Sukher)…"
                className="w-full rounded-2xl border border-slate-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
              />
              <Search className="h-5 w-5 absolute left-3 top-2.5 opacity-60" />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-3">
            <label className="text-xs text-slate-500">Category</label>
            <div className="relative">
              <ListFilter className="h-4 w-4 absolute left-3 top-3 opacity-60" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-300 px-4 py-2 pl-10 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-500">Min Price</label>
            <div className="relative">
              <IndianRupee className="h-4 w-4 absolute left-3 top-3 opacity-60" />
              <input
                inputMode="numeric"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-300 px-4 py-2 pl-10 focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-500">Max Price</label>
            <div className="relative">
              <IndianRupee className="h-4 w-4 absolute left-3 top-3 opacity-60" />
              <input
                inputMode="numeric"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
                placeholder="Any"
                className="w-full rounded-2xl border border-slate-300 px-4 py-2 pl-10 focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="text-xs text-slate-500">Sort</label>
            <div className="relative">
              <Filter className="h-4 w-4 absolute left-3 top-3 opacity-60" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-2 pl-10 focus:outline-none"
              >
                <option value="latest">Latest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No results. Adjust filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <article key={p.id} className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{formatINR(p.price)}</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                      <Tag className="h-3 w-3" /> {p.category}
                    </span>
                  </div>
                  <h3 className="font-medium line-clamp-1">{p.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{p.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-4 w-4" />
                    <span>Posted {timeAgo(p.date)}</span>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setOpen(p.id)}
                      className="w-full rounded-xl bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Details Modal */}
      {openPost && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/40 p-0 md:p-6" onClick={() => setOpen(null)}>
          <div className="w-full md:max-w-3xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setOpen(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-[16/9] bg-slate-100">
                <img src={openPost.images[0]} alt={openPost.title} className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="p-4 md:p-6 grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold">{formatINR(openPost.price)}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                    <Tag className="h-3 w-3" /> {openPost.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold">{openPost.title}</h2>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" /> {openPost.location}
                </div>
                <p className="text-slate-700">{openPost.description}</p>
              </div>

              <aside className="md:col-span-2 space-y-3">
                <div className="rounded-2xl border p-4">
                  <h3 className="font-semibold mb-2">Seller</h3>
                  <div className="text-sm">{openPost.seller.name}</div>
                  <div className="text-sm">Phone: {openPost.seller.phone}</div>
                </div>
                <div className="rounded-2xl border p-4">
                  <h3 className="font-semibold mb-2">Quick Actions</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <a
                      href={`tel:${openPost.seller.phone.replace(/\D/g, "")}`}
                      className="rounded-xl bg-slate-900 text-white py-2 text-center text-sm font-medium hover:bg-slate-800"
                    >
                      Call seller
                    </a>
                    <button
                      className="rounded-xl border border-slate-300 py-2 text-sm font-medium hover:bg-slate-50"
                      onClick={() => navigator.clipboard.writeText(window.location.href + "#" + openPost.id)}
                    >
                      Copy listing link
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Built as an OLX Udaipur MVP • Replace mock data with API when ready.
      </footer>
    </div>
  );
}
