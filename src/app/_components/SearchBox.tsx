'use client';

import Image from "next/image";
import { useState } from "react";

// ✅ Define onSearch in props
type SearchBoxProps = {
  onSearch: (text: string) => void;
  initialValue?: string;
};

export default function SearchBox({ onSearch, initialValue = "" }: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gradient-to-br from-gray-100/10 to-white/10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-transparent"
      >
        {/* Label (Optional) */}
        <label
          htmlFor="search-input"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>

        {/* Search input container */}
        <div className="relative">
          {/* Icon on the left side */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          {/* Search Input */}
          <input
            type="search"
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white/30 backdrop-blur-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />

          {/* Submit button */}
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>








  <div className="flex items-center p-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        
        <span className="sr-only">Open user menu</span>

        <Image className="w-8 h-8 rounded-full" src="" alt="user photo"/>

      </button>
    


  </div>

    </div>
  );
}
