"use client";

import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Assessment } from "@/components/types/assessment.type";

interface AssessmentTableProps {
  assessments: Assessment[];
  basePath: "/admin/assessments" | "/company/assessments";

  onEdit: (assessment: Assessment) => void;
  onDelete: (assessment: Assessment) => void;
  onStatusChange: (
    id: string,
    status: Assessment["status"],
  ) => void;

  isStatusUpdating?: boolean;
}

export default function AssessmentTable({
  assessments,
  basePath,
  onEdit,
  onDelete,
  onStatusChange,
  isStatusUpdating = false,
}: AssessmentTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="px-4 py-3 text-left font-medium">
              Title
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Duration
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Access
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Status
            </th>

            <th className="px-4 py-3 text-center font-medium">
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

                  <p className="mt-1 max-w-80 truncate text-xs text-muted-foreground">
                    {assessment.description}
                  </p>
                </div>
              </td>

              <td className="px-4 py-4">
                {assessment.duration} min
              </td>

              <td className="px-4 py-4">
                {assessment.accessType === "PAID" ? (
                  <Badge variant="destructive">
                    Paid
                    {assessment.price !== null &&
                      ` ৳${assessment.price}`}
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    Free
                  </Badge>
                )}
              </td>

              <td className="px-4 py-4">
                <select
                  value={assessment.status}
                  disabled={isStatusUpdating}
                  onChange={(event) =>
                    onStatusChange(
                      assessment.id,
                      event.target.value as Assessment["status"],
                    )
                  }
                  className="rounded-md border bg-background px-2 py-1 text-xs"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">
                    Published
                  </option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">
                    Completed
                  </option>
                  <option value="CANCELLED">
                    Cancelled
                  </option>
                </select>
              </td>

              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    title="View"
  
                  >
                    <Link
                      href={`${basePath}/${assessment.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    title="Edit"
                    onClick={() => onEdit(assessment)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    title="Delete"
                    onClick={() => onDelete(assessment)}
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
  );
}