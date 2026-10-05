import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAssessment,
  deleteAssessment,
  getAssessmentById,
  getAssessments,
  updateAssessment,
  updateAssessmentStatus,
} from "@/api/assessment.api";

import type {
  CreateAssessmentPayload,
  UpdateAssessmentPayload,
} from "@/components/types/assessment.type";

export function useGetAssessments() {
  return useQuery({
    queryKey: ["assessments"],
    queryFn: getAssessments,
  });
}

export function useGetAssessmentById(id: string) {
  return useQuery({
    queryKey: ["assessment", id],
    queryFn: () => getAssessmentById(id),
    enabled: Boolean(id),
  });
}

export function useCreateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAssessmentPayload) =>
      createAssessment(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });
    },
  });
}

export function useUpdateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAssessmentPayload;
    }) => updateAssessment(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assessment", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });
    },
  });
}

export function useDeleteAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAssessment(id),

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["assessment", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });
    },
  });
}

export function useUpdateAssessmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => updateAssessmentStatus(id, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assessment", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });
    },
  });
}