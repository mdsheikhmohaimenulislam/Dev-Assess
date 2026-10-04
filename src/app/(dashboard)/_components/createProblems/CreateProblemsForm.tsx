"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { ProblemFormValues } from "@/components/types";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

export default function CreateProblemsForm() {
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
      type: "CODING",
      difficulty: "MEDIUM",
      title: "",
      description: "",
      category: "",
      inputFormat: "",
      outputFormat: "",
      constraints: "",
      timeLimit: 1000,
      memoryLimit: 256,
    },
  });

  const difficulty = watch("difficulty");

  const onSubmit = (data: ProblemFormValues) => {
    console.log("Form Data:", data);

    mutate(data, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Problem created successfully!",
        });
        reset();
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
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Problem</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a new coding problem for candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ================= BASIC INFORMATION ================= */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>

              <CardDescription>
                Provide the basic information about this problem.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Problem Title</Label>

                <Input
                  id="title"
                  placeholder="e.g. Maximum Subarray Sum"
                  {...register("title")}
                />

                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  rows={6}
                  placeholder="Describe the problem..."
                  {...register("description")}
                />

                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Type / Difficulty / Category */}
              <div className="grid gap-5 md:grid-cols-3">
                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>

                  <Input id="type" value="CODING" disabled />

                  {errors.type && (
                    <p className="text-sm text-destructive">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label>Difficulty</Label>

                  <Select
                    value={difficulty}
                    onValueChange={(value) =>
                      setValue(
                        "difficulty",
                        value as ProblemFormValues["difficulty"],
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        },
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.difficulty && (
                    <p className="text-sm text-destructive">
                      {errors.difficulty.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>

                  <Input
                    id="category"
                    placeholder="Dynamic Programming"
                    {...register("category")}
                  />

                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ================= PROBLEM DETAILS ================= */}
          <Card>
            <CardHeader>
              <CardTitle>Problem Details</CardTitle>

              <CardDescription>
                Define the input, output, and constraints for the problem.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Input Format */}
              <div className="space-y-2">
                <Label htmlFor="inputFormat">Input Format</Label>

                <Textarea
                  id="inputFormat"
                  rows={4}
                  placeholder="The first line contains n..."
                  {...register("inputFormat")}
                />

                {errors.inputFormat && (
                  <p className="text-sm text-destructive">
                    {errors.inputFormat.message}
                  </p>
                )}
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <Label htmlFor="outputFormat">Output Format</Label>

                <Textarea
                  id="outputFormat"
                  rows={4}
                  placeholder="Print the maximum possible sum..."
                  {...register("outputFormat")}
                />

                {errors.outputFormat && (
                  <p className="text-sm text-destructive">
                    {errors.outputFormat.message}
                  </p>
                )}
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <Label htmlFor="constraints">Constraints</Label>

                <Textarea
                  id="constraints"
                  rows={4}
                  placeholder="1 <= n <= 100000"
                  {...register("constraints")}
                />

                {errors.constraints && (
                  <p className="text-sm text-destructive">
                    {errors.constraints.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ================= EXECUTION LIMITS ================= */}
          <Card>
            <CardHeader>
              <CardTitle>Execution Limits</CardTitle>

              <CardDescription>
                Configure the resource limits for code execution.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                {/* Time Limit */}
                <div className="space-y-2">
                  <Label>Time Limit</Label>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter time"
                      {...register("timeLimit", {
                        valueAsNumber: true,
                      })}
                    />

                    <Select defaultValue="MINUTE">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="MINUTE">Minute</SelectItem>
                        <SelectItem value="HOUR">Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {errors.timeLimit && (
                    <p className="text-sm text-destructive">
                      {errors.timeLimit.message}
                    </p>
                  )}
                </div>

                {/* Memory Limit */}
                <div className="space-y-2">
                  <Label htmlFor="memoryLimit">
                    Memory Limit
                    <span className="ml-1 text-muted-foreground">(MB)</span>
                  </Label>

                  <Input
                    id="memoryLimit"
                    type="number"
                    placeholder="256"
                    {...register("memoryLimit", {
                      valueAsNumber: true,
                    })}
                  />

                  {errors.memoryLimit && (
                    <p className="text-sm text-destructive">
                      {errors.memoryLimit.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => reset()}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Problem"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
