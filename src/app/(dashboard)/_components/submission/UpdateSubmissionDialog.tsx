
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";


import type {
  Submission,
  SubmissionStatus,
} from "@/components/types/submission";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSubmission } from "@/components/hooks/submission.hook";
import { Label } from "@/components/ui/label";

interface UpdateSubmissionDialogProps {
  submission: Submission;
}

export default function UpdateSubmissionDialog({
  submission,
}: UpdateSubmissionDialogProps) {
  const [open, setOpen] = useState(false);
  const [marks, setMarks] = useState(
    String(submission.obtainedMark),
  );
  const [status, setStatus] = useState<SubmissionStatus>(
    submission.status,
  );
  const [correctness, setCorrectness] = useState(
    submission.isCorrect === null
      ? "null"
      : String(submission.isCorrect),
  );

  const mutation = useUpdateSubmission();

  useEffect(() => {
    setMarks(String(submission.obtainedMark));
    setStatus(submission.status);
    setCorrectness(
      submission.isCorrect === null
        ? "null"
        : String(submission.isCorrect),
    );
  }, [submission]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const obtainedMark = Number(marks);
    const maxMarks = submission.problem?.marks;

    if (!Number.isFinite(obtainedMark) || obtainedMark < 0) {
      toast.error("Please enter valid marks.");
      return;
    }

    if (maxMarks !== undefined && obtainedMark > maxMarks) {
      toast.error(`Maximum marks is ${maxMarks}.`);
      return;
    }

    mutation.mutate(
      {
        id: submission.id,
        payload: {
          obtainedMark,
          status,
          isCorrect:
            correctness === "null"
              ? null
              : correctness === "true",
        },
      },
      {
        onSuccess: () => {
          toast.success("Submission updated successfully.");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Update Evaluation</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Submission</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="obtainedMark">Obtained Marks</label>
            <Input
              id="obtainedMark"
              type="number"
              min={0}
              max={submission.problem?.marks}
              step="any"
              value={marks}
              onChange={(event) => setMarks(event.target.value)}
              required
            />
            {maxMarksText(submission.problem?.marks)}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as SubmissionStatus)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="EVALUATED">Evaluated</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Correctness</Label>
            <Select
              value={correctness}
              onValueChange={setCorrectness}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">Not evaluated</SelectItem>
                <SelectItem value="true">Correct</SelectItem>
                <SelectItem value="false">Incorrect</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function maxMarksText(maxMarks?: number) {
  if (maxMarks === undefined) return null;

  return (
    <p className="text-xs text-muted-foreground">
      Maximum marks: {maxMarks}
    </p>
  );
}
