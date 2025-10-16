"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* NAVBAR */}
      <nav className="backdrop-blur-lg bg-white/20 border-b border-white/30 text-green-900 fixed w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide text-green-900 drop-shadow-md">
            VegItenary 🌱
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 font-medium">
            <Link
              href="/items"
              className="text-green-900 hover:text-green-700 transition drop-shadow-sm"
            >
              Items
            </Link>

            <Link href="/upload">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition-all"
              >
                Upload Items
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-green-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden backdrop-blur-lg bg-white/30 text-center space-y-4 py-4 border-t border-white/30">
            <Link
              href="/items"
              onClick={() => setMenuOpen(false)}
              className="block text-green-900 font-medium hover:text-green-700 transition"
            >
              Items
            </Link>

            <Link
              href="/upload"
              onClick={() => setMenuOpen(false)}
            >
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition-all">
                Upload Items
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
