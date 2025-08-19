import Image from "next/image";
import { IndianRupee, MapPin, Tag } from "lucide-react";

type AdCardProps = {
  post: any;
};

export default function AdCard({ post }: AdCardProps) {
  const imageUrl = post.imageUrl;
  return (
    <article className="group rounded-2xl border border-white/20 bg-white/30 backdrop-blur-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-default">
      {/* Image */}
      <div className="aspect-[4/3] relative bg-slate-100 flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Ad: ${post?.title || "Advertisement image"}`}
            fill
              priority // ✅ Add this prop  
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition duration-300 ease-in-out"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-700 font-semibold text-center p-2">
            {post?.title || "No Image"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1 text-gray-900">
          {post?.title || "Untitled Ad"}
        </h3>

        <p className="text-sm text-gray-700 line-clamp-2">
          {post?.description || "No description available"}
        </p>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          {post.price && (
            <span className="flex items-center gap-1 text-indigo-600 font-semibold">
              <IndianRupee size={16} /> ₹{post.price}
            </span>
          )}
          {post.location && (
            <span className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
              <MapPin size={16} /> {post.location}
            </span>
          )}
          {post.category && (
            <span className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
              <Tag size={16} /> {post.category}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
