
"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, Play, Send } from "lucide-react";

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

interface SolveProblemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problemId: string;
  problemTitle: string;
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
}: SolveProblemDialogProps) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);

  // Timer starts only once when the user opens the dialog.
  useEffect(() => {
    if (!open || startTime !== null || submitted) return;

    const start = Date.now();
    setStartTime(start);
    setNow(start);
  }, [open, startTime, submitted]);

  useEffect(() => {
    if (!open || startTime === null || submitted) return;

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

  const expired = startTime !== null && remainingSeconds <= 0;

  function handleSubmit() {
    if (expired || submitted || !code.trim()) return;

    // TODO: Call your real submission API here.
    console.log({
      problemId,
      language,
      code,
      startedAt: new Date(startTime!).toISOString(),
      submittedAt: new Date().toISOString(),
    });

    setSubmitted(true);
  }

  function handleOpenChange(nextOpen: boolean) {
    // Do not allow reopening after the deadline or successful submission.
    if (nextOpen && (expired || submitted)) return;

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

        <div className="grid gap-3 rounded-lg border p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Start Time</p>
            <p className="mt-1 text-sm font-medium">
              {startTime
                ? new Date(startTime).toLocaleTimeString()
                : "Starting..."}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">End Time</p>
            <p className="mt-1 text-sm font-medium">
              {endTime ? new Date(endTime).toLocaleTimeString() : "—"}
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

        {expired && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Time is over. You can no longer submit this solution.
          </div>
        )}

        {submitted && (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-3 text-sm">
            Submission action completed in the UI. Connect the submission API
            to save and evaluate the solution on your backend.
          </div>
        )}

        <div className="space-y-2">
          <span className="text-sm font-medium">Programming Language</span>

          <Select
            value={language}
            onValueChange={setLanguage}
            disabled={expired || submitted}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Code</label>
          <Textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            disabled={expired || submitted}
            placeholder="// Write your solution here..."
            className="min-h-[300px] resize-y font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={expired || submitted || !code.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            {submitted ? "Submitted" : "Submit Solution"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
