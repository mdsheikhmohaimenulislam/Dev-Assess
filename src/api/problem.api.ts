import {
  ProblemFormValues,
  ProblemQueryParams,
  ProblemsResponse,
  SingleProblemResponse,
} from "@/components/types";
import apiClient from "@/lib/apiClient";

export function ICreateProblem(payload: ProblemFormValues) {
  return apiClient("/problem", { method: "POST", body: payload });
}

export function getProblems(params: ProblemQueryParams) {
  return apiClient<ProblemsResponse>("/problem", {
    method: "GET",
    query: params,
  });
}

export function getAllProblems() {
  return apiClient("/problem");
}

export function getSingleProblem(id: string) {
  return apiClient<SingleProblemResponse>(`/problem/${id}`);
}
