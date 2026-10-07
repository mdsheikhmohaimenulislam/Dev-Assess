"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { useGetInvitations } from "@/components/hooks/invitation.hook";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

import CreateInvitationForm from "./CreateInvitationForm";
import InvitationTable from "./InvitationTable";

interface InvitationManagementProps {
  basePath: string;
}

type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";

export default function InvitationManagement({
  basePath,
}: InvitationManagementProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading, isError } = useGetInvitations();

  console.log(data);

  const role: UserRole = basePath.startsWith("/candidate")
    ? "CANDIDATE"
    : basePath.startsWith("/company")
      ? "COMPANY"
      : "ADMIN";

  const invitations = data?.data ?? [];

  const canCreateInvitation = role !== "CANDIDATE";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Invitations
          </h1>

          <p className="text-sm text-muted-foreground">
            {role === "CANDIDATE"
              ? "View your assessment invitations."
              : "Manage assessment invitations sent to candidates."}
          </p>
        </div>

        {/* Create Invitation */}
        {canCreateInvitation && (
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="size-4" />
            Create Invitation
          </Button>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-50 items-center justify-center rounded-lg border">
          <Spinner />
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">
            Failed to load invitations.
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && invitations.length === 0 && (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h3 className="text-sm font-medium">
            No Invitations Found
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {role === "CANDIDATE"
              ? "You do not have any assessment invitations at the moment."
              : "There are no invitations available at the moment."}
          </p>
        </div>
      )}

      {/* Invitation Table */}
      {!isLoading && !isError && invitations.length > 0 && (
        <InvitationTable
          invitations={invitations}
          role={role}
        />
      )}

      {/* Create Invitation Dialog */}
      {canCreateInvitation && (
        <Dialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                Create Invitation
              </DialogTitle>

              <DialogDescription>
                Send an assessment invitation to a candidate.
              </DialogDescription>
            </DialogHeader>

            <CreateInvitationForm
              onSuccess={() => {
                setIsCreateOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}