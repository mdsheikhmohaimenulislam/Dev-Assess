import { createAttempt, CreateAttemptPayload, getAttemptById, submitAttempt } from "@/api/attempt.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateAttempt() {
  return useMutation({
    mutationFn: (payload: CreateAttemptPayload) =>
      createAttempt(payload),
  });
}

export function useSubmitAttempt() {
  return useMutation({
    mutationFn: (attemptId: string) => submitAttempt(attemptId),
  });
}


export function useGetAttemptById(attemptId: string) {
  return useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => getAttemptById(attemptId),
    enabled: Boolean(attemptId),
  });
}