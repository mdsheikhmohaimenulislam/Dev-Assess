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
