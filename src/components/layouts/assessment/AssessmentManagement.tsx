"use client";

import Link from "next/link";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import {
  useDeleteAssessment,
  useGetAssessments,
  useUpdateAssessmentStatus,
} from "@/components/hooks/assessment.hook";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import UpdateAssessmentForm from "./UpdateAssessmentForm";
import AssessmentProblemForm from "../AssessmentProblemForm/AssessmentProblemForm";

type AssessmentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

interface AssessmentManagementProps {
  basePath: "/admin/assessments" | "/company/assessments";
}

export default function AssessmentManagement({
  basePath,
}: AssessmentManagementProps) {
  const [editAssessmentId, setEditAssessmentId] = useState<string | null>(null);
  const [problemAssessmentId, setProblemAssessmentId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError } = useGetAssessments();

  const deleteAssessment = useDeleteAssessment();

  const updateAssessmentStatus = useUpdateAssessmentStatus();

  const assessments = data?.data ?? [];

  console.log(assessments);

  /* ---------------- Status Styles ---------------- */

  const getStatusClassName = (status: AssessmentStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400";

      case "ONGOING":
        return "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400";

      case "COMPLETED":
        return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400";

      case "CANCELLED":
        return "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400";

      case "DRAFT":
      default:
        return "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400";
    }
  };

  /* ---------------- Delete Assessment ---------------- */

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

  /* ---------------- Update Status ---------------- */

  const handleStatusUpdate = (id: string, status: AssessmentStatus) => {
    updateAssessmentStatus.mutate(
      {
        id,
        status,
      },
      {
        onSuccess: () => {
          toast.success(`Assessment status changed to ${status}.`);
        },

        onError: (error) => {
          console.error("Assessment status update error:", error);

          toast.error("Failed to update assessment status.");
        },
      },
    );
  };

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Loading assessments...</p>
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">Failed to load assessments.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage your assessments.
            </p>
          </div>
        </div>

        {/* Empty State */}
        {assessments.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center">
            <h3 className="text-lg font-semibold">No assessments found</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Create your first assessment to get started.
            </p>

            <Button className="mt-4">
              <Link href={`${basePath}/create`}>
                <Plus className="mr-2 h-4 w-4" />
                Create Assessment
              </Link>
            </Button>
          </div>
        ) : (
          /* Assessment Table */
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Title</th>

                    <th className="px-4 py-3 text-left font-medium">
                      Duration
                    </th>

                    <th className="px-4 py-3 text-left font-medium">Marks</th>

                    <th className="px-4 py-3 text-left font-medium">Access</th>

                    <th className="px-4 py-3 text-left font-medium">Status</th>

                    <th className="px-4 py-3 text-right font-medium">Action</th>

                    <th className="px-4 py-3 text-right font-medium">
                      Status Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {assessments.map((assessment) => {
                    const status = assessment?.status as AssessmentStatus;

                    return (
                      <tr
                        key={assessment.id}
                        className="border-b transition-colors last:border-0 hover:bg-muted/30"
                      >
                        {/* Title */}
                        <td className="px-4 py-4">
                          <div className="max-w-xs">
                            <p className="truncate font-medium">
                              {assessment.title}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                              {assessment.description || "No description"}
                            </p>
                          </div>
                        </td>

                        {/* Duration */}
                        <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                          {assessment.duration} min
                        </td>

                        {/* Marks */}
                        <td className="px-4 py-4">
                          <span className="font-medium">
                            {assessment.totalMarks}
                          </span>
                        </td>

                        {/* Access */}
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                            {assessment.accessType}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClassName(
                              status,
                            )}`}
                          >
                            {status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end  gap-2">
                            {/* View */}
                            <Button
                              variant="outline"
                              size="icon"
                              title="View assessment"
                            >
                              <Link href={`${basePath}/${assessment.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>

                            {/* Edit */}
                            <Button
                              variant="outline"
                              size="icon"
                              title="Edit assessment"
                              onClick={() => setEditAssessmentId(assessment.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            {/* Delete */}
                            <Button
                              variant="destructive"
                              size="icon"
                              title="Delete assessment"
                              onClick={() => handleDelete(assessment.id)}
                              disabled={deleteAssessment.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setProblemAssessmentId(assessment.id)
                              }
                            >
                              Problems
                            </Button>
                          </div>
                        </td>

                        {/* Status Action */}
                        <td className="px-4 py-4">
                          <div className="flex justify-end">
                            <Select
                              value={status}
                              onValueChange={(value) =>
                                handleStatusUpdate(
                                  assessment.id,
                                  value as AssessmentStatus,
                                )
                              }
                              disabled={updateAssessmentStatus.isPending}
                            >
                              <SelectTrigger
                                title={`Current status: ${status}`}
                              >
                                <Pencil className="h-4 w-4" />
                              </SelectTrigger>

                              <SelectContent align="end">
                                <SelectItem value="DRAFT">DRAFT</SelectItem>

                                <SelectItem value="PUBLISHED">
                                  PUBLISHED
                                </SelectItem>

                                <SelectItem value="ONGOING">ONGOING</SelectItem>

                                <SelectItem value="COMPLETED">
                                  COMPLETED
                                </SelectItem>

                                <SelectItem value="CANCELLED">
                                  CANCELLED
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Assessment Modal */}
      <Dialog
        open={editAssessmentId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditAssessmentId(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Assessment</DialogTitle>

            <DialogDescription>
              Update the assessment information below.
            </DialogDescription>
          </DialogHeader>

          {editAssessmentId && (
            <UpdateAssessmentForm
              id={editAssessmentId}
              onSuccess={() => {
                setEditAssessmentId(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>


      <Dialog
  open={problemAssessmentId !== null}
  onOpenChange={(open) => {
    if (!open) {
      setProblemAssessmentId(null);
    }
  }}
>
  <DialogContent className="sm:max-w-2xl">
    <DialogHeader>
      <DialogTitle>
        Add Problem to Assessment
      </DialogTitle>

      <DialogDescription>
        Select a problem, set its marks and order,
        then add it to the assessment.
      </DialogDescription>
    </DialogHeader>

    {problemAssessmentId && (
      <AssessmentProblemForm
        assessmentId={problemAssessmentId}
        onSuccess={() => {
          setProblemAssessmentId(null);
        }}
      />
    )}
  </DialogContent>
</Dialog>
    </>
  );
}
