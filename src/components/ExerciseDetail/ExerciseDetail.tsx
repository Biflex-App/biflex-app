import { ExerciseDto } from "@/types/exercise";
import WidthRestrict from "../WidthRestrict";
import ExerciseCarousel from "./ExerciseCarousel";

export function ExerciseDetail({ exercise }: { exercise: ExerciseDto }) {
  return (
    <WidthRestrict>
      <div>
        <h1>{exercise.name}</h1>
        <ExerciseCarousel exercise={exercise} />
      </div>
    </WidthRestrict>
  );
}
