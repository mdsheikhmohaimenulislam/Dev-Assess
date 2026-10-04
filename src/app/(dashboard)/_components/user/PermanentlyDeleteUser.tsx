"use client";

import { toast } from "sonner";

import { usePermanentlyDeleteUser } from "@/components/hooks/user.hook";
import { Button } from "@/components/ui/button";

interface PermanentlyDeleteUserProps {
  id: string;
  onSuccess?: () => void;
}

export default function PermanentlyDeleteUser({
  id,
  onSuccess,
}: PermanentlyDeleteUserProps) {
  const deleteUser = usePermanentlyDeleteUser();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this user?",
    );

    if (!confirmed) {
      return;
    }

    deleteUser.mutate(id, {
      onSuccess: () => {
        toast.success("User permanently deleted.");
        onSuccess?.();
      },
      onError: () => {
        toast.error("Failed to permanently delete user.");
      },
    });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={deleteUser.isPending}
    >
      {deleteUser.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}