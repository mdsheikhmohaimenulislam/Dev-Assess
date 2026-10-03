import { getProblems, ICreateProblem } from "@/api/problem.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProblemQueryParams } from "../types";

export function useCreateProblems() {
  return useMutation({
    mutationFn: ICreateProblem,
  });
}



export function useProblems(params: ProblemQueryParams) {
  return useQuery({
    queryKey: ["problems", params],
    queryFn: () => getProblems(params),
    placeholderData: (previousData) => previousData,
    retry: false,
  });
}