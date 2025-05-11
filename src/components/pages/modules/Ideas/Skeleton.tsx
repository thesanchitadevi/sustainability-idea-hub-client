"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const CardSkeleton = () => {
  return (
    <Card className="overflow-hidden group relative h-full flex flex-col transition-shadow">
      {/* Content Skeleton */}
      <div className="p-4 space-y-3 flex-grow">
        {/* Category Badge Skeleton */}
        <Skeleton className="h-5 w-20 rounded-full absolute left-2 top-2" />

        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Price Skeleton (conditional) */}
        <Skeleton className="h-5 w-16 mt-2" />
      </div>

      {/* Footer Skeleton */}
      <div className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-6" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-6" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </Card>
  );
};

// Multiple cards loader component
interface CardSkeletonGridProps {
  count?: number;
}

export const CardSkeletonGrid = ({ count = 8 }: CardSkeletonGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};
