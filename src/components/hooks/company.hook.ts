import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateCompanyPayload, UpdateCompanyPayload } from "../types";
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, getMyCompany, updateCompany } from "@/api/company.api";



export function useGetAllCompanies() {
  return useQuery({
    queryKey: ["company"],
    queryFn: getAllCompanies,
  });
}



// Create company
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });
}

// Get own company
export function useGetMyCompany() {
  return useQuery({
    queryKey: ["company", "me"],
    queryFn: getMyCompany,
  });
}

// Get company by ID
export function useGetCompanyById(id: string) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompanyById(id),
    enabled: Boolean(id),
  });
}

// Update company
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCompanyPayload;
    }) => updateCompany(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });

      queryClient.invalidateQueries({
        queryKey: ["company", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["company", "me"],
      });
    },
  });
}

// Delete company
export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });
    },
  });
}