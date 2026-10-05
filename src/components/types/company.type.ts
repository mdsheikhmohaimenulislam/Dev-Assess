export interface Company {
  id: string;
  userId: string;
  companyName: string;
  description?: string;
  website?: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyListResponse {
  data: Company[];
}

export interface CreateCompanyPayload {
  userId?: string;
  companyName: string;
  description?: string;
  website?: string;
  logo?: string;
}

export interface UpdateCompanyPayload {
  companyName?: string;
  description?: string;
  website?: string;
  logo?: string;
}