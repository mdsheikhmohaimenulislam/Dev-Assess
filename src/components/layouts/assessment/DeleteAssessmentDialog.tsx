"use client";

import {
  AlertTriangle,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Assessment } from "@/components/types/assessment.type";

interface DeleteAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  assessment: Assessment | null;

  onConfirm: () => void;

  isLoading?: boolean;
}

export default function DeleteAssessmentDialog({
  open,
  onOpenChange,
  assessment,
  onConfirm,
  isLoading = false,
}: DeleteAssessmentDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Assessment
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {assessment?.title}
            </span>
            ?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}