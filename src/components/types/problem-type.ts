export interface ProblemFormValues {
  title: string;
  description: string;
  //   type: "CODING" | "MCQ" | "WRITTEN";
  type: "CODING";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  category: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  timeLimit: number;
  memoryLimit: number;
}



export interface Problem {
  id: string;
  title: string;
  description: string;
  type: "CODING";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  category: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  timeLimit: number;
  memoryLimit: number;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface ProblemMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProblemsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Problem[];
  meta: ProblemMeta;
}

export interface ProblemQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  type?: "CODING";
  sortOrder?: "asc" | "desc";
}


