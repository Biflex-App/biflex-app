'use client';

import { useExercises } from "@/hooks/exercise";
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";

export default function ExerciseListPage() {
  const [displayLength, setDisplayLength] = useState(10);
  const { data: exercises, isLoading } = useExercises();
  const loader = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const increaseDisplayLength = useCallback(() => {
    setDisplayLength(d => {
      if (!exercises?.length) {
        return 0;
      }

      const newLength = Math.min(d + 10, exercises.length);
      return newLength;
    });
  }, [exercises?.length]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && exercises && displayLength < exercises.length) {
          increaseDisplayLength();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const loaderElement = loader.current;
    if (loaderElement) {
      observerRef.current.observe(loaderElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, exercises, displayLength, increaseDisplayLength]);

  // Reset display length when exercises change
  useEffect(() => {
    setDisplayLength(10);
  }, [exercises]);

  return (
    <div>
      <h1>Exercise List</h1>
      {!isLoading && exercises?.slice(0, displayLength).map((exercise) => (
        <div key={exercise._id}>
          <h2>{exercise.name}</h2>
        </div>
      ))}
      {exercises && displayLength < exercises.length && (
        <div ref={loader}>
          {
            displayLength < exercises?.length && <Spinner/>
          }
        </div>
      )}
    </div>
  );
}
