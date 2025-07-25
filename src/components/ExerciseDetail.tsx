import { ExerciseDto } from "@/types/exercise";
import WidthRestrict from "./WidthRestrict";

export function ExerciseDetail({ exercise }: { exercise: ExerciseDto }) {
  return (
    <WidthRestrict>
      <div>
        <h1>{exercise.name}</h1>
      </div>
    </WidthRestrict>
  );
}
