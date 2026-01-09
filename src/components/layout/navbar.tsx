"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => setMounted(true), []);

  const categories = [
    "Education", "Cricket", "Business", "Health", 
    "Transport", "Crime", "Weather", "Law and Order", 
    "Culture", "Environment"
  ];

  if (!mounted) return null;

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300
      ${theme === 'light' 
        ? 'bg-[#3D3B8E] border-[#6883BA] text-[#F9F9F9]' 
        : 'bg-zinc-950 border-zinc-800 text-zinc-100'
      }`}>
      
      {/* Top Bar */}
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase">
          News<span className={theme === 'light' ? 'text-[#6883BA]' : 'text-blue-500'}>Nest</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className={`hidden sm:block text-[10px] font-bold uppercase tracking-widest border-r pr-4 
            ${theme === 'light' ? 'border-[#6883BA]/30 text-[#F9F9F9]/70' : 'border-zinc-800 text-zinc-500'}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-full transition-colors
              ${theme === 'light' ? 'hover:bg-[#6883BA]/20' : 'hover:bg-zinc-800'}`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Category Bar */}
      <div className={`border-t ${theme === 'light' ? 'border-[#6883BA]/20' : 'border-zinc-900'}`}>
        <div className="container mx-auto px-6 py-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 items-center min-w-max">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors whitespace-nowrap
                  ${theme === 'light' 
                    ? 'text-[#F9F9F9] hover:text-[#6883BA]' 
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}