import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUsersParams, UpdateMyProfilePayload, UpdateUserStatusPayload } from "../types";
import { deleteMyAccount, getAllUsers, getSingleUser, permanentlyDeleteUser, updateMyProfile, updateUserStatus } from "@/api/user.api";


// Get all users
export function useGetAllUsers(params?: GetUsersParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
  });
}

// Get single user
export function useGetSingleUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUser(id),
    enabled: Boolean(id),
  });
}



// Update my profile
export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateMyProfilePayload;
    }) => updateMyProfile(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

// Update user status
export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateUserStatusPayload;
    }) => updateUserStatus(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

// Delete my account
export function useDeleteMyAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyAccount,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

// Permanently delete user
export function usePermanentlyDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permanentlyDeleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
