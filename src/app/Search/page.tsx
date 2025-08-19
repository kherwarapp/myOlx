// app/search/page.tsx
'use client';

import { useSearchParams } from "next/navigation";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-xl font-bold mb-4">Search Results for: {query}</h1>

      {/* Replace below with actual filtering logic if needed */}
      <p className="text-gray-600">Results will be shown here...</p>
    </div>
  );
}
