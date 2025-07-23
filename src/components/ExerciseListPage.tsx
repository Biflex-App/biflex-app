'use client';

import { useExercises } from "@/hooks/exercise";
import { useState } from "react";

export default function ExerciseListPage() {
  const [displayLength, setDisplayLength] = useState(10);
  const { data: exercises, isLoading } = useExercises();

  function increaseDisplayLength() {
    setDisplayLength(Math.min(displayLength + 10, exercises?.length ?? 0));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Exercise List</h1>
      {exercises?.slice(0, displayLength).map((exercise) => (
        <div key={exercise._id}>
          <h2>{exercise.name}</h2>
        </div>
      ))}
    </div>
  );
}
