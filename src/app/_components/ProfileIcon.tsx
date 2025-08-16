'use client';
import { useRouter } from "next/navigation";

export default function ProfileIcon() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/profile")}
      className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-400"
      title="Profile"
    >
      <span className="font-bold text-gray-700">A</span>
    </div>
  );
}
