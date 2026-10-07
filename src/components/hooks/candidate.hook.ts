import {
  createCandidate,
  CreateCandidatePayload,
  deleteCandidate,
  getAllCandidates,
  getCandidateById,
  getMyCandidate,
  updateCandidate,
  UpdateCandidatePayload,
} from "@/api/candidate.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllCandidates() {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: getAllCandidates,
    retry: false,
  });
}

// Get my candidate profile
export function useGetMyCandidate() {
  return useQuery({
    queryKey: ["candidate", "me"],
    queryFn: getMyCandidate,
    retry: false,
  });
}

// Get candidate by ID
export function useGetCandidateById(id: string) {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: () => getCandidateById(id),
    enabled: Boolean(id),
    retry: false,
  });
}

// Create candidate profile
export function useCreateCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCandidatePayload) => createCandidate(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate", "me"],
      });
    },
  });
}

// Update candidate profile
export function useUpdateCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCandidatePayload;
    }) => updateCandidate(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["candidate", "me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["candidate", variables.id],
      });
    },
  });
}

// Delete candidate profile
export function useDeleteCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCandidate(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["candidate", "me"],
      });

      queryClient.removeQueries({
        queryKey: ["candidate", id],
      });
    },
  });
}
