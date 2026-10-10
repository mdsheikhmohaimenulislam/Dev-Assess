
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Mail,
  Play,
  Tag,
  UserRound,
} from "lucide-react";

import { useGetSingleProblem } from "@/components/hooks/problem.hook";
import { useSubmitProblem } from "@/components/hooks/useSubmitAnswer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Loading from "@/app/loading";
import SolveProblemDialog from "../_components/SolveProblemDialog";

export default function DetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [solveDialogOpen, setSolveDialogOpen] = useState(false);

  const { data, isLoading, isError } = useGetSingleProblem(id);

  const {
    mutate: submitProblem,
    isPending,
  } = useSubmitProblem();

  const problem = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !problem) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-5xl">
          <Card>
            <CardContent className="flex min-h-100 flex-col items-center justify-center gap-4">
              <p className="text-lg font-medium">
                Problem not found
              </p>

              <Button>
                <Link href="/problems">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Problems
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Back button */}
        <Button variant="outline">
          <Link href="/problems">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        {/* Problem header */}
        <Card>
          <CardHeader className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>
                <Code2 className="mr-1 h-3.5 w-3.5" />
                {problem.type}
              </Badge>

              <Badge variant="secondary">
                {problem.difficulty}
              </Badge>

              <Badge variant="outline">
                <Tag className="mr-1 h-3.5 w-3.5" />
                {problem.category}
              </Badge>
            </div>

            <div>
              <CardTitle className="text-3xl">
                {problem.title}
              </CardTitle>

              <CardDescription className="mt-3 text-base leading-7">
                {problem.description}
              </CardDescription>
            </div>

            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">
                Problem ID
              </p>

              <p className="mt-1 break-all font-mono text-sm">
                {problem.id}
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Problem information */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Difficulty
                </p>
                <p className="font-medium">
                  {problem.difficulty}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <Clock className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Time Limit
                </p>
                <p className="font-medium">
                  {problem.timeLimit} ms
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <Cpu className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Memory Limit
                </p>
                <p className="font-medium">
                  {problem.memoryLimit} MB
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <Tag className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Category
                </p>
                <p className="font-medium">
                  {problem.category}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Problem description */}
        <Card>
          <CardHeader>
            <CardTitle>Problem Description</CardTitle>
            <CardDescription>
              Understand the problem before submitting your solution.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
              {problem.description}
            </p>
          </CardContent>
        </Card>

        {/* Input format */}
        <Card>
          <CardHeader>
            <CardTitle>Input Format</CardTitle>
          </CardHeader>

          <CardContent>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-7">
              {problem.inputFormat}
            </pre>
          </CardContent>
        </Card>

        {/* Output format */}
        <Card>
          <CardHeader>
            <CardTitle>Output Format</CardTitle>
          </CardHeader>

          <CardContent>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-7">
              {problem.outputFormat}
            </pre>
          </CardContent>
        </Card>

        {/* Constraints */}
        <Card>
          <CardHeader>
            <CardTitle>Constraints</CardTitle>
          </CardHeader>

          <CardContent>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-7">
              {problem.constraints}
            </pre>
          </CardContent>
        </Card>

        {/* Created by */}
        <Card>
          <CardHeader>
            <CardTitle>Created By</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                  <UserRound className="h-5 w-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="font-medium">
                    {problem.createdBy.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {problem.createdBy.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{problem.createdBy.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dates */}
        <Card>
          <CardHeader>
            <CardTitle>Problem Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Created At
                  </p>

                  <p className="font-medium">
                    {new Date(problem.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Last Updated
                  </p>

                  <p className="font-medium">
                    {new Date(problem.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solve problem action */}
        <Card>
          <CardContent className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
            <div>
              <h3 className="font-semibold">
                Ready to solve this problem?
              </h3>

              <p className="text-sm text-muted-foreground">
                Submit your solution and test your skills.
              </p>
            </div>

            <Button
              onClick={() => setSolveDialogOpen(true)}
              disabled={isPending}
            >
              <Play className="mr-2 h-4 w-4" />
              Solve Problem
            </Button>
          </CardContent>
        </Card>

        {/* Solve problem dialog */}
        <SolveProblemDialog
          open={solveDialogOpen}
          onOpenChange={setSolveDialogOpen}
          problemId={problem.id}
          problemTitle={problem.title}
          submitProblem={submitProblem}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
