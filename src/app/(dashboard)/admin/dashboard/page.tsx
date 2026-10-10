
"use client";

import {
  Users,
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
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { useGetAllUsers } from "@/components/hooks/user.hook";

import { useGetAllProblems } from "@/components/hooks/problem.hook";

import { Button } from "@/components/ui/button";
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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useState } from "react";

/* ---------- Types ---------- */

type RecordItem = Record<string, unknown>;

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: typeof Users;
};

/* ---------- Helpers ---------- */

function isRecord(value: unknown): value is RecordItem {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getRecords(value: unknown): RecordItem[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }

  if (!isRecord(value)) {
    return [];
  }

  // Supports common API response shapes:
  // data: [], data: { data: [] }, results: [], users: [], problems: []
  for (const key of [
    "data",
    "results",
    "users",
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

      if (records.length > 0) {
        return records;
      }
    }
  }

  return [];
}

function getString(record: RecordItem, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function getCount(records: RecordItem[], key: string): number {
  return records.filter(
    (record) => getString(record, key).toUpperCase() !== "",
  ).length;
}

/* ---------- Chart config ---------- */

const roleChartConfig = {
  candidates: {
    label: "Candidates",
    color: "var(--chart-1)",
  },
  companies: {
    label: "Companies",
    color: "var(--chart-2)",
  },
  admins: {
    label: "Admins",
    color: "var(--chart-3)",
  },
  other: {
    label: "Other",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const problemChartConfig = {
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

/* ---------- Statistics card ---------- */

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
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

/* ---------- Admin Dashboard ---------- */

export default function AdminDashboardPage() {
  const {
    data: usersResponse,
    isPending: usersPending,
    isError: usersError,
    error: usersErrorMessage,
    refetch: refetchUsers,
  } = useGetAllUsers();



  const {
    data: problemsResponse,
    isPending: problemsPending,
    isError: problemsError,
    error: problemsErrorMessage,
    refetch: refetchProblems,
  } = useGetAllProblems();

  const isPending =
    usersPending  || problemsPending;

  const hasError =
    usersError || problemsError;

    

const [isRefreshing, setIsRefreshing] = useState(false);

const refreshAll = async () => {
  if (isRefreshing) return;

  setIsRefreshing(true);

  try {
    await Promise.all([
      refetchUsers(),

      refetchProblems(),
    ]);
  } finally {
    setIsRefreshing(false);
  }
};

  if (isPending) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div>
          <div className="h-8 w-64 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {["1","2","3","4","5","6","7"].map((index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl border bg-muted/40"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-80 animate-pulse rounded-xl border bg-muted/40" />
          <div className="h-80 animate-pulse rounded-xl border bg-muted/40" />
        </div>
      </div>
    );
  }

  if (hasError) {
    const message =
      usersErrorMessage?.message ??

      problemsErrorMessage?.message ??
      "Could not load dashboard data.";

    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-6 text-center">
        <AlertCircle className="size-10 text-destructive" />

        <h2 className="text-lg font-semibold">
          Failed to load dashboard
        </h2>

        <p className="text-sm text-muted-foreground">{message}</p>

        <Button variant="outline" onClick={refreshAll}>
          <RefreshCw className="mr-2 size-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const users = getRecords(usersResponse);

  const problems = getRecords(problemsResponse);

  const roles = users.reduce<Record<string, number>>(
    (counts, user) => {
      const role = getString(user, "role").toUpperCase();

      if (role === "CANDIDATE") {
        counts.candidates += 1;
      } else if (role === "COMPANY") {
        counts.companies += 1;
      } else if (role === "ADMIN") {
        counts.admins += 1;
      } else {
        counts.other += 1;
      }

      return counts;
    },
    { candidates: 0, companies: 0, admins: 0, other: 0 },
  );

  const difficulties = problems.reduce<Record<string, number>>(
    (counts, problem) => {
      const difficulty = getString(problem, "difficulty").toUpperCase();

      if (difficulty === "EASY") counts.easy += 1;
      if (difficulty === "MEDIUM") counts.medium += 1;
      if (difficulty === "HARD") counts.hard += 1;

      return counts;
    },
    { easy: 0, medium: 0, hard: 0 },
  );

  const roleData = [
    { name: "candidates", value: roles.candidates },
    { name: "companies", value: roles.companies },
    { name: "admins", value: roles.admins },
    { name: "other", value: roles.other },
  ];

  const difficultyData = [
    { difficulty: "easy", total: difficulties.easy },
    { difficulty: "medium", total: difficulties.medium },
    { difficulty: "hard", total: difficulties.hard },
  ];

  const cards: StatCardProps[] = [
    {
      title: "Total Users",
      value: users.length,
      description: "All registered users",
      icon: Users,
    },

    {
      title: "Total Problems",
      value: problems.length,
      description: "Available problem records",
      icon: Code2,
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of users, candidates and problems.
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
  {isRefreshing ? "Retrying..." : "Try Again"}
</Button>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      {/* Charts */}
      <section className="grid min-w-0 gap-6 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>
              Users grouped by account role
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={roleChartConfig}
              className="mx-auto h-[300px] w-full"
            >
              <PieChart accessibilityLayer>
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel />}
                />

                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {roleData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={`var(--color-${entry.name})`}
                    />
                  ))}
                </Pie>

                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Problem Difficulty</CardTitle>
            <CardDescription>
              Problems grouped by difficulty level
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={problemChartConfig}
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
                    value.charAt(0).toUpperCase() + value.slice(1)
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

      {/* Recent users and problems */}
      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              Latest users returned by your users API
            </CardDescription>
          </CardHeader>

          <CardContent>
            {users.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No users found.
              </p>
            ) : (
              <div className="space-y-4">
                {users.slice(0, 5).map((user, index) => (
                  <div
                    key={getString(user, "id") || index}
                    className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {getString(user, "name") || "Unnamed user"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {getString(user, "email")}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                      {getString(user, "role") || "User"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Problems</CardTitle>
            <CardDescription>
              Latest problems returned by your problems API
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
                        {getString(problem, "title") || "Untitled problem"}
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
