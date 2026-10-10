
"use client";

import {
  UserRoundCheck,
  Code2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

import { useGetAllCandidates } from "@/components/hooks/candidate.hook";
import { useGetAllProblems } from "@/components/hooks/problem.hook";

import { Button } from "@/components/ui/button";
import { Candidate } from '../../../../api/candidate.api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type RecordItem = Record<string, unknown>;

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: typeof UserRoundCheck;
};

function isRecord(value: unknown): value is RecordItem {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getRecords(value: unknown): RecordItem[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }

  if (!isRecord(value)) return [];

  for (const key of [
    "data",
    "results",
    "candidates",
    "problems",
    "items",
  ]) {
    const nested = value[key];

    if (Array.isArray(nested)) {
      return nested.filter(isRecord);
    }

    if (isRecord(nested)) {
      const records = getRecords(nested);

      if (records.length > 0) return records;
    }
  }

  return [];
}

function getString(
  record: RecordItem,
  key: string,
): string {
  const value = record[key];

  return typeof value === "string" ? value : "";
}

const difficultyChartConfig = {
  easy: {
    label: "Easy",
    color: "var(--chart-2)",
  },
  medium: {
    label: "Medium",
    color: "var(--chart-4)",
  },
  hard: {
    label: "Hard",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="size-5" />
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold tracking-tight">
          {value}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default function CompanyDashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: candidatesResponse,
    isPending: candidatesPending,
    isError: candidatesError,
    error: candidatesErrorMessage,
    refetch: refetchCandidates,
  } = useGetAllCandidates();

  const {
    data: problemsResponse,
    isPending: problemsPending,
    isError: problemsError,
    error: problemsErrorMessage,
    refetch: refetchProblems,
  } = useGetAllProblems();

  const isPending = candidatesPending || problemsPending;
  const hasError = candidatesError || problemsError;

  const refreshAll = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    try {
      await Promise.all([
        refetchCandidates(),
        refetchProblems(),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isPending) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="h-8 w-64 animate-pulse rounded bg-muted" />
        <div className="h-4 w-80 animate-pulse rounded bg-muted" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {["1", "2", "3"].map((index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl border bg-muted/40"
            />
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    const message =
      candidatesErrorMessage?.message ??
      problemsErrorMessage?.message ??
      "Could not load dashboard data.";

    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-6 text-center">
        <AlertCircle className="size-10 text-destructive" />

        <h2 className="text-lg font-semibold">
          Failed to load dashboard
        </h2>

        <p className="text-sm text-muted-foreground">
          {message}
        </p>

        <Button
          variant="outline"
          onClick={refreshAll}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
          {isRefreshing ? "Retrying..." : "Try Again"}
        </Button>
      </div>
    );
  }

  const candidates = getRecords(candidatesResponse);
  const problems = getRecords(problemsResponse);

  const difficulties = problems.reduce<Record<string, number>>(
    (counts, problem) => {
      const difficulty = getString(
        problem,
        "difficulty",
      ).toUpperCase();

      if (difficulty === "EASY") counts.easy += 1;
      if (difficulty === "MEDIUM") counts.medium += 1;
      if (difficulty === "HARD") counts.hard += 1;

      return counts;
    },
    {
      easy: 0,
      medium: 0,
      hard: 0,
    },
  );

  const difficultyData = [
    { difficulty: "easy", total: difficulties.easy },
    { difficulty: "medium", total: difficulties.medium },
    { difficulty: "hard", total: difficulties.hard },
  ];

  const cards: StatCardProps[] = [
    {
      title: "Total Candidates",
      value: candidates.length,
      description: "Candidate records returned by API",
      icon: UserRoundCheck,
    },
    {
      title: "Total Problems",
      value: problems.length,
      description: "Problem records returned by API",
      icon: Code2,
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Candidate Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Overview of candidates and coding problems.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={refreshAll}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <section>
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Problem Difficulty</CardTitle>
            <CardDescription>
              Problems grouped by difficulty
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={difficultyChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={difficultyData}
                margin={{ left: 8, right: 12, top: 12 }}
              >
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="difficulty"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) =>
                    value.charAt(0).toUpperCase() +
                    value.slice(1)
                  }
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                  {difficultyData.map((entry) => (
                    <Cell
                      key={entry.difficulty}
                      fill={`var(--color-${entry.difficulty})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
            <CardDescription>
              Candidate records returned by your API
            </CardDescription>
          </CardHeader>

          <CardContent>
            {candidates.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No candidates found.
              </p>
            ) : (
              <div className="space-y-4">
                {candidates.slice(0, 5).map((candidate, index) => (
                  <div
                    key={getString(candidate, "id") || index}
                    className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {getString(candidate, "name") ||
                          "Unnamed candidate"}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {getString(candidate, "email")}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                      Candidate
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Problems</CardTitle>
            <CardDescription>
              Problem records returned by your API
            </CardDescription>
          </CardHeader>

          <CardContent>
            {problems.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No problems found.
              </p>
            ) : (
              <div className="space-y-4">
                {problems.slice(0, 5).map((problem, index) => (
                  <div
                    key={getString(problem, "id") || index}
                    className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {getString(problem, "title") ||
                          "Untitled problem"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {getString(problem, "type") || "Problem"}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs">
                      {getString(problem, "difficulty") || "Unknown"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
