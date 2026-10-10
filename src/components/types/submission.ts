export type SubmissionStatus = "PENDING" | "EVALUATED" | "FAILED";

export type SubmissionLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp";

export interface SubmissionProblem {
  id: string;
  title: string;
  marks: number;
}

export interface SubmissionCandidate {
  id: string;
  name: string;
  email: string;
}

export interface Submission {
  id: string;
  candidateId: string;
  problemId: string;
  language: SubmissionLanguage;
  code: string;
  answer: string;
  startedAt: string | null;
  submittedAt: string;
  obtainedMark: number;
  status: SubmissionStatus;
  isCorrect: boolean | null;
  createdAt: string;
  updatedAt: string;
  problem?: SubmissionProblem;
  candidate?: SubmissionCandidate;
}

export interface SubmissionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Submission;
}

export interface SubmissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Submission[];
}

export interface UpdateSubmissionPayload {
  obtainedMark?: number;
  status?: SubmissionStatus;
  isCorrect?: boolean | null;
}