import { ExerciseDto } from "@/types/exercise";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { BookOpenTextIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ExerciseSummary({
  exercise,
  onReadClick
}: {
  exercise: ExerciseDto
  onReadClick?: () => void
}) {
  return (
    <div className="flex flex-row gap-2 w-full">
      <Image src={exercise.images[exercise.images.length - 1]}
        alt={exercise.name}
        width={100}
        height={100}
        className="w-20 h-20 object-cover border-2 border-border"
      />
      <div className="flex-1 p-1 flex-shrink-1">
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
        </div>
      </div>
      {
        onReadClick && (
          <Button variant="neutralNoShadow" onClick={onReadClick} className="mt-2 mr-2 p-0 w-8 h-8">
            <BookOpenTextIcon className="w-6 h-6" />
          </Button>
        )
      }
    </div>
  );
}
