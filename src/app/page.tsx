"use client";
import { useAds } from "./_components/useAds";
import AdsList from "./_components/AdsList";

export default function AdsPage() {
  const { ads, loading } = useAds();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading ads...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdsList ads={ads} />
      </main>
    </div>
  );
}
