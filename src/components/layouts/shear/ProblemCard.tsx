
"use client";

import { useRouter } from "next/navigation";

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

  return (
    <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
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
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {problem.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{problem.category}</Badge>

          <Badge variant="secondary">{problem.difficulty}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Time Limit</p>

            <p className="mt-1 font-medium">{problem.timeLimit} ms</p>
          </div>

          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Memory Limit</p>

            <p className="mt-1 font-medium">{problem.memoryLimit} MB</p>
          </div>
        </div>

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
  );
}
