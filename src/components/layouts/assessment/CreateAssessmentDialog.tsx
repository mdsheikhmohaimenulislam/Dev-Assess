"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AssessmentForm from "./AssessmentForm";

import type {
  CreateAssessmentPayload,
} from "@/components/types/assessment.type";

interface CreateAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onSubmit: (
    data: CreateAssessmentPayload,
  ) => void;

  isLoading?: boolean;
}

export default function CreateAssessmentDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: CreateAssessmentDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Create Assessment
          </DialogTitle>
        </DialogHeader>

        <AssessmentForm
          onSubmit={(data) =>
            onSubmit(
              data as CreateAssessmentPayload,
            )
          }
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}