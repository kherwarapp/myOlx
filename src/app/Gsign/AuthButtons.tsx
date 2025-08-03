'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function AuthButtons() {
  const { data: session } = useSession();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-[#0f0f0f] dark:via-[#1a1a1a] dark:to-[#2a2a2a] transition-colors">
      <div className="w-full max-w-md px-8 py-10 backdrop-blur-xl bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-[28px] shadow-2xl">
        {session?.user ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Welcome, {session.user.name}
            </h2>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#bfff00] transition"
              aria-label="Sign out"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Sign in to your account
            </h2>
            <button
              onClick={() => signIn('google')}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bfff00] transition"
              aria-label="Sign in with Google"
            >
              <FcGoogle className="w-6 h-6" />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </main>
  );
}
