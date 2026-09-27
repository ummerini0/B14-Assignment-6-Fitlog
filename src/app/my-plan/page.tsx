"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Flame, Star, X, ChevronDown, Check } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import type { Exercise } from "@/types";
import { toast } from "react-toastify";


type Tab = "today" | "saved";
type SortOption = "duration" | "caloriesBurned" | "rating";

const sortLabels: Record<SortOption, string> = {
  duration: "Duration",
  caloriesBurned: "Calories",
  rating: "Rating",
};

export default function MyPlanPage() {
  const { plan, saved, doneIds, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  // Metrics are always based on Today's Plan, regardless of which tab is active
  const totalMinutes = plan.reduce((sum, e) => sum + e.duration, 0);
  const totalCalories = plan.reduce((sum, e) => sum + e.caloriesBurned, 0);

  const activeList = activeTab === "today" ? plan : saved;
  const sortedList = [...activeList].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-white text-3xl font-bold uppercase">My Plan</h1>
      <p className="text-gray-400 mt-2">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics summary — always reflects Today's Plan */}
      <div className="grid grid-cols-3 gap-4 mt-8 bg-[#141519] border border-white/10 rounded-xl p-6">
        <div>
          <p className="text-gray-400 text-xs uppercase">Exercises</p>
          <p className="text-[#ccff00] text-2xl font-bold mt-1">{plan.length}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase">Minutes</p>
          <p className="text-white text-2xl font-bold mt-1">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase">Calories</p>
          <p className="text-white text-2xl font-bold mt-1">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs + sort */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <div className="flex items-center gap-2 bg-[#141519] border border-white/10 rounded-full p-1">
          <button
            onClick={() => setActiveTab("today")}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${
              activeTab === "today"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="relative inline-block">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-[#141519] text-white text-sm font-medium border border-white/10 rounded-lg pl-4 pr-9 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ccff00]"
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

      {/* List */}
      {sortedList.length === 0 ? (
        <div className="border-2 border-dashed border-white/10 rounded-xl py-16 flex flex-col items-center justify-center gap-3">
          <h3 className="text-white font-bold uppercase">Nothing Here Yet</h3>
          <p className="text-gray-400 text-sm text-center max-w-xs">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-2 bg-[#ccff00] text-black text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedList.map((exercise) => (
            <WorkoutRow
  key={exercise.id}
  exercise={exercise}
  tab={activeTab}
  isDone={doneIds.includes(exercise.id)}
  onRemove={() => {
    activeTab === "today"
      ? removeFromPlan(exercise.id)
      : removeFromSaved(exercise.id);
    toast.info(`${exercise.name} removed`);
  }}
  onMarkDone={() => {
    markDone(exercise.id);
    if (!doneIds.includes(exercise.id)) {
      toast.success(`${exercise.name} marked as done`);
    }
  }}
/>
          ))}
        </div>
      )}
    </section>
  );
}

function WorkoutRow({
  exercise,
  tab,
  isDone,
  onRemove,
  onMarkDone,
}: {
  exercise: Exercise;
  tab: Tab;
  isDone: boolean;
  onRemove: () => void;
  onMarkDone: () => void;
}) {
  return (
    <div className="flex items-center gap-4 bg-[#141519] border border-white/10 rounded-xl p-4">
      <img
        src={`https://picsum.photos/seed/${exercise.id}/80/80`}
        alt={exercise.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold uppercase text-sm truncate">
          {exercise.name}
        </h3>
        <p className="text-gray-400 text-xs mt-1">{exercise.equipment}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {exercise.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {exercise.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#ccff00] text-[#ccff00]" />
            {exercise.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/workouts/${exercise.id}`}
          className="text-xs font-semibold border border-white/20 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-white/5"
        >
          View Details
        </Link>

        {tab === "today" && (
          <button
  onClick={onMarkDone}
  className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
    isDone
      ? "bg-gray-700 text-gray-300"
      : "bg-[#ccff00] text-black"
  }`}
>
  <Check className="w-3.5 h-3.5" />
  {isDone ? "Done" : "Mark as Done"}
</button>
        )}

        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-400 p-2"
          aria-label="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}