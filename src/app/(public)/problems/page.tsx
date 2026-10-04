"use client";

import Link from "next/link";
import { useState } from "react";

import { useProblems } from "@/components/hooks/problem.hook";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Pagination from "./_components/Pagination";
import SearchFilters from "./_components/SearchFilters";
import { useRouter } from "next/navigation";

export default function ProblemsPage() {
  // Search
  const [search, setSearch] = useState("");
  const router = useRouter();
  // Filters
  const [category, setCategory] = useState("ALL");
  const [difficulty, setDifficulty] = useState("ALL");
  const [type, setType] = useState("ALL");

  // Sorting
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // Active filters
  const hasFilters =
    search !== "" ||
    category !== "ALL" ||
    difficulty !== "ALL" ||
    type !== "ALL";

  // Fetch problems
  const { data, isLoading, isFetching, isError } = useProblems({
    page,
    limit,

    search: search || undefined,

    category: category !== "ALL" ? category : undefined,

    difficulty:
      difficulty !== "ALL"
        ? (difficulty as "EASY" | "MEDIUM" | "HARD")
        : undefined,

    type: type !== "ALL" ? "CODING" : undefined,

    sortOrder,
  });

  // Problems
  const problems = data?.data ?? [];

  // Pagination meta
  const meta = data?.meta;

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Search & Filters */}
        <SearchFilters
          search={search}
          category={category}
          difficulty={difficulty}
          type={type}
          sortOrder={sortOrder}
          setSearch={setSearch}
          setCategory={setCategory}
          setDifficulty={setDifficulty}
          setType={setType}
          setSortOrder={setSortOrder}
          setPage={setPage}
        />

        {/* Problems */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Problems</CardTitle>

                <CardDescription>
                  {meta?.total ?? 0} problems found
                </CardDescription>
              </div>

              {isFetching && !isLoading && (
                <span className="text-xs text-muted-foreground">
                  Updating...
                </span>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {/* Error */}
            {isError ? (
              <div className="flex min-h-50 flex-col items-center justify-center text-center">
                <p className="font-medium text-destructive">
                  Failed to load problems
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Please check your authentication and try again.
                </p>
              </div>
            ) : isLoading ? (
              /* Loading */
              <div className="flex min-h-50 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Loading problems...
                </p>
              </div>
            ) : problems.length === 0 ? (
              /* Empty */
              <div className="flex min-h-50 flex-col items-center justify-center text-center">
                <p className="font-medium">No problems found</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filters.
                </p>

                {hasFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setSearch("");
                      setCategory("ALL");
                      setDifficulty("ALL");
                      setType("ALL");
                      setSortOrder("asc");
                      setPage(1);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                {/* Problem Cards */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {problems.map((problem) => (
                    <Card
                      key={problem.id}
                      className="h-full transition-shadow hover:shadow-md"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <CardTitle className="truncate text-base">
                              {problem.title}
                            </CardTitle>

                            <CardDescription className="mt-1">
                              Created by {problem.createdBy.name}
                            </CardDescription>
                          </div>

                          <Badge variant="outline">{problem.type}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Description */}
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {problem.description}
                        </p>

                        {/* Category & Difficulty */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{problem.category}</Badge>

                          <Badge variant="secondary">
                            {problem.difficulty}
                          </Badge>
                        </div>

                        {/* Time & Memory */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-lg border p-3">
                            <p className="text-xs text-muted-foreground">
                              Time Limit
                            </p>

                            <p className="mt-1 font-medium">
                              {problem.timeLimit} ms
                            </p>
                          </div>

                          <div className="rounded-lg border p-3">
                            <p className="text-xs text-muted-foreground">
                              Memory Limit
                            </p>

                            <p className="mt-1 font-medium">
                              {problem.memoryLimit} MB
                            </p>
                          </div>
                        </div>

                        {/* Details */}

                        <div className="border-t pt-4">
    <Button
      size="sm"
      className="w-full"
      onClick={() => router.push(`/problems/${problem.id}`)}
    >
      Details
    </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {meta && (
                  <Pagination
                    meta={meta}
                    page={page}
                    setPage={setPage}
                    isFetching={isFetching}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
