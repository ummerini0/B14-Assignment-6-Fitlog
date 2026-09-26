"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, Flame, Star } from "lucide-react";
import type { Exercise } from "@/types";


const muscleColors: Record<string, string> = {
  Chest: "bg-emerald-400 text-black",
  Back: "bg-blue-400 text-black",
  Legs: "bg-orange-400 text-black",
  Arms: "bg-yellow-300 text-black",
  Shoulders: "bg-purple-400 text-black",
  Core: "bg-pink-400 text-black",
  "Full Body": "bg-cyan-400 text-black",
};

export default function WorkoutCard({ exercise }: { exercise: Exercise }) {
  const [imgSrc, setImgSrc] = useState(exercise.image);

  return (
    <Link
      href={`/workouts/${exercise.id}`}
      className="group relative block rounded-2xl overflow-hidden aspect-4/5"
    >
      <img
        src={imgSrc}
        alt={exercise.name}
        onError={() =>
          setImgSrc(`https://picsum.photos/seed/${exercise.id}/400/500`)
        }
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
        {exercise.muscleGroups.map((muscle) => (
          <span
            key={muscle}
            className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
              muscleColors[muscle] ?? "bg-gray-300 text-black"
            }`}
          >
            {muscle}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-[#ccff00] font-extrabold uppercase text-sm sm:text-base leading-tight">
          {exercise.name}
        </h3>
        <p className="text-gray-300 text-xs mt-1">{exercise.equipment}</p>

        <div className="flex items-center gap-3 mt-3 text-xs text-gray-300">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {exercise.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {exercise.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-white font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#ccff00] text-[#ccff00]" />
            {exercise.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}