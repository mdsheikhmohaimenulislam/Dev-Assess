"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateProfileSkeleton() {
  return (
    <section className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          {/* Profile Header */}
          <div className="border-b p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <Skeleton className="h-24 w-24 rounded-full" />

              <div className="space-y-3">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-64" />

                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="border-b p-6 sm:p-8">
            <Skeleton className="mb-6 h-6 w-48" />

            <div className="grid gap-6 sm:grid-cols-2">
              {["1","2","3","4","5","6","7","8","9","10","11","12"].map((number) => (
                <div key={number} className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-40" />
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Information */}
          <div className="p-6 sm:p-8">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-72" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {["1","2","3","4","5"].map((index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}