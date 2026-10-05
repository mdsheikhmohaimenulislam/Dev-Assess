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
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

// Logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["user"],
      });
    },
  });
}

// Get current logged-in user
export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

// Login
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["user"],
      });
    },
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
  return useMutation({
    mutationFn: googleLogin,
  });
}