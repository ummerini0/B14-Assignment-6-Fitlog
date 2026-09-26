
import WorkoutCard from "../components/WorkoutCard";
import type { Exercise } from "@/types";

async function Library() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const exercises: Exercise[] = await res.json();

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-[#ccff00] text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
        The Library
      </h2>
      <p className="text-gray-400 mt-2 mb-8">
        Twelve lifts covering every major muscle group.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {exercises.map((exercise) => (
          <WorkoutCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </section>
  );
}

export default Library;