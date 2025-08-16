'use client';
import { useState } from "react";

// SearchBox component
type SearchBoxProps = {
  onSearch: (text: string) => void;
  initialValue?: string;
};

export default function SearchBox({ onSearch, initialValue = "" }: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition w-full max-w-md mx-auto"
      role="search"
      aria-label="Search posts"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="px-4 py-2 outline-none flex-grow text-gray-800 placeholder-gray-400"
        aria-label="Search input"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-full hover:bg-indigo-700 transition"
        aria-label="Search"
      >
        🔍
      </button>
    </form>
  );
}