
"use client";

import UpdateSubmissionDialog from "@/app/(dashboard)/_components/submission/UpdateSubmissionDialog";
import { useGetSubmissions } from "@/components/hooks/submission.hook";

interface SubmissionsTableProps {
  basePath: "/admin/problems" | "/company/problems";
}

export default function SubmissionsTable({
  basePath: _basePath,
}: SubmissionsTableProps) {
  const { data, isPending, isError, error } = useGetSubmissions();

  if (isPending) {
    return (
      <p className="py-8 text-center">
        Loading submissions...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-destructive">
        {error.message}
      </p>
    );
  }

  const submissions = data.data;

  if (!submissions.length) {
    return (
      <div className="rounded-lg border p-8 text-center">
        No submissions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Submissions
        </h1>

        <p className="text-sm text-muted-foreground">
          View and manage candidate submissions.
        </p>
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">Candidate</th>
              <th className="p-3">Problem</th>
              <th className="p-3">Language</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="border-t"
              >
                {/* Candidate */}
                <td className="p-3">
                  <div className="font-medium">
                    {submission.candidate?.name ??
                      "Unknown candidate"}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {submission.candidate?.email ??
                      submission.candidateId}
                  </div>
                </td>

                {/* Problem */}
                <td className="p-3">
                  {submission.problem?.title ??
                    submission.problemId}
                </td>

                {/* Language */}
                <td className="p-3">
                  {submission.language}
                </td>

                {/* Marks */}
                <td className="p-3">
                  {submission.obtainedMark} /{" "}
                  {submission.problem?.marks ?? "-"}
                </td>

                {/* Status */}

<td className="p-3">
  <span
    className={`rounded-full px-2 py-1 text-xs font-medium ${
      submission.status === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : submission.status === "EVALUATED"
          ? "bg-green-100 text-green-700"
          : submission.status === "FAILED"
            ? "bg-red-100 text-red-700"
            : "bg-muted text-muted-foreground"
    }`}
  >
    {submission.status}
  </span>
</td>


                {/* Update Action */}
                <td className="p-3 text-center">
                  <UpdateSubmissionDialog
                    submission={submission}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
