import { ExerciseDto } from "@/services/exerciseService";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { BookOpenTextIcon } from "lucide-react";

export default function ExerciseSummary({
  exercise,
  onReadClick
}: {
  exercise: ExerciseDto
  onReadClick?: () => void
}) {
  return (
    <div className="flex flex-row gap-4 mb-4 w-full">
      <Image src={exercise.images[exercise.images.length - 1]}
        alt={exercise.name}
        width={100}
        height={100}
        className="w-20 h-20 object-cover border-2 border-border"
      />
      <div className="flex-1">
        <h2 className="mb-2">{exercise.name}</h2>
        <div className="flex flex-row gap-2">
          <div className="flex-1 flex flex-row gap-2 flex-wrap items-start">
            {
              exercise.primaryMuscles.map((muscle) => (
                <Badge key={muscle}>
                  {muscle}
                </Badge>
              ))
            }
          </div>
          {onReadClick && <BookOpenTextIcon className="w-8 h-8" onClick={onReadClick}/>}
        </div>
      </div>
    </div>
  );
}
