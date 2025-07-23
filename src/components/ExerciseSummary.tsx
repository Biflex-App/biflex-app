import { ExerciseDto } from "@/services/exerciseService";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function ExerciseSummary({
  exercise
}: {
  exercise: ExerciseDto
}) {
  console.log(exercise.images[0]);
  return (
    <div className="flex flex-row gap-4 mb-4">
      <Image src={exercise.images[0]}
        alt={exercise.name}
        width={100}
        height={100}
        className="w-24 h-24 object-cover border-2 border-border"
      />
      <div>
        <h2 className="mb-2">{exercise.name}</h2>
        <div className="flex flex-row gap-2 flex-wrap">
          {
            exercise.primaryMuscles.map((muscle) => (
              <Badge key={muscle}>
                {muscle}
              </Badge>
            ))
          }
        </div>
      </div>
    </div>
  );
}
