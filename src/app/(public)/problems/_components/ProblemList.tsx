import ProblemCard from "./ProblemCard";

import type { Problem } from "@/components/types";

interface ProblemListProps {
  problems: Problem[];
}

export default function ProblemList({
  problems,
}: ProblemListProps) {
  if (problems.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {problems.map((problem) => (
        <ProblemCard
          key={problem.id}
          problem={problem}
        />
      ))}
    </div>
  );
}