'use client';

import { useExercises } from "@/hooks/exercise";
import InfiniteScroll from "../InfiniteScroll";
import { ExerciseDto } from "@/types/exercise";
import { useCallback, useMemo, useState } from "react";
import { Spinner } from "../ui/spinner";
import ExerciseSummary from "@/components/ExerciseSummary";
import { Card, CardContent } from "@/components/ui/card";

export default function ExerciseListPage() {
  const { data: exercises, isLoading } = useExercises();
  const [displayLength, setDisplayLength] = useState(10);

  const sortedExercises = useMemo(() => {
    return exercises?.sort((a, b) => a.name.localeCompare(b.name));
  }, [exercises]);

  const displayedExercises = useMemo(() => {
    return sortedExercises?.slice(0, displayLength);
  }, [sortedExercises, displayLength]);

  const increaseDisplayLength = useCallback(() => {
    setDisplayLength(d => {
      if (!exercises?.length) {
        return 0;
      }
      return Math.min(d + 10, exercises.length);
    });
  }, [exercises?.length]);

  const renderExercise = (exercise: ExerciseDto) => (
    <Card key={exercise._id} className="p-0 mb-4">
      <CardContent className="p-0">
        <ExerciseSummary
          exercise={exercise}
          onReadClick={() => {
            console.log("read");
          }}
          truncateName={true}
        />
      </CardContent>
    </Card>
  );

  return (
    <div>
      <h1>Exercise List</h1>
      <InfiniteScroll
        items={displayedExercises}
        isLoading={isLoading}
        renderItem={renderExercise}
        loadMore={increaseDisplayLength}
        loadingComponent={<Spinner />}
        hasReachedEnd={displayLength >= (sortedExercises?.length ?? 0)}
      />
    </div>
  );
}
