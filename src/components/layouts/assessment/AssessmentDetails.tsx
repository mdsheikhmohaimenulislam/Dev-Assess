"use client";

import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Mail,
  Pencil,
  Trophy,
  User,
  Users,
} from "lucide-react";

import { useGetAssessmentById } from "@/components/hooks/assessment.hook";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AssessmentDetailsProps {
  basePath: "/admin/assessments" | "/company/assessments" | "/candidate/assessments";
}

type AssessmentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

/* ---------------- Duration ---------------- */

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

/* ---------------- Date ---------------- */

function formatDateTime(
  date: string | null | undefined,
): string {
  if (!date) {
    return "Not specified";
  }

  return new Date(date).toLocaleString();
}

/* ---------------- Status Color ---------------- */

function getStatusClassName(
  status: AssessmentStatus,
): string {
  switch (status) {
    case "PUBLISHED":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400";

    case "ONGOING":
      return "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400";

    case "COMPLETED":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400";

    case "CANCELLED":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400";

    case "DRAFT":
    default:
      return "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400";
  }
}

/* ---------------- Component ---------------- */

export default function AssessmentDetails({
  basePath,
}: AssessmentDetailsProps) {
  const params = useParams<{ id: string }>();

  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useGetAssessmentById(params.id);

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading assessment...
        </p>
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Assessment not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The assessment you are looking for does not exist
            or could not be loaded.
          </p>

          <Button
            className="mt-4"
            variant="outline"
            onClick={() => router.push(basePath)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Button>
        </div>
      </div>
    );
  }

  const assessment = data.data;

  const status =
    assessment.status as AssessmentStatus;

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push(basePath)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

      </div>

      {/* ================= Main Information ================= */}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {/* Badges */}

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {/* Access Type */}
          <Badge variant="outline">
            {assessment.accessType}
          </Badge>

          {/* Status */}
          <Badge
            variant="outline"
            className={getStatusClassName(status)}
          >
            {status}
          </Badge>
        </div>

        {/* Title */}

        <h1 className="text-3xl font-bold tracking-tight">
          {assessment.title}
        </h1>

        {/* Description */}

        <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
          {assessment.description ||
            "No description available."}
        </p>
      </div>

      {/* ================= Assessment Stats ================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Passing Marks"
          value={String(assessment.passingMarks)}
        />

        <InfoCard
          icon={<CreditCard className="h-5 w-5" />}
          label="Price"
          value={
            assessment.accessType === "PAID"
              ? `৳${assessment.price ?? 0}`
              : "Free"
          }
        />
      </div>

      {/* ================= Schedule ================= */}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Assessment Schedule
          </h2>

          <p className="text-sm text-muted-foreground">
            Assessment availability and timing information.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard
            icon={<Calendar className="h-5 w-5" />}
            label="Start Time"
            value={formatDateTime(
              assessment.startTime,
            )}
          />

          <InfoCard
            icon={<Calendar className="h-5 w-5" />}
            label="End Time"
            value={formatDateTime(
              assessment.endTime,
            )}
          />
        </div>
      </div>

      {/* ================= Company Information ================= */}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Company Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Company responsible for this assessment.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard
            icon={<FileText className="h-5 w-5" />}
            label="Company Name"
            value={
              assessment.company?.companyName ??
              "Not specified"
            }
          />

          <InfoCard
            icon={<FileText className="h-5 w-5" />}
            label="Company ID"
            value={assessment.companyId}
          />
        </div>
      </div>

      {/* ================= Created By ================= */}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Created By
          </h2>

          <p className="text-sm text-muted-foreground">
            Information about the user who created this
            assessment.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard
            icon={<User className="h-5 w-5" />}
            label="Name"
            value={
              assessment.createdBy?.name ??
              "Not specified"
            }
          />

          <InfoCard
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={
              assessment.createdBy?.email ??
              "Not specified"
            }
          />
        </div>
      </div>



      {/* ================= Metadata ================= */}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Assessment Metadata
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard
            icon={<Calendar className="h-5 w-5" />}
            label="Created At"
            value={formatDateTime(
              assessment.createdAt,
            )}
          />

          <InfoCard
            icon={<Calendar className="h-5 w-5" />}
            label="Last Updated"
            value={formatDateTime(
              assessment.updatedAt,
            )}
          />

          <InfoCard
            icon={<FileText className="h-5 w-5" />}
            label="Assessment ID"
            value={assessment.id}
          />

          <InfoCard
            icon={<User className="h-5 w-5" />}
            label="Created By ID"
            value={assessment.createdById}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= Info Card ================= */

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function InfoCard({
  icon,
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="mb-3 text-muted-foreground">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold">
        {value}
      </p>
    </div>
  );
}