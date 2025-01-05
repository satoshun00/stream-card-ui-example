import { Skeleton } from "@/components/ui/skeleton"

export function NameSkeleton() {
  return <Skeleton className="h-6 w-3/4" />
}

export function HPSkeleton() {
  return <Skeleton className="h-6 w-16" />
}

export function ImageSkeleton() {
  return <Skeleton className="w-full aspect-square rounded-lg" />
}

export function MoveNameSkeleton() {
  return <Skeleton className="h-5 w-1/2" />
}

export function MovePowerSkeleton() {
  return <Skeleton className="h-5 w-16" />
}

export function DescriptionSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="w-64 p-3 border rounded-lg bg-white/80 space-y-3">
      <div className="flex justify-between items-center">
        <NameSkeleton />
        <HPSkeleton />
      </div>
      <ImageSkeleton />
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <MoveNameSkeleton />
          <MovePowerSkeleton />
        </div>
        <DescriptionSkeleton />
      </div>
    </div>
  )
}

