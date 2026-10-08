"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AssessmentForm from "./AssessmentForm";

import type {
  Assessment,
  UpdateAssessmentPayload,
} from "@/components/types/assessment.type";

interface EditAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  assessment: Assessment | null;

  onSubmit: (
    data: UpdateAssessmentPayload,
  ) => void;

  isLoading?: boolean;
}

export default function EditAssessmentDialog({
  open,
  onOpenChange,
  assessment,
  onSubmit,
  isLoading = false,
}: EditAssessmentDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Assessment
          </DialogTitle>
        </DialogHeader>

        {assessment && (
          <AssessmentForm
            assessment={assessment}
            onSubmit={(data) =>
              onSubmit(
                data as UpdateAssessmentPayload,
              )
            }
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}