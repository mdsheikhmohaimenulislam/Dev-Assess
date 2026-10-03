import { z } from "zod";

export const ProblemFormSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().min(1, "Description is required"),

  type: z.literal("CODING"),

  //   type: z.enum(["CODING", "MCQ", "WRITTEN"]),

  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

  category: z.string().min(1, "Category is required"),

  inputFormat: z.string().min(1, "Input format is required"),

  outputFormat: z.string().min(1, "Output format is required"),

  constraints: z.string().min(1, "Constraints are required"),

  timeLimit: z.number().positive("Time limit must be greater than 0"),

  memoryLimit: z.number().positive("Memory limit must be greater than 0"),
});

export type ProblemFormData = z.infer<typeof ProblemFormSchema>;
