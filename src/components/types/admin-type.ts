export type UserRole = "CANDIDATE" | "COMPANY" | "ADMIN";

export interface LoginPayload {
  email: string;
  password: string;
}