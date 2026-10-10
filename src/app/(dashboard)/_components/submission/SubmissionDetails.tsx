
"use client";

import type { ReactNode } from "react";

import {
  Award,
  CalendarDays,
  CheckCircle2,
  CircleX,
  Clock3,
  Code2,
  UserRound,
} from "lucide-react";

import { useGetSubmissionById } from "@/components/hooks/submission.hook";
import UpdateSubmissionDialog from "./UpdateSubmissionDialog";

interface SubmissionDetailsProps {
  id: string;
  userRole: "ADMIN" | "COMPANY";
}

export default function SubmissionDetails({
  id,
  userRole,
}: SubmissionDetailsProps) {
  const { data, isPending, isError, error } =
    useGetSubmissionById(id);

  // Loading state
  if (isPending) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 p-6">
        <h2 className="font-semibold text-destructive">
          Failed to load submission
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {error.message}
        </p>
      </div>
    );
  }

  const submission = data?.data;

  // Empty state
  if (!submission) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <h2 className="font-semibold">Submission not found</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The requested submission could not be found.
        </p>
      </div>
    );
  }

  const isCorrect = submission.isCorrect === true;
  const isIncorrect = submission.isCorrect === false;

  const submittedDate = new Date(submission.submittedAt);

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {userRole === "ADMIN" ? "Admin Panel" : "Company Panel"}{" "}
            / Submissions
          </p>

          <h1 className="text-2xl font-bold tracking-tight">
            {submission.problem?.title ?? "Submission Details"}
          </h1>

          <p className="break-all text-xs text-muted-foreground">
            Submission ID: {submission.id}
          </p>
        </div>

        <UpdateSubmissionDialog submission={submission} />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={<UserRound className="h-5 w-5" />}
          label="Candidate"
          value={submission.candidate?.name ?? "Unknown candidate"}
          description={
            submission.candidate?.email ?? "Email unavailable"
          }
        />

        <SummaryCard
          icon={<Code2 className="h-5 w-5" />}
          label="Language"
          value={submission.language}
          description="Submitted solution"
        />

        <SummaryCard
          icon={<Award className="h-5 w-5" />}
          label="Obtained Marks"
          value={`${submission.obtainedMark} / ${
            submission.problem?.marks ?? "—"
          }`}
          description="Current evaluation score"
        />

        <SummaryCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Submitted At"
          value={
            Number.isNaN(submittedDate.getTime())
              ? "Unavailable"
              : submittedDate.toLocaleDateString()
          }
          description={
            Number.isNaN(submittedDate.getTime())
              ? "Date unavailable"
              : submittedDate.toLocaleTimeString()
          }
        />
      </div>

      {/* Evaluation overview */}
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Evaluation Overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Current status and correctness of the submitted solution.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              Submission Status
            </p>

            <p className="mt-2 font-semibold">
              {submission.status}
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              Evaluation Result
            </p>

            <div className="mt-2 flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : isIncorrect ? (
                <CircleX className="h-5 w-5 text-destructive" />
              ) : (
                <Clock3 className="h-5 w-5 text-muted-foreground" />
              )}

              <span className="font-semibold">
                {isCorrect
                  ? "Correct"
                  : isIncorrect
                    ? "Incorrect"
                    : "Not evaluated"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Submitted code */}
      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Code2 className="h-5 w-5 text-muted-foreground" />

          <div>
            <h2 className="font-semibold">Submitted Code</h2>

            <p className="text-xs text-muted-foreground">
              Language: {submission.language}
            </p>
          </div>
        </div>

        <pre className="max-h-[600px] overflow-auto bg-muted/30 p-5 text-sm leading-6">
          <code>{submission.code}</code>
        </pre>
      </section>
    </div>
  );
}

interface SummaryCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}

function SummaryCard({
  icon,
  label,
  value,
  description,
}: SummaryCardProps) {
  return (
    <div className="min-w-0 rounded-xl border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </div>

        <p className="text-sm text-muted-foreground">
          {label}
        </p>
      </div>

      <p className="mt-4 break-words text-lg font-semibold">
        {value}
      </p>

      <p className="mt-1 break-words text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
