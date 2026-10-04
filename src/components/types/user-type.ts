
import type { UserRole } from "@/components/types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: User[];
    meta: UsersMeta;
  };
}


export interface UsersMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}


export interface UserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";
  sortBy?: "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface UpdateMyProfilePayload {
  name?: string;
  imageUrl?: string;
}

export interface UpdateUserProfilePayload {
  name?: string;
  imageUrl?: string;
  role?: UserRole;
  status?: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";
}
export interface UpdateUserStatusPayload {
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
}