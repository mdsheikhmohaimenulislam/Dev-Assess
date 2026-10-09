"use client";

import { useGetMyPayments } from "@/components/hooks/payment.hook";
import ProblemCard from "./ProblemCard";

import type { Problem } from "@/components/types";

interface ProblemListProps {
  problems: Problem[];
}

export default function ProblemList({ problems }: ProblemListProps) {
  const { data, isLoading, isError } = useGetMyPayments();

  const paymentData = data?.data ?? [];


  if (problems.length === 0) {
    return null;
  }

  if (isLoading) {
    return <p>Checking payment status...</p>;
  }

  if (isError) {
    return <p>Unable to load payment status.</p>;
  }

  const paidProblemIds = new Set(
    paymentData
      .filter((payment) => payment.status === "PAID")
      .map((payment) => payment.problemId),
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {problems.map((problem) => (
        <ProblemCard
          key={problem.id}
          problem={problem}
          hasPaid={paidProblemIds.has(problem.id)}
        />
      ))}
    </div>
  );
}