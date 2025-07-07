import { cn } from "@/lib/utils"

interface SpinnerProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "lg"
}

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <div
      data-slot="spinner"
      className={cn(
        "animate-spin rounded-full border-2 border-background border-t-border",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  )
}

export { Spinner }
