import apiClient from "@/lib/apiClient";


export interface CreateCandidatePayload {
  phone: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}

export interface UpdateCandidatePayload {
  phone?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}

export interface Candidate {
  id: string;
  userId: string;
  phone: string;
  bio?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Candidate;
}

export interface CandidateListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Candidate[];
}

// Create candidate profile
export function createCandidate(payload: CreateCandidatePayload) {
  return apiClient<CandidateResponse>("/candidate", {
    method: "POST",
    body: payload,
  });
}

// Get current candidate profile
export function getMyCandidate() {
  return apiClient<CandidateResponse>("/candidate/me", {
    method: "GET",
  });
}

// Get candidate by ID
export function getCandidateById(id: string) {
  return apiClient<CandidateResponse>(`/candidate/${id}`, {
    method: "GET",
  });
}

// Update candidate profile
export function updateCandidate(
  id: string,
  payload: UpdateCandidatePayload,
) {
  return apiClient<CandidateResponse>(`/candidate/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// Delete candidate profile
export function deleteCandidate(id: string) {
  return apiClient<CandidateResponse>(`/candidate/${id}`, {
    method: "DELETE",
  });
}