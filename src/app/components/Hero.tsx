import { ArrowRight } from "lucide-react";
import banner from '@/assest/banner.png'
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      <div className="bg-[#141519] rounded-3xl px-6 sm:px-10 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center overflow-hidden">
        <div>
          <p className="text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-4">
            Workout Library
          </p>

          <h1
            className="text-white text-3xl sm:text-4xl md:text-6xl font-bold uppercase leading-[1.05]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Train With Intent. Log Every Set.
          </h1>

          <p className="text-gray-400 mt-6 max-w-md text-sm sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2 mt-8 bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Browse Workouts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex justify-center">
          <Image src={banner} alt="Anatomical figure training on an exercise bike" className="w-full max-w-xs md:max-w-sm"/>
            
           
            
          
        </div>
      </div>
    </section>
  );
}