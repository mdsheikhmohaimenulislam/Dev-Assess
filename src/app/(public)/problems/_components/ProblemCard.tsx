"use client";

import { useRouter } from "next/navigation";
import {
  CircleDollarSign,
  Clock3,
  Code2,
  LockKeyhole,
  UnlockKeyhole,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Problem } from "@/components/types";

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  const router = useRouter();

  const difficultyVariant =
    problem.difficulty === "EASY"
      ? "outline"
      : problem.difficulty === "MEDIUM"
        ? "secondary"
        : "destructive";

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      {/* Header */}
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="line-clamp-1 text-base">
              {problem.title}
            </CardTitle>

            <CardDescription className="mt-2 flex items-center gap-1">
              <UserRound className="h-3.5 w-3.5" />
              <span className="truncate">
                {problem.createdBy.name}
              </span>
            </CardDescription>
          </div>

          <Badge variant="outline" className="shrink-0 gap-1">
            <Code2 className="h-3 w-3" />
            {problem.type}
          </Badge>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col space-y-4">
        {/* Description */}
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {problem.description}
        </p>

        {/* Category / Difficulty / Access */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{problem.category}</Badge>

          <Badge variant={difficultyVariant}>
            {problem.difficulty}
          </Badge>

          {problem.isPaid ? (
            <Badge variant="destructive" className="gap-1">
              <LockKeyhole className="h-3 w-3" />
              Paid

              {problem.price !== null && (
                <span>${problem.price}</span>
              )}
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1">
              <UnlockKeyhole className="h-3 w-3" />
              Free
            </Badge>
          )}
        </div>

        {/* Time & Memory */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-muted-foreground" />

              <p className="text-xs text-muted-foreground">
                Time Limit
              </p>
            </div>

            <p className="mt-2 font-medium">
              {problem.timeLimit} ms
            </p>
          </div>

          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">
                RAM
              </span>

              <p className="text-xs text-muted-foreground">
                Memory Limit
              </p>
            </div>

            <p className="mt-2 font-medium">
              {problem.memoryLimit} MB
            </p>
          </div>
        </div>

        {/* Marks & Price */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Marks
            </p>

            <p className="mt-1 font-semibold">
              {problem.marks}
            </p>
          </div>

          {problem.isPaid && problem.price !== null && (
            <div className="flex items-center gap-1 text-sm font-semibold">
              <CircleDollarSign className="h-4 w-4" />
              {problem.price}
            </div>
          )}
        </div>

        {/* Details */}
        <Button
          size="sm"
          className="mt-auto w-full"
          onClick={() => router.push(`/problems/${problem.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}