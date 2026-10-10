
import { submitProblem, SubmitProblemPayload } from "@/api/answer.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



export function useSubmitProblem() {
  return useMutation({
    mutationFn: (payload: SubmitProblemPayload) =>
      submitProblem(payload),

    onSuccess: () => {
      toast.success("Problem submitted successfully!");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit problem",
      );
    },
  });
}
