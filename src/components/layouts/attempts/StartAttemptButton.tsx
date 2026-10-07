"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCreateAttempt } from "@/components/hooks/attempt.hook";
import { Button } from "@/components/ui/button";

interface StartAttemptButtonProps {
  assessmentId: string;
  assessmentStatus: "PUBLISHED" | "ONGOING";
}

export default function StartAttemptButton({
  assessmentId,
  assessmentStatus,
}: StartAttemptButtonProps) {
  const router = useRouter();

  const { mutate, isPending } = useCreateAttempt();

  const handleCreateAttempt = () => {
    mutate(
      {
        assessmentId,
      },
      {
        onSuccess: (response) => {
          toast.success("Assessment started successfully");

          const attemptId = response.data.id;

          router.push(`/candidate/assessments/${attemptId}`);
        },

        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to start assessment",
          );
        },
      },
    );
  };

  const statusClassName =
    assessmentStatus === "PUBLISHED"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : "bg-blue-100 text-blue-700 hover:bg-blue-100";

  return (
    <div className="space-y-3">
      {/* Assessment Status */}
      <div
        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusClassName}`}
      >
        {assessmentStatus}
      </div>

      {/* Start Button */}
      <Button
        type="button"
        className="w-full"
        onClick={handleCreateAttempt}
        disabled={isPending}
      >
        {isPending ? "Starting..." : "Start Assessment"}
      </Button>
    </div>
  );
}