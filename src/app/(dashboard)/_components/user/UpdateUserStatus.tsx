"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useUpdateUserStatus } from "@/components/hooks/user.hook";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UpdateUserStatusPayload } from "@/components/types";

type UserStatus = UpdateUserStatusPayload["status"];

interface UpdateUserStatusProps {
  id: string;
  currentStatus: UserStatus;
  onSuccess?: () => void;
}

export default function UpdateUserStatus({
  id,
  currentStatus,
  onSuccess,
}: UpdateUserStatusProps) {
  const [status, setStatus] = useState<UserStatus>(currentStatus);

  const updateStatus = useUpdateUserStatus();

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleSubmit = () => {
    if (status === currentStatus) {
      toast.info("No changes to update.");
      return;
    }

    updateStatus.mutate(
      {
        id,
        payload: {
          status,
        },
      },
      {
        onSuccess: () => {
          toast.success("User status updated successfully.");

          onSuccess?.();
        },
        onError: () => {
          toast.error("Failed to update user status.");
        },
      },
    );
  };

  return (
    <div className="space-y-5  ">
      <div className="space-y-2">
        <Label htmlFor="user-status">Account Status</Label>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value as UserStatus)}
          disabled={updateStatus.isPending}
        >
          <SelectTrigger id="user-status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>

            <SelectItem value="INACTIVE">Inactive</SelectItem>

            <SelectItem value="BLOCKED">Blocked</SelectItem>

    
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={updateStatus.isPending}
          onClick={onSuccess}
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={updateStatus.isPending || status === currentStatus}
        >
          {updateStatus.isPending ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}
