"use client";
import { Search, IndianRupee } from "lucide-react";

export default function SearchFilters({ 
  q, setQ, category, setCategory, 
  minPrice, setMinPrice, maxPrice, setMaxPrice, 
  sort, setSort, categories 
}: any) {
  return (
    <section className="max-w-6xl mx-auto mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {/* Search */}
        <div className="relative w-64">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, location or category..."
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 pl-10 focus:outline-none"
          />
          <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Category */}
        <div className="relative w-48">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-gray-300 px-4 py-2 pl-3 focus:outline-none"
          >
            {categories.map((c: string) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="relative w-32">
          <input
            inputMode="numeric"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
            placeholder="Min Price"
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 pl-10 focus:outline-none"
          />
          <IndianRupee className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Max Price */}
        <div className="relative w-32">
          <input
            inputMode="numeric"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
            placeholder="Max Price"
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 pl-10 focus:outline-none"
          />
          <IndianRupee className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Sort */}
        <div className="relative w-48">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 pl-3 focus:outline-none"
          >
            <option value="latest">Sort by Latest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>
    </section>
  );
}
