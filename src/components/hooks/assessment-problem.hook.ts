import { createAssessmentProblem, deleteAssessmentProblem, getAssessmentProblemById, getAssessmentProblems, updateAssessmentProblem } from "@/api/assessment-problem.api";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateAssessmentProblemPayload, UpdateAssessmentProblemPayload } from "../types";



/**
 * Get all problems of an assessment
 */
export function useGetAssessmentProblems(
  assessmentId: string,
) {
  return useQuery({
    queryKey: ["assessment-problems", assessmentId],
    queryFn: () =>
      getAssessmentProblems(assessmentId),
    enabled: Boolean(assessmentId),
  });
}

/**
 * Get single assessment problem
 */
export function useGetAssessmentProblemById(
  id: string,
) {
  return useQuery({
    queryKey: ["assessment-problem", id],
    queryFn: () =>
      getAssessmentProblemById(id),
    enabled: Boolean(id),
  });
}

/**
 * Create assessment problem
 */
export function useCreateAssessmentProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assessmentId,
      payload,
    }: {
      assessmentId: string;
      payload: CreateAssessmentProblemPayload;
    }) =>
      createAssessmentProblem(
        assessmentId,
        payload,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "assessment-problems",
          variables.assessmentId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "assessment",
          variables.assessmentId,
        ],
      });
    },
  });
}

/**
 * Update assessment problem
 */
export function useUpdateAssessmentProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      assessmentId,
      payload,
    }: {
      id: string;
      assessmentId: string;
      payload: UpdateAssessmentProblemPayload;
    }) =>
      updateAssessmentProblem(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "assessment-problems",
          variables.assessmentId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "assessment-problem",
          variables.id,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "assessment",
          variables.assessmentId,
        ],
      });
    },
  });
}

/**
 * Delete assessment problem
 */
export function useDeleteAssessmentProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      assessmentId,
    }: {
      id: string;
      assessmentId: string;
    }) =>
      deleteAssessmentProblem(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "assessment-problems",
          variables.assessmentId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "assessment",
          variables.assessmentId,
        ],
      });
    },
  });
}