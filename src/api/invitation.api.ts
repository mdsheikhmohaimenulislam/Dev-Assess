import apiClient from "@/lib/apiClient";



export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED";

export interface CreateInvitationPayload {
  candidateId: string;
  assessmentId: string;
  message?: string;
}

export interface Invitation {
  id: string;
  candidateId: string;
  assessmentId: string;
  message?: string | null;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;

  candidate?: {
    id: string;
    userId: string;
    phone?: string | null;
    user?: {
      id: string;
      name: string;
      email: string;
      imageUrl?: string | null;
    };
  };

  assessment?: {
    id: string;
    title: string;
    description?: string | null;
    duration: number;
    startTime?: string | null;
    endTime?: string | null;
    status: string;
  };
}

export interface InvitationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Invitation;
}

export interface InvitationListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Invitation[];
}

export function createInvitation(
  payload: CreateInvitationPayload,
) {
  return apiClient<InvitationResponse>("/invitations", {
    method: "POST",
    body: payload,
  });
}

export function getInvitations() {
  return apiClient<InvitationListResponse>("/invitations", {
    method: "GET",
  });
}

export function getInvitationById(id: string) {
  return apiClient<InvitationResponse>(`/invitation/${id}`, {
    method: "GET",
  });
}

export function acceptInvitation(id: string) {
  return apiClient<InvitationResponse>(
    `/invitations/accept/${id}`,
    {
      method: "PATCH",
    },
  );
}

export function rejectInvitation(id: string) {
  return apiClient<InvitationResponse>(
    `/invitations/reject/${id}`,
    {
      method: "PATCH",
    },
  );
}

export function deleteInvitation(id: string) {
  return apiClient<InvitationResponse>(
    `/invitations/${id}`,
    {
      method: "DELETE",
    },
  );
}
