export interface CreateAssessmentProblemPayload {
  problemId: string;
  marks: number;
  order: number;
}

export interface UpdateAssessmentProblemPayload {
  marks?: number;
  order?: number;
}

export interface AssessmentProblem {
  id: string;
  assessmentId: string;
  problemId: string;
  marks: number;
  order: number;

  problem?: {
    id: string;
    title: string;
    type: string;
    difficulty: string;
    category: string;
  };
}

export interface AssessmentProblemResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AssessmentProblem;
}

export interface AssessmentProblemListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AssessmentProblem[];
}