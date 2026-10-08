"use client";

import { useMemo, useState } from "react";

import { useProblems } from "@/components/hooks/problem.hook";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Pagination from "./_components/Pagination";
import ProblemList from "./_components/ProblemList";
import SearchFilters from "./_components/SearchFilters";

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [difficulty, setDifficulty] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const limit = 9;

  const hasFilters =
    search !== "" ||
    category !== "ALL" ||
    difficulty !== "ALL" ||
    type !== "ALL";

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

  const problems = data?.data ?? [];
  const meta = data?.meta;

  console.log(problems,"li");

  // Get unique categories from backend problems
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();

    problems.forEach((problem) => {
      if (problem.category) {
        uniqueCategories.add(problem.category);
      }
    });

    return Array.from(uniqueCategories).sort();
  }, [problems]);

  const clearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setDifficulty("ALL");
    setType("ALL");
    setSortOrder("asc");
    setPage(1);
  };

  console.log("PROBLEMS:", problems);
  console.log(
    "CATEGORIES:",
    problems.map((problem) => problem.category),
  );

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
          categories={categories}
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
              <div className="flex min-h-50 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Loading problems...
                </p>
              </div>
            ) : problems.length === 0 ? (
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
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <ProblemList problems={problems} />

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