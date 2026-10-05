import { AssessmentListResponse, AssessmentResponse, CreateAssessmentPayload, UpdateAssessmentPayload } from "@/components/types/assessment.type";
import apiClient from "@/lib/apiClient";


export function createAssessment(payload: CreateAssessmentPayload) {
  return apiClient<AssessmentResponse>("/assessment", {
    method: "POST",
    body: payload,
  });
}

export function getAssessments() {
  return apiClient<AssessmentListResponse>("/assessment", {
    method: "GET",
  });
}

export function getAssessmentById(id: string) {
  return apiClient<AssessmentResponse>(`/assessment/${id}`, {
    method: "GET",
  });
}

export function updateAssessment(
  id: string,
  payload: UpdateAssessmentPayload,
) {
  return apiClient<AssessmentResponse>(`/assessment/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteAssessment(id: string) {
  return apiClient<AssessmentResponse>(`/assessment/${id}`, {
    method: "DELETE",
  });
}

export function updateAssessmentStatus(
  id: string,
  status: string,
) {
  return apiClient<AssessmentResponse>(`/assessment/status/${id}`, {
    method: "PATCH",
    body: {
      status,
    },
  });
}