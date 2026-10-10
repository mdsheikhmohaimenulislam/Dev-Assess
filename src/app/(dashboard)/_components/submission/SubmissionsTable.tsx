
"use client";

import Link from "next/link";
import { Eye } from "lucide-react";


import { Button } from "@/components/ui/button";
import { useGetSubmissions } from "@/components/hooks/submission.hook";

interface SubmissionsTableProps {
  basePath: "/admin/problems" | "/company/problems";
}

export default function SubmissionsTable({
  basePath,
}: SubmissionsTableProps) {
  const { data, isPending, isError, error } = useGetSubmissions();

  if (isPending) {
    return <p className="py-8 text-center">Loading submissions...</p>;
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
      <div>
        <h1 className="text-2xl font-semibold">Submissions</h1>
        <p className="text-sm text-muted-foreground">
          View and manage candidate submissions.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">Candidate</th>
              <th className="p-3">Problem</th>
              <th className="p-3">Language</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-t">
                <td className="p-3">
                  <div className="font-medium">
                    {submission.candidate?.name ?? "Unknown candidate"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {submission.candidate?.email ?? submission.candidateId}
                  </div>
                </td>

                <td className="p-3">
                  {submission.problem?.title ?? submission.problemId}
                </td>

                <td className="p-3">{submission.language}</td>

                <td className="p-3">
                  {submission.obtainedMark} /{" "}
                  {submission.problem?.marks ?? "-"}
                </td>

                <td className="p-3">
                  <span className="rounded-full bg-muted px-2 py-1 text-xs">
                    {submission.status}
                  </span>
                </td>

                <td className="p-3">
                  <Button  size="sm" variant="outline">
                    <Link
                      href={`${basePath}/submissions/${submission.id}`}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
