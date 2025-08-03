// components/Layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-bold text-[#073C83]">
          <Link href="/">MAindTec</Link>
        </h1>
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-300 object-cover"
          />
          <span className="hidden sm:block text-sm font-medium">Rohit Rai</span>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t mt-auto">
        © 2025 MAindTec. All rights reserved.
      </footer>
    </div>
  );
}
