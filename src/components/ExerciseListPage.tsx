'use client';

import { useExercises } from "@/hooks/exercise";

export default function ExerciseListPage() {
  const { data: exercises, isLoading } = useExercises();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Exercise List</h1>
      {exercises?.map((exercise) => (
        <div key={exercise._id}>
          <h2>{exercise.name}</h2>
        </div>
      ))}
    </div>
  );
}
