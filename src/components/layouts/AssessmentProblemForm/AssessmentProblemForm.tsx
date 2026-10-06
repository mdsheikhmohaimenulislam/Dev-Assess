"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";

import { useCreateAssessmentProblem } from "@/components/hooks/assessment-problem.hook";
import { useGetAllProblems } from "@/components/hooks/problem.hook";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssessmentProblemFormProps {
  assessmentId: string;
  onSuccess?: () => void;
}

interface Problem {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  category: string;
  marks?: number;
}

export default function AssessmentProblemForm({
  assessmentId,
  onSuccess,
}: AssessmentProblemFormProps) {
  const [problemId, setProblemId] = useState("");
  const [marks, setMarks] = useState("");
  const [order, setOrder] = useState("");

  const createAssessmentProblem =
    useCreateAssessmentProblem();

  const {
    data: problemsData,
    isLoading: problemsLoading,
  } = useGetAllProblems();

  const problems: Problem[] = problemsData?.data ?? [];

  const selectedProblem = problems.find(
    (problem: Problem) => problem.id === problemId,
  );

const handleProblemChange = (value: string | null) => {
  if (!value) {
    setProblemId("");
    setMarks("");
    return;
  }

  setProblemId(value);

  const problem = problems.find(
    (item: Problem) => item.id === value,
  );

  if (problem) {
    setMarks(String(problem.marks ?? 1));
  }
};

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!problemId) {
      toast.error("Please select a problem.");
      return;
    }

    const marksValue = Number(marks);
    const orderValue = Number(order);

    if (marksValue <= 0) {
      toast.error("Marks must be greater than 0.");
      return;
    }

    if (orderValue <= 0) {
      toast.error("Order must be greater than 0.");
      return;
    }

    createAssessmentProblem.mutate(
      {
        assessmentId,
        payload: {
          problemId,
          marks: marksValue,
          order: orderValue,
        },
      },
      {
        onSuccess: () => {
            console.log("MUTATION SUCCESS");
          toast.success(
            "Problem added to assessment successfully.",
          );

          setProblemId("");
          setMarks("");
          setOrder("");

          // onSuccess?.();
        },

        onError: (error) => {
          console.error(
            "Create assessment problem error:",
            error,
          );

          toast.error(
            "Failed to add problem to assessment.",
          );
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Problem */}
      <div className="space-y-2">
        <Label htmlFor="problem">
          Problem
        </Label>

        <Select
          value={problemId}
          onValueChange={handleProblemChange}
          disabled={problemsLoading}
        >
          <SelectTrigger id="problem">
            <SelectValue
              placeholder={
                problemsLoading
                  ? "Loading problems..."
                  : "Select a problem"
              }
            />
          </SelectTrigger>

          <SelectContent>
            {problems.map((problem: Problem) => (
              <SelectItem
                key={problem.id}
                value={problem.id}
              >
                {problem.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Problem Information */}
      {selectedProblem && (
        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="font-medium">
            {selectedProblem.title}
          </p>

          <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span>
              Type: {selectedProblem.type}
            </span>

            <span>
              Difficulty: {selectedProblem.difficulty}
            </span>

            <span>
              Category: {selectedProblem.category}
            </span>
          </div>

          <p className="mt-2 break-all text-xs text-muted-foreground">
            Problem ID: {selectedProblem.id}
          </p>
        </div>
      )}

      {/* Marks + Order */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="marks">
            Marks
          </Label>

          <Input
            id="marks"
            type="number"
            min="1"
            value={marks}
            onChange={(event) =>
              setMarks(event.target.value)
            }
            placeholder="e.g. 50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">
            Order
          </Label>

          <Input
            id="order"
            type="number"
            min="1"
            value={order}
            onChange={(event) =>
              setOrder(event.target.value)
            }
            placeholder="e.g. 1"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            createAssessmentProblem.isPending ||
            problemsLoading
          }
        >
          {createAssessmentProblem.isPending
            ? "Adding..."
            : "Add Problem"}
        </Button>
      </div>
    </form>
  );
}