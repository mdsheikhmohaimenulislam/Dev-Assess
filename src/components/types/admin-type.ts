export type UserRole = "CANDIDATE" | "COMPANY" | "ADMIN";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface resetPasswordPayload {
  email: string;
  newPassword: string;
  otp: string;
}

export interface forgotPasswordPayload {
  email: string;
}
