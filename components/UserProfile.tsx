"use client";

import { useState } from "react";
import Link from "next/link";

export default function UserProfile() {
  const [user] = useState({
    name: "Rohit Rai",
    email: "rohit@example.com",
    avatar:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
  });

  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{
        background: "linear-gradient(180deg, #073C83, #7A2357, #D20F35)",
      }}
    >
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm sticky top-0 bg-white bg-opacity-80 backdrop-blur z-50">
        <h1 className="text-2xl font-bold text-[#073C83]">
          <Link href="/">MAindTec</Link>
        </h1>
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-300 object-cover"
          />
          <span className="hidden sm:block text-sm font-medium">
            {user.name}
          </span>
        </div>
      </header>

      {/* Profile Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <section className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-gray-100 text-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 mx-auto rounded-full border border-gray-300 object-cover"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>

          <div className="mt-6 flex justify-center space-x-4">
            <button className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition">
              Edit Profile
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow hover:from-gray-200 hover:to-gray-300 transition">
              Log Out
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t mt-auto bg-white bg-opacity-60">
        © 2025 MAindTec. All rights reserved.
      </footer>
    </div>
  );
}
