import {
  deleteProblem,
  getAllProblems,
  getProblems,
  getSingleProblem,
  ICreateProblem,
} from "@/api/problem.api";
import {
  Mutation,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
export function useGetAllProblems() {
  return useQuery({
    queryKey: ["problems"],
    queryFn: getAllProblems,

    retry: false,
  });
}

export function useGetSingleProblem(id: string) {
  return useQuery({
    queryKey: ["problem", id],
    queryFn: () => getSingleProblem(id),
    enabled: Boolean(id),
  });
}

export function useDeleteProblem() {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProblem,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["problem"] });
    },
  });
}
