import WorkoutActions from "@/app/components/WorkoutActions";
import localExercises from "@/data/exercises.json";
import type { Exercise } from "@/types";
import DetailImage from "@/app/components/DetailImage";

async function getExercise(id: string): Promise<Exercise | undefined> {
  let exercises: Exercise[];
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API request failed: ${res.status}`);
    exercises = await res.json();
  } catch {
    exercises = localExercises as Exercise[];
  }
  return exercises.find((e) => String(e.id) === id);
}

const muscleColors: Record<string, string> = {
  Chest: "bg-emerald-400 text-black",
  Back: "bg-blue-400 text-black",
  Legs: "bg-orange-400 text-black",
  Arms: "bg-yellow-300 text-black",
  Shoulders: "bg-purple-400 text-black",
  Core: "bg-pink-400 text-black",
  "Full Body": "bg-cyan-400 text-black",
};

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = await getExercise(id);

  if (!exercise) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-white text-2xl font-bold uppercase">
          Workout Not Found
        </h1>
        <p className="text-gray-400 mt-3">
          This workout doesn&apos;t exist or may have been removed.
        </p>
      </section>
    );
  }

  const specs = [
    { label: "EQUIPMENT", value: exercise.equipment },
    { label: "DIFFICULTY", value: exercise.difficulty },
    { label: "SETS", value: exercise.sets },
    { label: "REPS", value: exercise.reps },
    { label: "DURATION", value: `${exercise.duration} min` },
    { label: "CALORIES", value: `${exercise.caloriesBurned} kcal` },
    { label: "RATING", value: exercise.rating },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* Left: image */}
      <DetailImage
  src={exercise.image}
  alt={exercise.name}
  fallbackSeed={exercise.id}
/>

      {/* Right: details */}
      <div>
        <h1 className="text-white text-3xl sm:text-4xl font-extrabold uppercase">
          {exercise.name}
        </h1>
        <p className="text-gray-400 mt-3">{exercise.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {exercise.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                muscleColors[muscle] ?? "bg-gray-300 text-black"
              }`}
            >
              {muscle}
            </span>
          ))}
        </div>

        <div className="mt-6 bg-[#141519] rounded-xl border border-white/10 divide-y divide-white/10">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between px-5 py-3 text-sm"
            >
              <span className="text-gray-400 tracking-wide">
                {spec.label}
              </span>
              <span className="text-white font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>

        <h2 className="text-white font-bold uppercase mt-8 mb-3">
          Instructions
        </h2>
        <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
          {exercise.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <WorkoutActions exercise={exercise} />
      </div>
    </section>
  );
}