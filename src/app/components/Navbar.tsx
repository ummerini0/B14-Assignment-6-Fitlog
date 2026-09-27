"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { label: "Workouts", href: "/#library" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const { plan, saved } = usePlan();

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setHash(window.location.hash);
  const handleHashChange = () => setHash(window.location.hash);
  window.addEventListener("hashchange", handleHashChange);
  return () => window.removeEventListener("hashchange", handleHashChange);
}, []);

  const isLinkActive = (href: string) => {
    if (href.includes("#")) {
      const [path, hashPart] = href.split("#");
      return pathname === (path || "/") && hash === `#${hashPart}`;
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <span className="text-white font-extrabold text-lg tracking-wide">
          FITLOG
        </span>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setHash(link.href.includes("#") ? `#${link.href.split("#")[1]}` : "")}
                  className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-[#2a3a1a] text-[#ccff00]"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop status badges */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-400">Plan</span>
            <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-[#ccff00] rounded-full">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400">Saved</span>
            <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-300 border border-gray-500 rounded-full">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-gray-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 space-y-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setHash(link.href.includes("#") ? `#${link.href.split("#")[1]}` : "");
                    }}
                    className={`block text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                      isActive
                        ? "bg-[#2a3a1a] text-[#ccff00]"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-6 pt-2 border-t border-white/10">
            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-medium text-blue-400">Plan</span>
              <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-[#ccff00] rounded-full">
                {plan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-medium text-gray-400">Saved</span>
              <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-300 border border-gray-500 rounded-full">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}