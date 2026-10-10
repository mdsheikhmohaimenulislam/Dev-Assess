
"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SubmissionLanguage, SubmitProblemPayload } from "@/components/types/problem.types";


interface SolveProblemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problemId: string;
  problemTitle: string;
  submitProblem: (
    payload: SubmitProblemPayload,
    options?: {
      onSuccess?: () => void;
    },
  ) => void;
  isPending: boolean;
}

const DURATION_SECONDS = 30 * 60;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

export default function SolveProblemDialog({
  open,
  onOpenChange,
  problemId,
  problemTitle,
  submitProblem,
  isPending,
}: SolveProblemDialogProps) {
  const [language, setLanguage] =
    useState<SubmissionLanguage>("javascript");

  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);

  // Start the timer when the dialog opens.
  useEffect(() => {
    if (!open || startTime !== null || submitted) {
      return;
    }

    const start = Date.now();

    setStartTime(start);
    setNow(start);
  }, [open, startTime, submitted]);

  // Update the timer every second.
  useEffect(() => {
    if (!open || startTime === null || submitted) {
      return;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [open, startTime, submitted]);

  const endTime =
    startTime === null
      ? null
      : startTime + DURATION_SECONDS * 1000;

  const remainingSeconds =
    endTime === null
      ? DURATION_SECONDS
      : Math.max(0, Math.ceil((endTime - now) / 1000));

  const expired =
    startTime !== null && remainingSeconds <= 0;

  function handleSubmit() {
    if (
      expired ||
      submitted ||
      isPending ||
      !code.trim() ||
      startTime === null
    ) {
      return;
    }

    const payload: SubmitProblemPayload = {
      problemId,
      language,
      code: code.trim(),
      startedAt: new Date(startTime).toISOString(),
      submittedAt: new Date().toISOString(),
    };

    submitProblem(payload, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isPending) {
      return;
    }

    if (nextOpen && (expired || submitted)) {
      return;
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Solve Problem: {problemTitle}
          </DialogTitle>

          <DialogDescription>
            Write your solution and submit it before the timer ends.
          </DialogDescription>
        </DialogHeader>

        {/* Timer information */}
        <div className="grid gap-3 rounded-lg border p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">
              Start Time
            </p>

            <p className="mt-1 text-sm font-medium">
              {startTime !== null
                ? new Date(startTime).toLocaleTimeString()
                : "Starting..."}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              End Time
            </p>

            <p className="mt-1 text-sm font-medium">
              {endTime !== null
                ? new Date(endTime).toLocaleTimeString()
                : "—"}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              Time Remaining
            </p>

            <p
              className={`mt-1 font-mono text-lg font-bold ${
                remainingSeconds <= 60
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              {formatTime(remainingSeconds)}
            </p>
          </div>
        </div>

        {/* Time expired message */}
        {expired && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Time is over. You can no longer submit this solution.
          </div>
        )}

        {/* Submission success message */}
        {submitted && (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-3 text-sm">
            Solution submitted successfully.
          </div>
        )}

        {/* Programming language */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Programming Language
          </Label>

          <Select
            value={language}
            onValueChange={(value) => {
              if (value !== null) {
                setLanguage(value as SubmissionLanguage);
              }
            }}
            disabled={expired || submitted || isPending}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose language" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="javascript">
                JavaScript
              </SelectItem>

              <SelectItem value="typescript">
                TypeScript
              </SelectItem>

              <SelectItem value="python">
                Python
              </SelectItem>

              <SelectItem value="java">
                Java
              </SelectItem>

              <SelectItem value="cpp">
                C++
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Code editor */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Your Code
          </Label>

          <Textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            disabled={expired || submitted || isPending}
            placeholder="// Write your solution here..."
            className="min-h-[300px] resize-y font-mono text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Close
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={
              expired ||
              submitted ||
              isPending ||
              !code.trim() ||
              startTime === null
            }
          >
            <Send className="mr-2 h-4 w-4" />

            {isPending
              ? "Submitting..."
              : submitted
                ? "Submitted"
                : "Submit Solution"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
