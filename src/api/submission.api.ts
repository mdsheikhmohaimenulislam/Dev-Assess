import { SubmissionResponse, SubmissionsResponse, UpdateSubmissionPayload } from "@/components/types/submission";
import apiClient from "@/lib/apiClient";



// GET all submissions
export function getSubmissions() {
  return apiClient<SubmissionsResponse>("/submissions");
}

// GET submission by ID
export function getSubmissionById(id: string) {
  return apiClient<SubmissionResponse>(
    `/submissions/${encodeURIComponent(id)}`,
  );
}

// GET logged-in candidate's submissions
export function getMySubmissions() {
  return apiClient<SubmissionsResponse>("/submissions/my");
}

// PATCH submission
export function updateSubmission(
  id: string,
  payload: UpdateSubmissionPayload,
) {
  return apiClient<SubmissionResponse>(
    `/submissions/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}