"use client";

import { Check, Trash2, X } from "lucide-react";

import { Invitation } from "@/api/invitation.api";
import {
  useAcceptInvitation,
  useDeleteInvitation,
  useRejectInvitation,
} from "@/components/hooks/invitation.hook";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface InvitationActionsProps {
  invitation: Invitation;
  role: "ADMIN" | "COMPANY" | "CANDIDATE";
}

export default function InvitationActions({
  invitation,
  role,
}: InvitationActionsProps) {
  const acceptInvitation = useAcceptInvitation();
  const rejectInvitation = useRejectInvitation();
  const deleteInvitation = useDeleteInvitation();

  const handleAccept = () => {
    acceptInvitation.mutate(invitation.id, {
      onSuccess: () => {
        toast.add({
          title: "Invitation Accepted",
          description:
            "You have accepted this assessment invitation.",
          type: "success",
        });
      },

      onError: (error) => {
        toast.add({
          title: "Accept Failed",
          description:
            error.message || "Failed to accept invitation.",
          type: "error",
        });
      },
    });
  };

  const handleReject = () => {
    rejectInvitation.mutate(invitation.id, {
      onSuccess: () => {
        toast.add({
          title: "Invitation Rejected",
          description:
            "You have rejected this assessment invitation.",
          type: "success",
        });
      },

      onError: (error) => {
        toast.add({
          title: "Reject Failed",
          description:
            error.message || "Failed to reject invitation.",
          type: "error",
        });
      },
    });
  };

  const handleDelete = () => {
    deleteInvitation.mutate(invitation.id, {
      onSuccess: () => {
        toast.add({
          title: "Invitation Deleted",
          description:
            "The invitation has been deleted successfully.",
          type: "success",
        });
      },

      onError: (error) => {
        toast.add({
          title: "Delete Failed",
          description:
            error.message || "Failed to delete invitation.",
          type: "error",
        });
      },
    });
  };

  const isAccepting = acceptInvitation.isPending;
  const isRejecting = rejectInvitation.isPending;
  const isDeleting = deleteInvitation.isPending;

  if (role === "CANDIDATE") {
    if (invitation.status !== "PENDING") {
      return null;
    }

    return (
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          size="sm"
          onClick={handleAccept}
          disabled={isAccepting || isRejecting}
        >
          <Check className="size-4" />
          {isAccepting ? "Accepting..." : "Accept"}
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleReject}
          disabled={isAccepting || isRejecting}
        >
          <X className="size-4" />
          {isRejecting ? "Rejecting..." : "Reject"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="Delete Invitation"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
}