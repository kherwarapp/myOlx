'use client';
import { signOut, useSession } from "next-auth/react";
export default function ProfilePage() {
  const { data } = useSession();
  const user = data?.user;
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      {!user ? (
        <p className="text-gray-600">Please sign in to view your profile.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          {user.image ? <img src={user.image} alt="avatar" className="w-14 h-14 rounded-full" /> : null}
          <div className="flex-1">
            <div className="text-lg font-medium">{user.name || 'User'}</div>
            <div className="text-gray-600 text-sm">{user.email}</div>
          </div>
          <button onClick={() => signOut()} className="px-3 py-2 rounded-lg bg-gray-900 text-white">Sign out</button>
        </div>
      )}
    </main>
  );
}
