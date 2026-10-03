import { ICreateProblem } from "@/api/problem.api";
import { useMutation } from "@tanstack/react-query";

export function useCreateProblems() {
  return useMutation({
    mutationFn: ICreateProblem,
  });
}
