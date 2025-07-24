import Image from "next/image";
import { useState, useEffect } from "react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  spinnerSize?: "sm" | "md" | "lg";
  transitionDuration?: number;
}

export default function LoadingImage({
  src,
  alt,
  width,
  height,
  className = "",
  spinnerSize = "lg",
  transitionDuration = 500
}: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
  }, []);

  return (
    <div>
      {isLoading && (
        <div className={cn("flex items-center justify-center", className)}>
          <Spinner
            size={spinnerSize}
            className={cn(
              `transition-opacity duration-${transitionDuration}`,
              showSpinner ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={isLoading ? 0 : width}
        height={isLoading ? 0 : height}
        className={cn(
          "object-cover",
          isLoading
            ? "w-0 h-0"
            : className
        )}
        onLoad={() => {
          setIsLoading(false);
          setShowSpinner(false);
        }}
      />
    </div>
  );
}
