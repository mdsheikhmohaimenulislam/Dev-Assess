

export interface Assessment {
  id: string;
  title: string;
  description?: string | null;
  duration: number;
  startTime?: string | null;
  endTime?: string | null;
  totalMarks: number;
  passingMarks: number;
  accessType: AssessmentAccessType;
  price?: number | null;
  companyId: string;
  createdAt: string;
  updatedAt: string;

  company?: {
    id: string;
    companyName: string;
  };
}

export interface AssessmentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Assessment;
}

export interface AssessmentListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Assessment[];
}

export interface CreateAssessmentPayload {
  title: string;
  description?: string;
  duration: number;
  startTime?: string;
  endTime?: string;
  totalMarks: number;
  passingMarks: number;
  accessType: AssessmentAccessType;
  price?: number;
  companyId: string;
}

export interface UpdateAssessmentPayload {
  title?: string;
  description?: string;
  duration?: number;
  startTime?: string;
  endTime?: string;
  totalMarks?: number;
  passingMarks?: number;
  accessType?: AssessmentAccessType;
  price?: number;
}

export type AssessmentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export type AssessmentAccessType = "FREE" | "PAID";

export interface Assessment {
  id: string;

  title: string;

  description?: string | null;

  duration: number;

  startTime?: string | null;

  endTime?: string | null;

  totalMarks: number;

  passingMarks: number;

  accessType: AssessmentAccessType;

  price?: number | null;

  // Assessment status
  status: AssessmentStatus;

  // Company
  companyId: string;

  company?: {
    id: string;
    companyName: string;
  };

  // Created By
  createdById: string;

  createdBy?: {
    id: string;
    name: string;
    email: string;
  };

  createdAt: string;

  updatedAt: string;

  // Assessment counts
  _count?: {
    problems: number;
    invitations: number;
    attempts: number;
  };
}

export interface AssessmentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Assessment;
}

export interface AssessmentListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Assessment[];
}