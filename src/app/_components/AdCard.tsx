import { useState } from "react";
import Image from "next/image";

type AdCardProps = {
  post: any;
};

export default function AdCard({ post }: AdCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = post?.images?.[0];

  return (
    <article className="group rounded-2xl border border-white/20 bg-white/30 backdrop-blur-lg shadow-md transition hover:shadow-lg overflow-hidden cursor-default">
      <div className="aspect-[4/3] relative flex items-center justify-center bg-slate-100">
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={post?.title ? `${post.title} - Ad` : "Advertisement image"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition duration-300 ease-in-out"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-700 font-semibold text-lg">
            {post?.title || "No Image"}
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1 text-gray-900 drop-shadow">
          {post?.title || "Untitled Ad"}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-2">
          {post?.description || "No description available"}
        </p>
      </div>
    </article>
  );
}
