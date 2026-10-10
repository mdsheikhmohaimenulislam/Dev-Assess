
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
