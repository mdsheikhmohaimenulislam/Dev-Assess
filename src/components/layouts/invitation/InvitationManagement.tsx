
"use client";

import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import {
  useGetInvitations,
} from "@/components/hooks/invitation.hook";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import InvitationTable from "./InvitationTable";
import CreateInvitationForm from "./CreateInvitationForm";



interface InvitationManagementProps {
  basePath: string;
}

type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";

export default function InvitationManagement({
  basePath,
}: InvitationManagementProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading, isError, refetch, isFetching } =
    useGetInvitations();

  const invitations = data?.data ?? [];

  const role: UserRole = basePath.startsWith("/candidate")
    ? "CANDIDATE"
    : basePath.startsWith("/company")
      ? "COMPANY"
      : "ADMIN";

  const canCreate =
    role === "ADMIN" || role === "COMPANY";

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <h3 className="text-lg font-semibold">
          Failed to load invitations
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading invitations.
        </p>

        <Button
          className="mt-4"
          variant="outline"
          onClick={() => refetch()}
        >
          <RefreshCw className="size-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Invitations
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {role === "CANDIDATE"
              ? "View and manage your assessment invitations."
              : "Manage assessment invitations sent to candidates."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Refresh invitations"
          >
            <RefreshCw
              className={`size-4 ${
                isFetching ? "animate-spin" : ""
              }`}
            />
          </Button>

          {canCreate && (
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="size-4" />
              Create Invitation
            </Button>
          )}
        </div>
      </div>

      <InvitationTable
        invitations={invitations}
        role={role}
      />

      {canCreate && (
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
                Select a candidate and assessment to send an
                invitation.
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
