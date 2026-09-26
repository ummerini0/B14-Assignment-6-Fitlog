import logo from '@/assest/banner.png'
import Image from "next/image";
export default function Footer() 
{
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FitLog logo" className="w-6 h-6 object-contain" />
          <span className="text-white font-extrabold tracking-wide text-sm">
            FITLOG
          </span>
        </div>

        <p className="text-gray-400 text-xs text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}