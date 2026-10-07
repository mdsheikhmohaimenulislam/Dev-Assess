
"use client";

import { Invitation } from "@/api/invitation.api";
import { Mail } from "lucide-react";
import InvitationStatusBadge from "./InvitationStatusBadge";
import InvitationActions from "./InvitationActions";



interface InvitationTableProps {
  invitations: Invitation[];
  role: "ADMIN" | "COMPANY" | "CANDIDATE";
}

export default function InvitationTable({
  invitations,
  role,
}: InvitationTableProps) {
  if (invitations.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <Mail className="mx-auto size-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">
          No Invitations Found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          There are no invitations available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-190 text-sm">
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

            <th className="px-4 py-3 text-left font-medium">
              Created
            </th>

            <th className="px-4 py-3 text-right font-medium">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {invitations.map((invitation) => (
            <tr
              key={invitation.id}
              className="hover:bg-muted/30"
            >
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium">
                    {invitation.candidate?.user?.name ||
                      "Unknown Candidate"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {invitation.candidate?.user?.email ||
                      "No email"}
                  </p>
                </div>
              </td>

              <td className="px-4 py-4">
                <div>
                  <p className="font-medium">
                    {invitation.assessment?.title ||
                      "Unknown Assessment"}
                  </p>

                  {invitation.assessment?.duration && (
                    <p className="text-xs text-muted-foreground">
                      {invitation.assessment.duration} minutes
                    </p>
                  )}
                </div>
              </td>

              <td className="px-4 py-4">
                <InvitationStatusBadge
                  status={invitation.status}
                />
              </td>

              <td className="px-4 py-4 text-muted-foreground">
                {new Date(
                  invitation.createdAt,
                ).toLocaleDateString()}
              </td>

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
