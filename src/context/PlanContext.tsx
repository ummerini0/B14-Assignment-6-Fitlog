"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Exercise } from "@/types";

type PlanContextType = {
  plan: Exercise[];
  saved: Exercise[];
  doneIds: number[];
  addToPlan: (exercise: Exercise) => void;
  addToSaved: (exercise: Exercise) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Exercise[]>(() => loadFromStorage("fitlog-plan", []));
  const [saved, setSaved] = useState<Exercise[]>(() => loadFromStorage("fitlog-saved", []));
  const [doneIds, setDoneIds] = useState<number[]>(() => loadFromStorage("fitlog-done", []));

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [doneIds]);

  const addToPlan = (exercise: Exercise) =>
    setPlan((prev) => (prev.some((e) => e.id === exercise.id) ? prev : [...prev, exercise]));

  const addToSaved = (exercise: Exercise) =>
    setSaved((prev) => (prev.some((e) => e.id === exercise.id) ? prev : [...prev, exercise]));

  const removeFromPlan = (id: number) => setPlan((prev) => prev.filter((e) => e.id !== id));
  const removeFromSaved = (id: number) => setSaved((prev) => prev.filter((e) => e.id !== id));
  const markDone = (id: number) =>
    setDoneIds((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  return (
    <PlanContext.Provider
      value={{ plan, saved, doneIds, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}