
"use client";

import Link from "next/link";

import { useProblems } from "@/components/hooks/problem.hook";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProblemCard from "./ProblemCard";



export default function HomePage() {
  const { data, isLoading, isError } = useProblems({
    page: 1,
    limit: 6,
    sortOrder: "desc",
  });

  const problems = data?.data ?? [];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Practice Coding Problems
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Improve your programming skills by solving coding problems
            designed for developers and candidates.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href="/problems">Explore Problems</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Section Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Latest Problems
              </h2>

              <p className="mt-2 text-muted-foreground">
                Start solving our latest coding problems.
              </p>
            </div>

            <Button asChild variant="outline">
              <Link href="/problems">View All Problems</Link>
            </Button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

                    <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-4 animate-pulse rounded bg-muted" />
                      <div className="h-4 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                    </div>

                    <div className="flex gap-2">
                      <div className="h-6 w-20 animate-pulse rounded bg-muted" />
                      <div className="h-6 w-20 animate-pulse rounded bg-muted" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 animate-pulse rounded-lg bg-muted" />
                      <div className="h-16 animate-pulse rounded-lg bg-muted" />
                    </div>

                    <div className="h-9 animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div className="flex min-h-50 items-center justify-center rounded-lg border">
              <div className="text-center">
                <p className="font-medium text-destructive">
                  Failed to load problems
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Please try again later.
                </p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && problems.length === 0 && (
            <div className="flex min-h-50 items-center justify-center rounded-lg border">
              <div className="text-center">
                <p className="font-medium">No problems found</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  There are no coding problems available yet.
                </p>
              </div>
            </div>
          )}

          {/* Problems */}
          {!isLoading && !isError && problems.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
