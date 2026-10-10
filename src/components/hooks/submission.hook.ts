import { getMySubmissions, getSubmissionById, getSubmissions, updateSubmission } from "@/api/submission.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateSubmissionPayload } from "../types/submission";


interface UpdateSubmissionVariables {
  id: string;
  payload: UpdateSubmissionPayload;
}

export const useGetSubmissions = () => {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });
};


export const useGetSubmissionById = (id: string) => {
  return useQuery({
    queryKey: ["submissions", id],
    queryFn: () => getSubmissionById(id),
    enabled: Boolean(id),
  });
};


export const useGetMySubmissions = () => {
  return useQuery({
    queryKey: ["submissions", "my"],
    queryFn: getMySubmissions,
  });
};


export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateSubmissionVariables) => updateSubmission(id, payload),

    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["submissions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["submissions", variables.id],
        }),
      ]);
    },
  });
};