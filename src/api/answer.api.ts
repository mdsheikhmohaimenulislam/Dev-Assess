
import apiClient from "@/lib/apiClient";

export type SubmissionLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp";

export interface SubmitProblemPayload {
  problemId: string;
  language: SubmissionLanguage;
  code: string;
  startedAt: string;
  submittedAt: string;
}

export interface ProblemSubmissionResponse {
  id: string;
  candidateId: string;
  problemId: string;
  language: string;
  code: string;
  startedAt: string | null;
  submittedAt: string;
  obtainedMark: number;
  status: string;
  isCorrect: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export function submitProblem(payload: SubmitProblemPayload) {
  return apiClient<ProblemSubmissionResponse>("/answer/submit", {
    method: "POST",
    body: payload,
  });
}
