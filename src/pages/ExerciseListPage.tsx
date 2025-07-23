'use client';

import { useExercises } from "@/hooks/exercise";
import InfiniteScroll from "../components/InfiniteScroll";
import { ExerciseDto } from "@/services/exerciseService";
import { useCallback, useState } from "react";
import { Spinner } from "../components/ui/spinner";

export default function ExerciseListPage() {
  const { data: exercises, isLoading } = useExercises();
  const [displayLength, setDisplayLength] = useState(10);

  const increaseDisplayLength = useCallback(() => {
    setDisplayLength(d => {
      if (!exercises?.length) {
        return 0;
      }
      return Math.min(d + 10, exercises.length);
    });
  }, [exercises?.length]);

  const renderExercise = (exercise: ExerciseDto) => (
    <div key={exercise._id}>
      <h2>{exercise.name}</h2>
    </div>
  );

  return (
    <div>
      <h1>Exercise List</h1>
      <InfiniteScroll
        items={exercises?.slice(0, displayLength)}
        isLoading={isLoading}
        renderItem={renderExercise}
        loadMore={increaseDisplayLength}
        loadingComponent={<Spinner />}
        hasReachedEnd={displayLength >= (exercises?.length ?? 0)}
      />
    </div>
  );
}
