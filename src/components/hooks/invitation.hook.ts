
import { acceptInvitation, createInvitation, CreateInvitationPayload, deleteInvitation, getInvitationById, getInvitations, rejectInvitation } from "@/api/invitation.api";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


export function useGetInvitations() {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: getInvitations,
    retry: false,
  });
}

export function useGetInvitationById(id: string) {
  return useQuery({
    queryKey: ["invitation", id],
    queryFn: () => getInvitationById(id),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useCreateInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInvitationPayload) =>
      createInvitation(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });
    },
  });
}

export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => acceptInvitation(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["invitation", id],
      });
    },
  });
}

export function useRejectInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rejectInvitation(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["invitation", id],
      });
    },
  });
}

export function useDeleteInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInvitation(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });

      queryClient.removeQueries({
        queryKey: ["invitation", id],
      });
    },
  });
}
