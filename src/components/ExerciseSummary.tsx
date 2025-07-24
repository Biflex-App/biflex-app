import { ExerciseDto } from "@/types/exercise";
import { Badge } from "./ui/badge";
import { BookOpenTextIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import LoadingImage from "./LoadingImage";

export default function ExerciseSummary({
  exercise,
  onReadClick,
  truncateName
}: {
  exercise: ExerciseDto
  onReadClick?: () => void
  truncateName?: boolean
}) {
  return (
    <div className="flex flex-row gap-1 w-full">
      <div>
        <LoadingImage
          src={exercise.images[exercise.images.length - 1]}
          alt={exercise.name}
          width={80}
          height={80}
          className="w-20 h-20 border-2 border-border flex-shrink-0"
          spinnerSize="lg"
          transitionDuration={1000}
        />
      </div>
      <div className="flex-1 p-1 min-w-0">
        <div className={cn("mb-1", truncateName && "truncate")}>{exercise.name}</div>
        <div className="flex flex-row gap-2">
          <div className="flex-1 flex flex-row gap-2 flex-wrap items-start min-w-0">
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
          <Button variant="neutralNoShadow" onClick={onReadClick} className="mt-2 mr-2 p-0 w-8 h-8 flex-shrink-0">
            <BookOpenTextIcon className="w-6 h-6" />
          </Button>
        )
      }
    </div>
  );
}
