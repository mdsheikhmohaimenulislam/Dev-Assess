"use client";

import { Search, X } from "lucide-react";

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

interface SearchFiltersProps {
  search: string;
  category: string;
  difficulty: string;
  type: string;
  sortOrder: "asc" | "desc";

  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setDifficulty: (value: string) => void;
  setType: (value: string) => void;
  setSortOrder: (value: "asc" | "desc") => void;

  setPage: (page: number) => void;
}

export default function SearchFilters({
  search,
  category,
  difficulty,
  type,
  sortOrder,
  setSearch,
  setCategory,
  setDifficulty,
  setType,
  setSortOrder,
  setPage,
}: SearchFiltersProps) {
  const hasFilters =
    search !== "" ||
    category !== "ALL" ||
    difficulty !== "ALL" ||
    type !== "ALL";

  const clearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setDifficulty("ALL");
    setType("ALL");
    setSortOrder("asc");
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value: string | null) => {
    if (value === null) return;

    setCategory(value);
    setPage(1);
  };

  const handleDifficulty = (value: string | null) => {
    if (value === null) return;

    setDifficulty(value);
    setPage(1);
  };

  const handleType = (value: string | null) => {
    if (value === null) return;

    setType(value);
    setPage(1);
  };

  const handleSort = (value: "asc" | "desc" | null) => {
    if (value === null) {
      return;
    }

    setSortOrder(value);
    setPage(1);
  };

  return (
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
  );
}
