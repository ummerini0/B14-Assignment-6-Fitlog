import WorkoutCard from "../components/WorkoutCard";
import type { Exercise } from "@/types";

async function getExercises(): Promise<Exercise[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_EXERCISE_API_URL!);
  return res.json();
}

export default async function WorkoutsPage() {
  const exercises = await getExercises();

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-white text-3xl font-bold mb-8">Workout Library</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exercises.map((exercise) => (
          <WorkoutCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </section>
  );
}