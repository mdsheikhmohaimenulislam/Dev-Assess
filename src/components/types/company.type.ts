export interface Company {
  id: string;
  userId: string;
  companyName: string;
  description?: string | null;
  website?: string | null;
  logo?: string | null;
  createdAt: string;
  updatedAt: string;

  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };

  _count?: {
    assessments: number;
  };
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
export interface CompanyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Company;
}