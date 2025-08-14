'use client';

import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from './_components/firebaseConfig';
import Link from 'next/link';


import React, { useMemo } from "react";
import { Search, MapPin, IndianRupee, Filter, X, ListFilter, Tag, Clock } from "lucide-react";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type Ad = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  phone: string;
  imageUrl: string;
};

export default function AdListPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'ads'));
        const adsData: Ad[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Ad[];

        setAds(adsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ads:', error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
        Loading ads...
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        No ads found.
      </div>
    );
  }

  function formatINR(price: number): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  function timeAgo(phone: string): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Latest Ads</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (<> 
        
        
            <article key={ad.id} className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={ad.imageUrl} alt={ad.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      
                      {/* {formatINR(ad.price)} */}
                      </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                      <Tag className="h-3 w-3" /> {ad.category}
                    </span>
                  </div>
                  <h3 className="font-medium line-clamp-1">{ad.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{ad.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-4 w-4" />
                    <span>Posted 
                      {/* {timeAgo(ad.phone)} */}

                    </span>
                  </div>
                  <div className="pt-2">
                    <button
                      // onClick={() => setOpen(p.id)}
                      className="w-full rounded-xl bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </article>
        
        
        
         <div
            key={ad.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
          >
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{ad.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {ad.description}
              </p>
              <div className="text-indigo-600 font-bold mb-1">₹ {ad.price}</div>
              <div className="text-xs text-gray-500">
                📍 {ad.location} • 📞 {ad.phone}
              </div>
            </div>
          </div></>
        
        ))}
      </div>



    <nav className="flex gap-4 p-4 bg-gray-100 border-b">
      <Link href="/">Home</Link>
      <Link href="/AboutUs">About Us</Link>
      <Link href="/PostAd">Post Ad</Link>
      <Link href="/Gsign">Google Sign</Link>
            <Link href="/DetailPage">Detail Page</Link>
    </nav>

    </div>
  );
}
