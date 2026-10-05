"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import {
  ArrowLeft,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Pencil,
  Trophy,
} from "lucide-react";

import { useGetAssessmentById } from "@/components/hooks/assessment.hook";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssessmentDetailsProps {
  basePath: "/admin/assessments" | "/company/assessments";
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export default function AssessmentDetails({
  basePath,
}: AssessmentDetailsProps) {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useGetAssessmentById(params.id);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading assessment...
        </p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-destructive">Failed to load assessment.</p>

        <Button variant="outline" onClick={() => router.push(basePath)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const assessment = data.data;

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push(basePath)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button asChild>
          <Link href={`${basePath}/${assessment.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      {/* Assessment Information */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Badge className="mb-3">{assessment.accessType}</Badge>

        <h1 className="text-3xl font-bold">{assessment.title}</h1>

        <p className="mt-3 leading-7 text-muted-foreground">
          {assessment.description}
        </p>
      </div>

      {/* Assessment Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          icon={<Clock className="h-5 w-5" />}
          label="Duration"
          value={formatDuration(assessment.duration)}
        />

        <InfoCard
          icon={<Trophy className="h-5 w-5" />}
          label="Total Marks"
          value={String(assessment.totalMarks)}
        />

        <InfoCard
          icon={<FileText className="h-5 w-5" />}
          label="Passing Marks"
          value={String(assessment.passingMarks)}
        />

        <InfoCard
          icon={<CreditCard className="h-5 w-5" />}
          label="Access"
          value={assessment.accessType}
        />
      </div>

      {/* Schedule */}
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          icon={<Calendar className="h-5 w-5" />}
          label="Start Time"
          value={new Date(assessment.startTime).toLocaleString()}
        />

        <InfoCard
          icon={<Calendar className="h-5 w-5" />}
          label="End Time"
          value={new Date(assessment.endTime).toLocaleString()}
        />
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 text-muted-foreground">{icon}</div>

      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}