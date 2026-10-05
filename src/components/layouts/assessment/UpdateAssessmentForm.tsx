"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useGetAssessmentById, useUpdateAssessment } from "@/components/hooks/assessment.hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UpdateAssessmentFormProps {
  id: string;
}

export default function UpdateAssessmentForm({
  id,
}: UpdateAssessmentFormProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAssessmentById(id);
  const updateAssessment = useUpdateAssessment();

  const assessment = data?.data;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    startTime: "",
    endTime: "",
    totalMarks: "",
    passingMarks: "",
    accessType: "FREE" as "FREE" | "PAID",
    price: "",
  });

  useEffect(() => {
    if (!assessment) {
      return;
    }

    const formatDateTime = (date: string) => {
      const value = new Date(date);

      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      const hours = String(value.getHours()).padStart(2, "0");
      const minutes = String(value.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setFormData({
      title: assessment.title,
      description: assessment.description,
      duration: String(assessment.duration),
      startTime: formatDateTime(assessment.startTime),
      endTime: formatDateTime(assessment.endTime),
      totalMarks: String(assessment.totalMarks),
      passingMarks: String(assessment.passingMarks),
      accessType: assessment.accessType,
      price:
        assessment.price !== null &&
        assessment.price !== undefined
          ? String(assessment.price)
          : "",
    });
  }, [assessment]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title) {
      toast.error("Assessment title is required.");
      return;
    }

    if (!description) {
      toast.error("Assessment description is required.");
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      toast.error("Start time and end time are required.");
      return;
    }

    if (
      formData.accessType === "PAID" &&
      !formData.price.trim()
    ) {
      toast.error("Price is required for paid assessment.");
      return;
    }

    updateAssessment.mutate(
      {
        id,
        payload: {
          title,
          description,
          duration: Number(formData.duration),
          startTime: new Date(
            formData.startTime,
          ).toISOString(),
          endTime: new Date(
            formData.endTime,
          ).toISOString(),
          totalMarks: Number(formData.totalMarks),
          passingMarks: Number(formData.passingMarks),
          accessType: formData.accessType,
          price:
            formData.accessType === "PAID"
              ? Number(formData.price)
              : undefined,
        },
      },
      {
        onSuccess: () => {
          toast.success("Assessment updated successfully.");

          router.push(`/company/assessments/${id}`);
        },

        onError: (error) => {
          console.error("Update assessment error:", error);

          toast.error("Failed to update assessment.");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Loading assessment...
        </p>
      </div>
    );
  }

  if (isError || !assessment) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-destructive">
          Failed to load assessment.
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
    >
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Assessment Title</Label>

        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter assessment title"
          disabled={updateAssessment.isPending}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the assessment"
          rows={5}
          disabled={updateAssessment.isPending}
        />
      </div>

      {/* Duration / Marks */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="duration">
            Duration (minutes)
          </Label>

          <Input
            id="duration"
            name="duration"
            type="number"
            min="1"
            value={formData.duration}
            onChange={handleChange}
            disabled={updateAssessment.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalMarks">
            Total Marks
          </Label>

          <Input
            id="totalMarks"
            name="totalMarks"
            type="number"
            min="1"
            value={formData.totalMarks}
            onChange={handleChange}
            disabled={updateAssessment.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passingMarks">
            Passing Marks
          </Label>

          <Input
            id="passingMarks"
            name="passingMarks"
            type="number"
            min="0"
            value={formData.passingMarks}
            onChange={handleChange}
            disabled={updateAssessment.isPending}
          />
        </div>
      </div>

      {/* Access Type / Price */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="accessType">
            Access Type
          </Label>

          <select
            id="accessType"
            name="accessType"
            value={formData.accessType}
            onChange={handleChange}
            disabled={updateAssessment.isPending}
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        {formData.accessType === "PAID" && (
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="500"
              disabled={updateAssessment.isPending}
            />
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startTime">
            Start Time
          </Label>

          <Input
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            disabled={updateAssessment.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">
            End Time
          </Label>

          <Input
            id="endTime"
            name="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleChange}
            disabled={updateAssessment.isPending}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={updateAssessment.isPending}
        >
          {updateAssessment.isPending
            ? "Updating..."
            : "Update Assessment"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={updateAssessment.isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}