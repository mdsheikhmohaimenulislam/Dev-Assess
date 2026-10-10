
"use client";

import { Code2, CalendarDays, Award, CircleCheck, CircleX, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useGetMySubmissions } from "@/components/hooks/submission.hook";

export default function MySubmissions() {
  const { data, isPending, isError, error } = useGetMySubmissions();

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 p-6 text-center">
        <p className="font-medium text-destructive">
          Failed to load submissions
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {error.message}
        </p>
      </div>
    );
  }

  const submissions = data.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            My Submissions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your solutions, evaluation status, and scores.
          </p>
        </div>

        <div className="flex h-10 w-fit items-center gap-2 rounded-lg border bg-card px-4">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {submissions.length}{" "}
            {submissions.length === 1 ? "Submission" : "Submissions"}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Code2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">No submissions yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Your submitted solutions will appear here. Start solving a
            problem to track your progress.
          </p>
        </div>
      ) : (
        /* Submission Cards */
        <div className="grid gap-4">
          {submissions.map((submission) => {
            const isEvaluated = submission.status === "EVALUATED";
            const isFailed = submission.status === "FAILED";

            return (
              <article
                key={submission.id}
                className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted/20 sm:p-6"
              >
                <div className="flex flex-col gap-4">
                  {/* Title and Status */}
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Code2 className="h-5 w-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="break-words font-semibold leading-6">
                          {submission.problem?.title ??
                            "Untitled Problem"}
                        </h2>

                        <p className="mt-1 text-xs text-muted-foreground">
                          ID: {submission.id}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant={
                        isEvaluated
                          ? "default"
                          : isFailed
                            ? "destructive"
                            : "secondary"
                      }
                      className="w-fit shrink-0"
                    >
                      {submission.status}
                    </Badge>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Submission Information */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex items-start gap-3">
                      <Code2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Language
                        </p>
                        <p className="mt-1 text-sm font-medium capitalize">
                          {submission.language}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Score
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {submission.obtainedMark} /{" "}
                          {submission.problem?.marks ?? "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Submitted At
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {new Date(
                            submission.submittedAt,
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Evaluation Result */}
                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2.5">
                    {submission.isCorrect === true ? (
                      <>
                        <CircleCheck className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          Correct solution
                        </span>
                      </>
                    ) : submission.isCorrect === false ? (
                      <>
                        <CircleX className="h-4 w-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">
                          Incorrect solution
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock3 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Awaiting evaluation
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
