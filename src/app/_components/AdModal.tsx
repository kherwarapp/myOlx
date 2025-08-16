"use client";
import { MapPin, X } from "lucide-react";
import { formatINR, timeAgo } from "./utils";

export default function AdModal({ ad, onClose }: any) {
  if (!ad) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-50 rounded-full bg-white p-2 shadow hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full aspect-[16/9] object-cover"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">{ad.title}</h2>
          <p className="text-gray-700">{ad.description}</p>
          <p className="text-lg font-semibold">{formatINR(ad.price)}</p>
          <p className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-5 w-5" />
            {ad.location}
          </p>
          <p className="text-sm text-slate-600">
            Contact:{" "}
            <a
              href={`tel:${ad.phone}`}
              className="text-blue-600 hover:underline"
            >
              {ad.phone}
            </a>
          </p>
          <p className="text-xs text-slate-500">
            Posted {timeAgo(ad.date)}
          </p>
        </div>
      </div>
    </div>
  );
}
