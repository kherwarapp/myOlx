// "use client";
// import { useAds } from "./_components/useAds";
// import AdsList from "./_components/AdsList";
// import SearchBox from "./_components/SearchBox";
// import { useState } from "react";
// import "./globals.css";
// import { Button } from "@heroui/button";

// export default function AdsPage() {
//   const { ads, loading } = useAds();
//   const [searchQuery, setSearchQuery] = useState("");

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg">
//         Loading ads...
//       </div>
//     );
//   }

//   // Filter ads based on title, description, category
//   const filteredAds = ads.filter(
//     (ad) =>
//       ad.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ad.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ad.category?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
    


//     <div className="flex flex-wrap gap-4 items-center">
//       <Button color="default">Default</Button>
//       <Button color="primary">Primary</Button>
//       <Button color="secondary">Secondary</Button>
//       <Button color="success">Success</Button>
//       <Button color="warning">Warning</Button>
//       <Button color="danger">Danger</Button>
//     </div>


//       <SearchBox onSearch={(q) => setSearchQuery(q)} initialValue={searchQuery} />
//       <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         <AdsList ads={filteredAds} />
//       </main>
//     </div>
//   );
// }


"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <button
        type="button"
        className="px-4 h-10 rounded-medium bg-danger text-danger-foreground text-small"
      >
        Danger
      </button>
    </main>
  );
}
