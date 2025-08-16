"use client";
import AdCard from "./AdCard";

type AdsListProps = {
  ads: any[];
};

export default function AdsList({ ads }: AdsListProps) {
  if (ads.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500 py-20">
        No ads found.
      </p>
    );
  }

  return (
    <>
      {ads.map((post: any) => (
        <AdCard key={post.id} post={post} />
      ))}
    </>
  );
}
