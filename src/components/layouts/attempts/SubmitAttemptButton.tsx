"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSubmitAttempt } from "@/components/hooks/attempt.hook";
import { Button } from "@/components/ui/button";

interface SubmitAttemptButtonProps {
  attemptId: string;
}

export default function SubmitAttemptButton({
  attemptId,
}: SubmitAttemptButtonProps) {
  const router = useRouter();

  const { mutate, isPending } = useSubmitAttempt();

  const handleSubmit = () => {
    mutate(attemptId, {
      onSuccess: () => {
        toast.success("Assessment submitted successfully");

        router.push("/candidate/results");
      },

      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to submit assessment",
        );
      },
    });
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isPending}
      variant="default"
    >
      {isPending ? "Submitting..." : "Submit Assessment"}
    </Button>
  );
}