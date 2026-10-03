
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  X,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProblemsPage() {
  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [category, setCategory] = useState("ALL");
  const [difficulty, setDifficulty] = useState("ALL");
  const [type, setType] = useState("ALL");

  // Sorting
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination
  const [page, setPage] = useState(1);

  const limit = 10;

  // Fetch problems
  const { data, isLoading, isFetching, isError, error } = useProblems({
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

  console.log("Problems API data:", data);
  console.log("Problems API error:", error);

  // Problems
  const problems = data?.data ?? [];

  // Pagination meta
  const meta = data?.meta;

  // Active filters
  const hasFilters =
    search !== "" ||
    category !== "ALL" ||
    difficulty !== "ALL" ||
    type !== "ALL";

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setDifficulty("ALL");
    setType("ALL");
    setSortOrder("asc");
    setPage(1);
  };

  // Search
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Category
  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  // Difficulty
  const handleDifficulty = (value: string) => {
    setDifficulty(value);
    setPage(1);
  };

  // Type
  const handleType = (value: string) => {
    setType(value);
    setPage(1);
  };

  // Sort
  const handleSort = (value: string) => {
    if (value !== "asc" && value !== "desc") {
      return;
    }

    setSortOrder(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Search & Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Search & Filters</CardTitle>

            <CardDescription>
              Find problems by title, category, difficulty, or type.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search by problem title or category..."
                className="pl-9"
              />
            </div>

            {/* Filters */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Category */}
              <Select value={category} onValueChange={handleCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>

                  <SelectItem value="Binary Tree">Binary Tree</SelectItem>

                  <SelectItem value="Dynamic Programming">
                    Dynamic Programming
                  </SelectItem>

                  <SelectItem value="Array">Array</SelectItem>

                  <SelectItem value="String">String</SelectItem>

                  <SelectItem value="Graph">Graph</SelectItem>
                </SelectContent>
              </Select>

              {/* Difficulty */}
              <Select value={difficulty} onValueChange={handleDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Difficulties</SelectItem>

                  <SelectItem value="EASY">Easy</SelectItem>

                  <SelectItem value="MEDIUM">Medium</SelectItem>

                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>

              {/* Type */}
              <Select value={type} onValueChange={handleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>

                  <SelectItem value="CODING">Coding</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortOrder} onValueChange={handleSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="asc">Oldest First</SelectItem>

                  <SelectItem value="desc">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="px-0"
              >
                <X className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            )}
          </CardContent>
        </Card>

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
                    onClick={clearFilters}
                    className="mt-4"
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
                      {/* Card Header */}
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

                      {/* Card Content */}
                      <CardContent className="space-y-4">
                        {/* Description */}
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {problem.description}
                        </p>

                        {/* Category & Difficulty */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {problem.category}
                          </Badge>

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

                        {/* Details Button */}
                        <div className="border-t pt-4">
                          <Button asChild size="sm" className="w-full">
                            <Link href={`/problems/${problem.id}`}>
                              Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Dynamic Pagination */}
                {meta && meta.totalPages > 1 && (
                  <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                    {/* Page Info */}
                    <p className="text-sm text-muted-foreground">
                      Showing page {meta.page} of {meta.totalPages}
                    </p>

                    {/* Pagination */}
                    <div className="flex items-center gap-2">
                      {/* Previous */}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1 || isFetching}
                        onClick={() =>
                          setPage((currentPage) => currentPage - 1)
                        }
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Previous
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: meta.totalPages },
                          (_, index) => index + 1,
                        ).map((pageNumber) => (
                          <Button
                            key={pageNumber}
                            variant={
                              pageNumber === page ? "default" : "outline"
                            }
                            size="sm"
                            className="h-9 w-9"
                            disabled={isFetching}
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        ))}
                      </div>

                      {/* Next */}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          page >= meta.totalPages || isFetching
                        }
                        onClick={() =>
                          setPage((currentPage) => currentPage + 1)
                        }
                      >
                        Next
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
