"use client";

import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeleteAssessmentProblem,
  useGetAssessmentProblems,
} from "@/components/hooks/assessment-problem.hook";

import { Button } from "@/components/ui/button";

interface AssessmentProblemsProps {
  assessmentId: string;
}

export default function AssessmentProblems({
  assessmentId,
}: AssessmentProblemsProps) {
  const {
    data,
    isLoading,
    isError,
  } = useGetAssessmentProblems(assessmentId);

  const deleteAssessmentProblem =
    useDeleteAssessmentProblem();

  const problems = data?.data ?? [];

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this problem?",
    );

    if (!confirmed) return;

    deleteAssessmentProblem.mutate(
      {
        id,
        assessmentId,
      },
      {
        onSuccess: () => {
          toast.success(
            "Problem removed successfully.",
          );
        },

        onError: (error) => {
          console.error(
            "Delete assessment problem error:",
            error,
          );

          toast.error(
            "Failed to remove problem.",
          );
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Loading problems...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">
          Failed to load assessment problems.
        </p>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <p className="font-medium">
          No problems added yet.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Add problems to this assessment to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">
                #
              </th>

              <th className="px-4 py-3 text-left">
                Problem
              </th>

              <th className="px-4 py-3 text-left">
                Type
              </th>

              <th className="px-4 py-3 text-left">
                Difficulty
              </th>

              <th className="px-4 py-3 text-left">
                Category
              </th>

              <th className="px-4 py-3 text-left">
                Marks
              </th>

              <th className="px-4 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {problems.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-4 font-medium">
                  {item.order}
                </td>

                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium">
                      {item.problem?.title ??
                        "Unknown problem"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.problemId}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {item.problem?.type ?? "-"}
                </td>

                <td className="px-4 py-4">
                  {item.problem?.difficulty ?? "-"}
                </td>

                <td className="px-4 py-4">
                  {item.problem?.category ?? "-"}
                </td>

                <td className="px-4 py-4 font-medium">
                  {item.marks}
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      title="Edit problem"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      title="Remove problem"
                      disabled={
                        deleteAssessmentProblem.isPending
                      }
                      onClick={() =>
                        handleDelete(item.id)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}