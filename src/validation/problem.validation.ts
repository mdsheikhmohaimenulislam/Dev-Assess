import { z } from "zod";

export const ProblemFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),

    description: z
      .string()
      .min(1, "Description is required"),

    answer: z.string().min(1, "Answer is required"),

    marks: z
      .number()
      .min(0.1, "Marks must be at least 0.1"),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

    category: z
      .string()
      .min(1, "Category is required"),

    inputFormat: z
      .string()
      .min(1, "Input format is required"),

    outputFormat: z
      .string()
      .min(1, "Output format is required"),

    constraints: z
      .string()
      .min(1, "Constraints are required"),

    timeLimit: z
      .number()
      .min(1, "Time limit must be at least 1"),

    memoryLimit: z
      .number()
      .min(1, "Memory limit must be at least 1"),

    isPaid: z.boolean(),

    price: z
      .number()
      .min(1, "Price must be at least 1")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.isPaid) {
        return data.price !== undefined && data.price > 0;
      }

      return true;
    },
    {
      message: "Price is required for paid problems",
      path: ["price"],
    },
  );

export type ProblemFormValues = z.infer<typeof ProblemFormSchema>;