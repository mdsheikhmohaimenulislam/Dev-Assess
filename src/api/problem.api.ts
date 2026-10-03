import {  ProblemFormValues } from "@/components/types";
import apiClient from "@/lib/apiClient";





export function ICreateProblem(payload: ProblemFormValues) {
  return apiClient("/problem", { method: "POST", body: payload });
}