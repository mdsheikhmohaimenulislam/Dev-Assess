import apiClient from "@/lib/apiClient";


export interface CreateAttemptPayload {
  assessmentId: string;
}

export interface AttemptResponse {
  id: string;
  assessmentId: string;
  userId: string;
  candidateId: string;
  status: "IN_PROGRESS" | "SUBMITTED" | "EXPIRED";
  startedAt: string;
  expiresAt: string;
  createdAt: string;
  assessment: {
    id: string;
    title: string;
    description: string;
    duration: number;
    totalMarks: number;
    passingMarks: number;
    startTime: string | null;
    endTime: string | null;
  };
  candidate: {
    id: string;
    userId: string;
  };
}

export function createAttempt(payload: CreateAttemptPayload) {
  return apiClient<AttemptResponse>("/attempts", {
    method: "POST",
    body: payload,
  });
}

export function submitAttempt(attemptId: string) {
  return apiClient<AttemptResponse>(`/attempts/submit/${attemptId}`, {
    method: "POST",
  });
}


export function getAttemptById(attemptId: string) {
  return apiClient<AttemptResponse>(`/attempts/${attemptId}`, {
    method: "GET",
  });
}