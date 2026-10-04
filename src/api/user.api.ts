import { GetUsersParams, UpdateMyProfilePayload, UpdateUserStatusPayload, UserResponse, UsersResponse } from "@/components/types";
import apiClient from "@/lib/apiClient";




// Get all users
export function getAllUsers(params?: GetUsersParams) {
  return apiClient<UsersResponse>("/users/", {
    query: params,
  });
}

// Get single user
export function getSingleUser(id: string) {
  return apiClient<UserResponse>(`/users/${id}`);
}

// Update my profile
export function updateMyProfile(id: string, payload: UpdateMyProfilePayload) {
  return apiClient<UserResponse>(`/users/me/${id}`, {
    method: "PATCH",
    body: payload,
  });
}





// Update user status
export function updateUserStatus(id: string, payload: UpdateUserStatusPayload) {
  return apiClient<UserResponse>(`/users/status/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// Delete my account
export function deleteMyAccount(id: string) {
  return apiClient(`/users/me/${id}`, {
    method: "DELETE",
  });
}

// Permanently delete user - Admin
export function permanentlyDeleteUser(id: string) {
  return apiClient(`/users/${id}`, {
    method: "DELETE",
  });
}
