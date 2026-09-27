import WorkoutCard from "./WorkoutCard";
import type { Exercise } from "@/types";

export default function LibraryGrid({ exercises }: { exercises: Exercise[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {exercises.map((exercise) => (
        <WorkoutCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}