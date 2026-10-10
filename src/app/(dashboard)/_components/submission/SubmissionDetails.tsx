
"use client";


import { useGetSubmissionById } from "@/components/hooks/submission.hook";
import UpdateSubmissionDialog from "./UpdateSubmissionDialog";

interface SubmissionDetailsProps {
  id: string;
}

export default function SubmissionDetails({
  id,
}: SubmissionDetailsProps) {
  const { data, isPending, isError, error } =
    useGetSubmissionById(id);

  if (isPending) {
    return <p className="py-8 text-center">Loading submission...</p>;
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-destructive">
        {error.message}
      </p>
    );
  }

  const submission = data.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            {submission.problem?.title ?? "Submission Details"}
          </h1>
          <p className="break-all text-sm text-muted-foreground">
            Submission ID: {submission.id}
          </p>
        </div>

        <UpdateSubmissionDialog submission={submission} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Candidate</p>
          <p className="mt-1 font-medium">
            {submission.candidate?.name ?? submission.candidateId}
          </p>
          {submission.candidate?.email && (
            <p className="break-all text-sm text-muted-foreground">
              {submission.candidate.email}
            </p>
          )}
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Language</p>
          <p className="mt-1 font-medium">{submission.language}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="mt-1 font-medium">{submission.status}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Obtained Marks</p>
          <p className="mt-1 font-medium">
            {submission.obtainedMark} / {submission.problem?.marks ?? "-"}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Correctness</p>
          <p className="mt-1 font-medium">
            {submission.isCorrect === null
              ? "Not evaluated"
              : submission.isCorrect
                ? "Correct"
                : "Incorrect"}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Submitted At</p>
          <p className="mt-1 text-sm font-medium">
            {new Date(submission.submittedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Submitted Code</h2>
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          <code>{submission.code}</code>
        </pre>
      </section>
    </div>
  );
}
