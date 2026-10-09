
"use client";

import { useRouter } from "next/navigation";
import {
  CheckCircle2,
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
import PaymentButton from "@/app/(dashboard)/_components/payment/PaymentButton";

interface ProblemCardProps {
  problem: Problem;
  hasPaid: boolean;
}

export default function ProblemCard({
  problem,
  hasPaid,
}: ProblemCardProps) {
  const router = useRouter();

  const isUnlocked = !problem.isPaid || hasPaid;

  console.log(isUnlocked);

  const difficultyVariant =
    problem.difficulty === "EASY"
      ? "outline"
      : problem.difficulty === "MEDIUM"
        ? "secondary"
        : "destructive";




  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
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

      <CardContent className="flex flex-1 flex-col space-y-4">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {problem.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{problem.category}</Badge>

          <Badge variant={difficultyVariant}>
            {problem.difficulty}
          </Badge>

          {problem.isPaid ? (
            <Badge
              variant={hasPaid ? "secondary" : "destructive"}
              className="gap-1"
            >
              {hasPaid ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <LockKeyhole className="h-3 w-3" />
              )}
              {hasPaid ? "Purchased" : "Paid"}
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1">
              <UnlockKeyhole className="h-3 w-3" />
              Free
            </Badge>
          )}
        </div>

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
            <p className="text-xs text-muted-foreground">
              Memory Limit
            </p>
            <p className="mt-2 font-medium">
              {problem.memoryLimit} MB
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Marks</p>
            <p className="mt-1 font-semibold">{problem.marks}</p>
          </div>

          {problem.isPaid && problem.price != null && (
            <div className="flex items-center gap-1 text-sm font-semibold">
              <CircleDollarSign className="h-4 w-4" />
              <span>৳{problem.price}</span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          {isUnlocked ? (
            <Button
              size="sm"
              className="w-full"
              onClick={() => router.push(`/problems/${problem.id}`)}
            >
              View Details
            </Button>
          ) : (
            <div className="space-y-2">
              <PaymentButton problemId={problem.id} />

              <p className="text-center text-xs text-muted-foreground">
                Pay to unlock this problem.
              </p>
            </div>
          )}

          {problem.isPaid && hasPaid && (
            <div className="mt-3 rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
              <p className="flex items-center justify-center gap-1 text-sm font-medium text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Payment Completed
              </p>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Your payment was successful.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
