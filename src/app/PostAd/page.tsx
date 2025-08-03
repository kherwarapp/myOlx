'use client';

import { useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from '../_components/firebaseConfig';
import imageCompression from 'browser-image-compression';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default function PostAdPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!title.trim() || title.length < 20) {
      setError('Title must be at least 20 characters.');
      titleRef.current?.focus();
      return;
    }

    if (!desc.trim() || !price || !category || !location || !phone.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!image) {
      setError('Please upload an image.');
      return;
    }

    try {
      // ✅ Compress image before upload
      const compressedImage = await imageCompression(image, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      // ✅ Upload to Firebase Storage
      const imageRef = ref(storage, `adsImages/${Date.now()}_${compressedImage.name}`);
      const snapshot = await uploadBytes(imageRef, compressedImage);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // ✅ Save ad to Firestore
      await addDoc(collection(db, 'ads'), {
        title,
        description: desc,
        price: parseFloat(price),
        category,
        location,
        phone,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      // ✅ Reset form
      setSuccess('Ad posted successfully!');
      setTitle('');
      setDesc('');
      setPrice('');
      setCategory('');
      setLocation('');
      setPhone('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setError('Failed to post ad. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Post an Ad</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded" role="status">
            {success}
          </div>
        )}

        <form onSubmit={handlePost} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              id="title"
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              placeholder="Minimum 20 characters"
              required
            />
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium">Description</label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium">Price (INR)</label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              required
            >
              <option value="">Select a category</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Furniture">Furniture</option>
              <option value="Jobs">Jobs</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              required
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium">Upload Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Post Ad
          </button>
        </form>
      </div>
    </div>
  );
}
