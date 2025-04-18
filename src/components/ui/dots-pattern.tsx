import { cn } from "@/lib/utils"

interface DotsPatternProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DotsPattern({ className, ...props }: DotsPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-50",
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
        className
      )}
      {...props}
    />
  )
} 