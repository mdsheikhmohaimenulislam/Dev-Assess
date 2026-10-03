import { forgotPasswordPayload, LoginPayload, resetPasswordPayload } from "@/components/types";
import apiClient from "@/lib/apiClient";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/auth/me");
}

export function passwordForgot(payload:forgotPasswordPayload) {
  return apiClient("/auth/forgot-password", { method: "POST",body:payload });
}

export function passwordReset(payload: resetPasswordPayload) {
  return apiClient("/auth/reset-password", { method: "POST", body: payload });
}

export function googleOAuth(payload: { idToken: string }) {
  return apiClient("/auth/google", { method: "POST", body: payload });
}

// export function verifyAccount(payload: VerifyAccountPayload) {
//   return apiClient("/auth/verify-email", { method: "POST", body: payload });
// }

// export function userRegistration(payload: RegistrationPayload) {
//   return apiClient("/auth/register", { method: "POST", body: payload });
// }
