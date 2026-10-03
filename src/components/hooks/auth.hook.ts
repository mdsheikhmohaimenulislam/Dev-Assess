import {
  getMe,
  googleLogin,
  passwordForgot,
  passwordReset,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

// export function useGoogleLlogin() { return useMutation({ mutationFn: googleLogin, }); }

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function usePasswordForgot() {
  return useMutation({
    mutationFn: passwordForgot,
  });
}

export function usePasswordReset() {
  return useMutation({
    mutationFn: passwordReset,
  });
}

export function useGoogleLogin() {
  return useMutation({ mutationFn: googleLogin });
}
