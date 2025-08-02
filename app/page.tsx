// pages/index.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-bold text-[#073C83]">MAindTec</h1>
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-300 object-cover"
          />
          <span className="hidden sm:block text-sm font-medium">Rohit Rai</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#073C83] via-[#7A2357] to-[#D20F35] px-6 py-20 text-white">
        <div className="max-w-2xl text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Chat With Your Codebase Locally
          </h2>
          <p className="text-lg sm:text-xl text-white/80">
            Browse your projects, interact with your files, and get AI insights
            — all in your browser. Fully local. No backend needed.
          </p>
          <Link href="/projects">
            <button className="inline-block mt-4 px-6 py-3 bg-white text-[#073C83] rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-100">
              🚀 Get Started
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t mt-auto">
        © 2025 MAindTec. All rights reserved.
      </footer>
    </div>
  );
}
