<<<<<<< HEAD
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
=======
'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../_components/firebaseConfig";
import AdCard from "../_components/AdCard";
import SearchBox from "../_components/SearchBox";
import ProfileIcon from "../_components/ProfileIcon";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type Ad = {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  price?: number;
  location?: string;
  phone?: string;
};

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const queryText = params.get("query")?.toLowerCase() || "";

  const [results, setResults] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (text: string) => {
    router.push(`/search?query=${encodeURIComponent(text)}`);
  };

  useEffect(() => {
    if (!queryText) return setResults([]);

    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        // Firestore me simple prefix query for title
        const q = query(
          collection(db, "ads"),
          where("title", ">=", queryText),
          where("title", "<=", queryText + "\uf8ff")
        );
        const snapshot = await getDocs(q);
        const data: Ad[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Ad, "id">),
        }));

        // Optional: client-side filter for description/category
        const filtered = data.filter(
          (post) =>
            post.description?.toLowerCase().includes(queryText) ||
            post.category?.toLowerCase().includes(queryText)
        );

        setResults(filtered);
      } catch (err) {
        console.error(err);
        setError("Search failed. Try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [queryText]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <SearchBox onSearch={handleSearch} initialValue={queryText} />
        <ProfileIcon />
      </header>

      {loading && <div className="p-4 text-center">Loading...</div>}
      {error && <div className="p-4 text-center text-red-600">{error}</div>}
      {!loading && results.length === 0 && queryText && (
        <div className="p-4 text-center text-gray-500">
          No posts found for "{queryText}"
        </div>
      )}

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {results.map((post) => (
          <AdCard key={post.id} post={post} />
        ))}
      </main>
>>>>>>> bf578b8 (new instance in download forlder)
    </div>
  );
}
