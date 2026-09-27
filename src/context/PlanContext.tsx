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

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Exercise[]>([]);
  const [saved, setSaved] = useState<Exercise[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);

  // Load from localStorage only after mounting, so server and client
  // render the same empty state first (avoids hydration mismatch).
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedDone = localStorage.getItem("fitlog-done");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedDone) setDoneIds(JSON.parse(storedDone));
    } catch {
      // ignore malformed localStorage data
    }
  }, []);

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