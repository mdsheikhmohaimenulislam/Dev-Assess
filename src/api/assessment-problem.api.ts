import { AssessmentProblemListResponse, AssessmentProblemResponse, CreateAssessmentProblemPayload, UpdateAssessmentProblemPayload } from "@/components/types";
import apiClient from "@/lib/apiClient";


/**
 * Add problem to assessment
 */
export function createAssessmentProblem(
  assessmentId: string,
  payload: CreateAssessmentProblemPayload,
) {
  return apiClient<AssessmentProblemResponse>(
    `/assessment-problem/${assessmentId}`,
    {
      method: "POST",
      body: payload,
    },
  );
}

/**
 * Get all problems of an assessment
 */
export function getAssessmentProblems(
  assessmentId: string,
) {
  return apiClient<AssessmentProblemListResponse>(
    `/assessment-problem/${assessmentId}`,
    {
      method: "GET",
    },
  );
}

/**
 * Get single assessment problem
 */
export function getAssessmentProblemById(
  id: string,
) {
  return apiClient<AssessmentProblemResponse>(
    `/assessment-problem/assessment-problem/${id}`,
    {
      method: "GET",
    },
  );
}

/**
 * Update assessment problem
 */
export function updateAssessmentProblem(
  id: string,
  payload: UpdateAssessmentProblemPayload,
) {
  return apiClient<AssessmentProblemResponse>(
    `/assessment-problem/assessment-problem/${id}`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

/**
 * Delete assessment problem
 */
export function deleteAssessmentProblem(id: string) {
  return apiClient<AssessmentProblemResponse>(
    `/assessment-problem/${id}`,
    {
      method: "DELETE",
    },
  );
}