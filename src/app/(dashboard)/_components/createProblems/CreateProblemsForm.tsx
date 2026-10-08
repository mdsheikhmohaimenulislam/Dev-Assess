"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateProblems } from "@/components/hooks/problem.hook";

import { ProblemFormSchema } from "@/validation/problem.validation";

import { toast } from "@/components/ui/toast";
import { ProblemFormValues } from "@/components/types";

interface ProblemDetailsPageProps {
  basePath: "/admin/problems" | "/company/problems";
}

export default function CreateProblemsForm({
  basePath,
}: ProblemDetailsPageProps) {
  const { mutate, isPending } = useCreateProblems();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProblemFormValues>({
    resolver: zodResolver(ProblemFormSchema),

    defaultValues: {
      title: "",
      description: "",
      answer: "",
      marks: 1,
      difficulty: "MEDIUM",
      category: "",
      inputFormat: "",
      outputFormat: "",
      constraints: "",
      timeLimit: 1000,
      memoryLimit: 256,

      isPaid: false,
      price: undefined,
    },
  });

  const difficulty = watch("difficulty");
  const isPaid = watch("isPaid");

  const onSubmit = (data: ProblemFormValues) => {
    const payload: ProblemFormValues = {
      ...data,
      price: data.isPaid ? data.price : undefined,
    };

    console.log("Form Data:", payload);

    mutate(payload, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Problem created successfully!",
        });

        reset();

        // router.push(basePath);
      },

      onError: (error) => {
        console.error("Create Problem Error:", error);

        toast.add({
          type: "error",
          description: "Failed to create problem.",
        });
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Coding Problem</CardTitle>

          <CardDescription>
            Create a new coding problem for candidates.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                placeholder="Enter problem title"
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description
              </Label>

              <Textarea
                id="description"
                placeholder="Describe the problem"
                rows={6}
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Answer */}
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>

              <Textarea
                id="answer"
                placeholder="Enter expected answer / solution"
                rows={6}
                {...register("answer")}
              />

              {errors.answer && (
                <p className="text-sm text-red-500">
                  {errors.answer.message}
                </p>
              )}
            </div>

            {/* Marks + Difficulty */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Marks */}
              <div className="space-y-2">
                <Label htmlFor="marks">Marks</Label>

                <Input
                  id="marks"
                  type="number"
                  min="0.1"
                  step="0.1"
                  {...register("marks", {
                    valueAsNumber: true,
                  })}
                />

                {errors.marks && (
                  <p className="text-sm text-red-500">
                    {errors.marks.message}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">
                  Difficulty
                </Label>

                <Select
                  value={difficulty}
                  onValueChange={(value) =>
                    setValue(
                      "difficulty",
                      value as ProblemFormValues["difficulty"],
                      {
                        shouldValidate: true,
                      },
                    )
                  }
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="EASY">
                      Easy
                    </SelectItem>

                    <SelectItem value="MEDIUM">
                      Medium
                    </SelectItem>

                    <SelectItem value="HARD">
                      Hard
                    </SelectItem>
                  </SelectContent>
                </Select>

                {errors.difficulty && (
                  <p className="text-sm text-red-500">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <Input
                id="category"
                placeholder="e.g. Array, String, Algorithm"
                {...register("category")}
              />

              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Input Format */}
            <div className="space-y-2">
              <Label htmlFor="inputFormat">
                Input Format
              </Label>

              <Textarea
                id="inputFormat"
                placeholder="Describe the input format"
                rows={4}
                {...register("inputFormat")}
              />

              {errors.inputFormat && (
                <p className="text-sm text-red-500">
                  {errors.inputFormat.message}
                </p>
              )}
            </div>

            {/* Output Format */}
            <div className="space-y-2">
              <Label htmlFor="outputFormat">
                Output Format
              </Label>

              <Textarea
                id="outputFormat"
                placeholder="Describe the output format"
                rows={4}
                {...register("outputFormat")}
              />

              {errors.outputFormat && (
                <p className="text-sm text-red-500">
                  {errors.outputFormat.message}
                </p>
              )}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <Label htmlFor="constraints">
                Constraints
              </Label>

              <Textarea
                id="constraints"
                placeholder="Enter problem constraints"
                rows={5}
                {...register("constraints")}
              />

              {errors.constraints && (
                <p className="text-sm text-red-500">
                  {errors.constraints.message}
                </p>
              )}
            </div>

            {/* Time + Memory */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Time Limit */}
              <div className="space-y-2">
                <Label htmlFor="timeLimit">
                  Time Limit (ms)
                </Label>

                <Input
                  id="timeLimit"
                  type="number"
                  min="1"
                  {...register("timeLimit", {
                    valueAsNumber: true,
                  })}
                />

                {errors.timeLimit && (
                  <p className="text-sm text-red-500">
                    {errors.timeLimit.message}
                  </p>
                )}
              </div>

              {/* Memory Limit */}
              <div className="space-y-2">
                <Label htmlFor="memoryLimit">
                  Memory Limit (MB)
                </Label>

                <Input
                  id="memoryLimit"
                  type="number"
                  min="1"
                  {...register("memoryLimit", {
                    valueAsNumber: true,
                  })}
                />

                {errors.memoryLimit && (
                  <p className="text-sm text-red-500">
                    {errors.memoryLimit.message}
                  </p>
                )}
              </div>
            </div>

            {/* Problem Access */}
            <div className="space-y-3">
              <Label>Problem Access</Label>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Free */}
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${
                    !isPaid
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="problemAccess"
                    value="free"
                    checked={!isPaid}
                    onChange={() => {
                      setValue("isPaid", false, {
                        shouldValidate: true,
                      });

                      setValue("price", undefined, {
                        shouldValidate: true,
                      });
                    }}
                    className="mt-1"
                  />

                  <div>
                    <p className="font-medium">
                      Free
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Everyone can access this problem.
                    </p>
                  </div>
                </label>

                {/* Paid */}
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${
                    isPaid
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="problemAccess"
                    value="paid"
                    checked={isPaid}
                    onChange={() => {
                      setValue("isPaid", true, {
                        shouldValidate: true,
                      });
                    }}
                    className="mt-1"
                  />

                  <div>
                    <p className="font-medium">
                      Paid
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Users need to purchase this
                      problem.
                    </p>
                  </div>
                </label>
              </div>

              {errors.isPaid && (
                <p className="text-sm text-red-500">
                  {errors.isPaid.message}
                </p>
              )}
            </div>

            {/* Price */}
            {isPaid && (
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price
                </Label>

                <Input
                  id="price"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter price"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />

                <p className="text-xs text-muted-foreground">
                  Enter the price users need to pay
                  to access this problem.
                </p>

                {errors.price && (
                  <p className="text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending
                  ? "Creating..."
                  : "Create Problem"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}