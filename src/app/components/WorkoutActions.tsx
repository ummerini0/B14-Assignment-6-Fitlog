"use client";

import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import type { Exercise } from "@/types";

export default function WorkoutActions({ exercise }: { exercise: Exercise }) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const handleAddToPlan = () => {
    if (plan.some((e) => e.id === exercise.id)) {
      toast.error("Already in your plan");
      return;
    }
    addToPlan(exercise);
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    if (saved.some((e) => e.id === exercise.id)) {
      toast.error("Already saved");
      return;
    }
    addToSaved(exercise);
    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleAddToPlan}
        className="flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
        Add to today&apos;s plan
      </button>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14v18l-7-5-7 5V3z" />
        </svg>
        Save for later
      </button>
    </div>
  );
}