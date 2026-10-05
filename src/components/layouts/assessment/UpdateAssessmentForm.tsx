"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAssessmentById,
  useUpdateAssessment,
} from "@/components/hooks/assessment.hook";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UpdateAssessmentFormProps {
  id: string;
  onSuccess?: () => void;
}

export default function UpdateAssessmentForm({
  id,
  onSuccess,
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

    const formatDateTime = (
      date: string | null | undefined,
    ): string => {
      if (!date) {
        return "";
      }

      const value = new Date(date);

      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(
        2,
        "0",
      );
      const day = String(value.getDate()).padStart(2, "0");
      const hours = String(value.getHours()).padStart(2, "0");
      const minutes = String(value.getMinutes()).padStart(
        2,
        "0",
      );

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setFormData({
      title: assessment.title,
      description: assessment.description ?? "",
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

    // Title validation
    if (!title) {
      toast.error("Assessment title is required.");
      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters.");
      return;
    }

    if (title.length > 200) {
      toast.error("Title cannot exceed 200 characters.");
      return;
    }

    // Description validation
    if (description.length > 2000) {
      toast.error(
        "Description cannot exceed 2000 characters.",
      );
      return;
    }

    // Number conversion
    const duration = Number(formData.duration);
    const totalMarks = Number(formData.totalMarks);
    const passingMarks = Number(formData.passingMarks);

    // Duration validation
    if (!Number.isInteger(duration) || duration <= 0) {
      toast.error(
        "Duration must be a positive integer.",
      );
      return;
    }

    // Total marks validation
    if (totalMarks <= 0) {
      toast.error(
        "Total marks must be greater than 0.",
      );
      return;
    }

    // Passing marks validation
    if (passingMarks < 0) {
      toast.error(
        "Passing marks cannot be negative.",
      );
      return;
    }

    if (passingMarks > totalMarks) {
      toast.error(
        "Passing marks cannot be greater than total marks.",
      );
      return;
    }

    // Date validation
    if (formData.startTime && formData.endTime) {
      const startTime = new Date(formData.startTime);
      const endTime = new Date(formData.endTime);

      if (startTime >= endTime) {
        toast.error(
          "End time must be greater than start time.",
        );
        return;
      }
    }

    // Paid assessment validation
    if (
      formData.accessType === "PAID" &&
      !formData.price.trim()
    ) {
      toast.error(
        "Price is required for paid assessment.",
      );
      return;
    }

    if (formData.accessType === "PAID") {
      const price = Number(formData.price);

      if (price <= 0) {
        toast.error(
          "Price must be greater than 0.",
        );
        return;
      }
    }

    // Update request
    updateAssessment.mutate(
      {
        id,

        payload: {
          title,

          ...(description && {
            description,
          }),

          duration,

          ...(formData.startTime && {
            startTime: new Date(
              formData.startTime,
            ).toISOString(),
          }),

          ...(formData.endTime && {
            endTime: new Date(
              formData.endTime,
            ).toISOString(),
          }),

          totalMarks,

          passingMarks,

          accessType: formData.accessType,

          ...(formData.accessType === "PAID" && {
            price: Number(formData.price),
          }),
        },
      },
      {
        onSuccess: () => {
          toast.success(
            "Assessment updated successfully.",
          );

          // Close modal
          onSuccess?.();

          // Refresh current page
          router.refresh();
        },

        onError: (error) => {
          console.error(
            "Update assessment error:",
            error,
          );

          toast.error(
            "Failed to update assessment.",
          );
        },
      },
    );
  };

  // Loading
  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-muted-foreground">
          Loading assessment...
        </p>
      </div>
    );
  }

  // Error
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
      className="space-y-6"
    >
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Assessment Title
        </Label>

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
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the assessment"
          rows={4}
          disabled={updateAssessment.isPending}
        />
      </div>

      {/* Duration / Marks */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Duration */}
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

        {/* Total Marks */}
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

        {/* Passing Marks */}
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
        {/* Access Type */}
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
            <option value="FREE">
              Free
            </option>

            <option value="PAID">
              Paid
            </option>
          </select>
        </div>

        {/* Price */}
        {formData.accessType === "PAID" && (
          <div className="space-y-2">
            <Label htmlFor="price">
              Price
            </Label>

            <Input
              id="price"
              name="price"
              type="number"
              min="1"
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
        {/* Start Time */}
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

        {/* End Time */}
        <div className="space-y-2">
          <Label htmlFor="endTime">
            End Time
          </Label>

          <Input
            id="endTime"
            name="endTime"
            type="datetime-local"
            min={formData.startTime}
            value={formData.endTime}
            onChange={handleChange}
            disabled={updateAssessment.isPending}
          />
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={updateAssessment.isPending}
        >
          {updateAssessment.isPending
            ? "Updating..."
            : "Update Assessment"}
        </Button>
      </div>
    </form>
  );
}