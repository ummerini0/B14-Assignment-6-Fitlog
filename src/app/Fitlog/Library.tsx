import LibraryGrid from "../components/LibraryGrid";
import localExercises from "@/data/exercises.json";
import type { Exercise } from "@/types";

async function getExercises(): Promise<Exercise[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API request failed: ${res.status}`);
    return res.json();
  } catch {
    return localExercises as Exercise[];
  }
}

async function Library() {
  const exercises = await getExercises();

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-[#ccff00] text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
        The Library
      </h2>
      <p className="text-gray-400 mt-2 mb-8">
        Twelve lifts covering every major muscle group.
      </p>

      <LibraryGrid exercises={exercises} />
    </section>
  );
}

export default Library;