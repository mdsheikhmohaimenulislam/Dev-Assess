"use client";

import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { AssessmentStatus } from "@/components/types/assessment.type";

interface UpdateAssessmentStatusProps {
  status: AssessmentStatus;
  onChange: (status: AssessmentStatus) => void;
  disabled?: boolean;
}

export default function UpdateAssessmentStatus({
  status,
  onChange,
  disabled = false,
}: UpdateAssessmentStatusProps) {
  return (
    <Select
      value={status}
      disabled={disabled}
      onValueChange={(value) =>
        onChange(value as AssessmentStatus)
      }
    >
      <SelectTrigger className="w-32">
        {disabled ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="DRAFT">
          Draft
        </SelectItem>

        <SelectItem value="PUBLISHED">
          Published
        </SelectItem>

        <SelectItem value="ONGOING">
          Ongoing
        </SelectItem>

        <SelectItem value="COMPLETED">
          Completed
        </SelectItem>

        <SelectItem value="CANCELLED">
          Cancelled
        </SelectItem>
      </SelectContent>
    </Select>
  );
}