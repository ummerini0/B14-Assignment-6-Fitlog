"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import type { Exercise } from "@/types";

type SortOption = "duration" | "caloriesBurned" | "rating";

const sortLabels: Record<SortOption, string> = {
  duration: "Duration",
  caloriesBurned: "Calories",
  rating: "Rating",
};

export default function LibraryGrid({ exercises }: { exercises: Exercise[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sortedExercises = [...exercises].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <div className="relative inline-block">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-[#141519] text-white text-sm font-medium border border-white/10 rounded-lg pl-4 pr-9 py-2.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ccff00]"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((option) => (
              <option key={option} value={option}>
                Sort By: {sortLabels[option]}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedExercises.map((exercise) => (
          <WorkoutCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}