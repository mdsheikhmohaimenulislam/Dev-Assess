
"use client";

import { InvitationStatus } from "@/api/invitation.api";



interface InvitationStatusBadgeProps {
  status: InvitationStatus;
}

const statusClassNames: Record<InvitationStatus, string> = {
  PENDING:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  ACCEPTED:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  REJECTED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  EXPIRED:
    "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
};

export default function InvitationStatusBadge({
  status,
}: InvitationStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusClassNames[status]}`}
    >
      {status}
    </span>
  );
}
