"use client";

import Link from "next/link";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeleteAssessment,
  useGetAssessments,
} from "@/components/hooks/assessment.hook";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssessmentManagementProps {
  basePath: "/admin/assessments" | "/company/assessments";
}

export default function AssessmentManagement({
  basePath,
}: AssessmentManagementProps) {
  const { data, isLoading, isError } = useGetAssessments();

  const deleteAssessment = useDeleteAssessment();

  const assessments = data?.data ?? [];

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assessment?",
    );

    if (!confirmed) {
      return;
    }

    deleteAssessment.mutate(id, {
      onSuccess: () => {
        toast.success("Assessment deleted successfully.");
      },

      onError: () => {
        toast.error("Failed to delete assessment.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Loading assessments...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-destructive">
          Failed to load assessments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Assessments
          </h1>

          <p className="text-sm text-muted-foreground">
            Create and manage assessments.
          </p>
        </div>

        <Button >
          <Link href={`${basePath}/create`}>
            <Plus className="mr-2 h-4 w-4" />
            Create Assessment
          </Link>
        </Button>
      </div>

      {/* Empty */}
      {assessments.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <h3 className="text-lg font-semibold">
            No assessments found
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first assessment to get started.
          </p>

          <Button className="mt-4">
            <Link href={`${basePath}/create`}>
              Create Assessment
            </Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    Title
                  </th>

                  <th className="px-4 py-3 text-left">
                    Duration
                  </th>

                  <th className="px-4 py-3 text-left">
                    Marks
                  </th>

                  <th className="px-4 py-3 text-left">
                    Access
                  </th>

                  <th className="px-4 py-3 text-left">
                    Price
                  </th>

                  <th className="px-4 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {assessments.map((assessment) => (
                  <tr
                    key={assessment.id}
                    className="border-b last:border-0"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">
                          {assessment.title}
                        </p>

                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {assessment.description}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {assessment.duration} min
                    </td>

                    <td className="px-4 py-4">
                      {assessment.totalMarks}
                    </td>

                    <td className="px-4 py-4">
                      <Badge>
                        {assessment.accessType}
                      </Badge>
                    </td>

                    <td className="px-4 py-4">
                      {assessment.accessType === "PAID"
                        ? `৳${assessment.price ?? 0}`
                        : "Free"}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"

                        >
                          <Link
                            href={`${basePath}/${assessment.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"

                        >
                          <Link
                            href={`${basePath}/${assessment.id}/edit`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() =>
                            handleDelete(assessment.id)
                          }
                          disabled={
                            deleteAssessment.isPending
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
      )}
    </div>
  );
}