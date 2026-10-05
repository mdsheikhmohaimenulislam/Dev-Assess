"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Code2,
  Cpu,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetSingleProblem } from "@/components/hooks/problem.hook";

interface ProblemDetailsPageProps {
  basePath: "/admin/problems" | "/company/problems";
}

export default function ProblemDetailsPage({
  basePath,
}: ProblemDetailsPageProps) {
  const params = useParams<{ id: string }>();
  const problemId = params.id;
  const router = useRouter();

  const { data, isLoading, isError } = useGetSingleProblem(problemId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-muted-foreground">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <p className="text-destructive">
            Failed to load problem.
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(basePath)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const problem = data.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(basePath)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge>{problem.type}</Badge>

              <Badge variant="secondary">
                {problem.difficulty}
              </Badge>

              <Badge variant="outline">
                {problem.category}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {problem.title}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Problem ID: {problem.id}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Problem */}
        <div className="space-y-6">
          {/* Description */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Problem Description
            </h2>

            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
              {problem.description}
            </p>
          </section>

          {/* Input Format */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Input Format
            </h2>

            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
              {problem.inputFormat}
            </p>
          </section>

          {/* Output Format */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Output Format
            </h2>

            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
              {problem.outputFormat}
            </p>
          </section>

          {/* Constraints */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Constraints
            </h2>

            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
              {problem.constraints}
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Problem Information */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold">
              Problem Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Time Limit
                  </p>

                  <p className="font-medium">
                    {problem.timeLimit} ms
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Memory Limit
                  </p>

                  <p className="font-medium">
                    {problem.memoryLimit} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Created By
                  </p>

                  <p className="font-medium">
                    {problem.createdBy.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {problem.createdBy.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Code2 className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Type
                  </p>

                  <p className="font-medium">
                    {problem.type}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dates */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold">
              Dates
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Created At
                  </p>

                  <p className="text-sm font-medium">
                    {new Date(problem.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Last Updated
                  </p>

                  <p className="text-sm font-medium">
                    {new Date(problem.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}