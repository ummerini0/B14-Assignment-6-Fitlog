import type { Exercise } from "@/types";


async function getExercise(id: string): Promise<Exercise | undefined> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const exercises: Exercise[] = await res.json();
  return exercises.find((e) => String(e.id) === id);
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = await getExercise(id);

  if (!exercise) {
    return <p className="text-white p-10">Workout not found.</p>;
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-white text-3xl font-bold uppercase">{exercise.name}</h1>
      <img
        src={exercise.image}
        alt={exercise.name}
        onError={(e) => {
          e.currentTarget.src = `https://picsum.photos/seed/${exercise.id}/800/450`;
        }}
        className="rounded-2xl mt-6 w-full aspect-video object-cover"
      />
      <p className="text-gray-400 mt-6">{exercise.description}</p>

      <h2 className="text-white font-semibold mt-8 mb-3">Instructions</h2>
      <ol className="text-gray-300 space-y-2 list-decimal list-inside">
        {exercise.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </section>
  );
}