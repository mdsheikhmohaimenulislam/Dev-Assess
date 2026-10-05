import apiClient from '@/lib/apiClient';
import { Company, CompanyListResponse, CompanyResponse, CreateCompanyPayload, UpdateCompanyPayload } from '../components/types/company.type';



export function getAllCompanies() {
  return apiClient<CompanyListResponse>("/company", {
    method: "GET",
  });
}


// Create company
export function createCompany(payload: CreateCompanyPayload) {
  return apiClient<{ data: Company }>("/company", {
    method: "POST",
    body: payload,
  });
}

// Get own company profile
export function getMyCompany() {
  return apiClient<CompanyResponse>("/company/me", {
    method: "GET",
  });
}

// Get company by ID
export function getCompanyById(id: string) {
  return apiClient<Company>(`/company/${id}`, {
    method: "GET",
  });
}

// Update company
export function updateCompany(
  id: string,
  payload: UpdateCompanyPayload,
) {
  return apiClient<Company>(`/company/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// Delete company
export function deleteCompany(id: string) {
  return apiClient(`/company/${id}`, {
    method: "DELETE",
  });
}