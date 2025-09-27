import { ExerciseDto } from "@/types/exercise";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import LoadingImage from "../LoadingImage";

export default function ExerciseCarousel(
  { exercise } : { exercise: ExerciseDto }
) {
  return (
    <div className="w-full flex-col items-center gap-4 flex">
      <Carousel className="w-full max-w-[300px]">
        <CarouselContent>
          {exercise.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-[10px]">
                <LoadingImage
                  src={image}
                  alt={`${exercise.name} image ${index + 1}`}
                  width={300}
                  height={300}
                  className="border-2 border-border w-full h-auto"
                  spinnerSize="lg"
                  transitionDuration={1000}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
