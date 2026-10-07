"use client";

import { Invitation } from "@/api/invitation.api";

import InvitationActions from "./InvitationActions";
import InvitationStatusBadge from "./InvitationStatusBadge";

interface InvitationTableProps {
  invitations: Invitation[];
  role: "ADMIN" | "COMPANY" | "CANDIDATE";
}

export default function InvitationTable({
  invitations,
  role,
}: InvitationTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">
              Candidate
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Assessment
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Status
            </th>

            <th className="px-4 py-3 text-right font-medium">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {invitations.map((invitation) => (
            <tr key={invitation.id}>
              {/* Candidate */}
              <td className="px-4 py-4">
                {invitation.candidate?.user?.name ||
                  invitation.candidate?.id ||
                  "-"}
              </td>

              {/* Assessment */}
              <td className="px-4 py-4">
                {invitation.assessment?.title || "-"}
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <InvitationStatusBadge
                  status={invitation.status}
                />
              </td>

              {/* Action */}
              <td className="px-4 py-4">
                <InvitationActions
                  invitation={invitation}
                  role={role}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}