import { Star, Clock, Flame } from "lucide-react";
import type { Exercise } from "@/types";
import Image from "next/image";

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400",
  Intermediate: "bg-yellow-500/10 text-yellow-400",
  Advanced: "bg-red-500/10 text-red-400",
};

export default function WorkoutCard({ exercise }: { exercise: Exercise }) {
  return (
    <div className="bg-[#141519] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
      <Image
        src={exercise.image}
        alt={exercise.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold">{exercise.name}</h3>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
              difficultyColors[exercise.difficulty] ?? "bg-gray-500/10 text-gray-400"
            }`}
          >
            {exercise.difficulty}
          </span>
        </div>

        <p className="text-gray-400 text-sm mt-2 flex-1">
          {exercise.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {exercise.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-gray-300"
            >
              {muscle}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {exercise.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {exercise.caloriesBurned} cal
          </span>
          <span className="flex items-center gap-1 text-white font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#ccff00] text-[#ccff00]" />
            {exercise.rating}
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {exercise.sets} sets × {exercise.reps} reps · {exercise.equipment}
        </p>
      </div>
    </div>
  );
}