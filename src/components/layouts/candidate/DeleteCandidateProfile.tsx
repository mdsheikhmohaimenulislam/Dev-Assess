"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

import { useDeleteCandidate } from "@/components/hooks/candidate.hook";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

interface DeleteCandidateProfileProps {
  candidateId: string;
}

export default function DeleteCandidateProfile({
  candidateId,
}: DeleteCandidateProfileProps) {
  const [open, setOpen] = useState(false);

  const deleteCandidate = useDeleteCandidate();

  const handleDelete = () => {
    deleteCandidate.mutate(candidateId, {
      onSuccess: () => {
        toast.add({
          title: "Profile Deleted",
          description: "Your candidate profile has been deleted successfully.",
          type: "success",
        });

        setOpen(false);
  //! ai ta fixt kortahobe................................   
window.location.reload()
      },
      onError: () => {
        toast.add({
          title: "Delete Failed",
          description: "Failed to delete your candidate profile.",
          type: "error",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive">
            <Trash2 className="size-4" />
            Delete Profile
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-5 text-destructive" />
          </div>

          <DialogTitle>Delete Candidate Profile?</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete your candidate profile? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={deleteCandidate.isPending}>
                Cancel
              </Button>
            }
          />

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteCandidate.isPending}
          >
            {deleteCandidate.isPending ? "Deleting..." : "Delete Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}