"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type {
  AssessmentAccessType,
  Assessment,
  CreateAssessmentPayload,
  UpdateAssessmentPayload,
} from "@/components/types/assessment.type";

interface AssessmentFormProps {
  assessment?: Assessment;
  onSubmit: (
    data: CreateAssessmentPayload | UpdateAssessmentPayload,
  ) => void;
  isLoading?: boolean;
}

interface FormValues {
  title: string;
  description: string;
  duration: number;
  accessType: AssessmentAccessType;
  price?: number;
}

export default function AssessmentForm({
  assessment,
  onSubmit,
  isLoading = false,
}: AssessmentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: assessment?.title ?? "",
      description: assessment?.description ?? "",
      duration: assessment?.duration ?? 90,
      accessType: assessment?.accessType ?? "FREE",
      price: assessment?.price ?? undefined,
    },
  });

  const accessType = watch("accessType");

  useEffect(() => {
    reset({
      title: assessment?.title ?? "",
      description: assessment?.description ?? "",
      duration: assessment?.duration ?? 90,
      accessType: assessment?.accessType ?? "FREE",
      price: assessment?.price ?? undefined,
    });
  }, [assessment, reset]);

  const submit = (data: FormValues) => {
    onSubmit({
      ...data,
      price:
        data.accessType === "PAID"
          ? data.price
          : undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="title">
          Title
        </Label>

        <Input
          id="title"
          placeholder="Assessment title"
          {...register("title", {
            required: "Title is required",
          })}
        />

        {errors.title && (
          <p className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          placeholder="Assessment description"
          rows={4}
          {...register("description", {
            required: "Description is required",
          })}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">
          Duration (minutes)
        </Label>

        <Input
          id="duration"
          type="number"
          {...register("duration", {
            required: "Duration is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Duration must be at least 1 minute",
            },
          })}
        />

        {errors.duration && (
          <p className="text-sm text-destructive">
            {errors.duration.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Access Type
        </Label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="FREE"
              {...register("accessType")}
            />
            Free
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="PAID"
              {...register("accessType")}
            />
            Paid
          </label>
        </div>
      </div>

      {accessType === "PAID" && (
        <div className="space-y-2">
          <Label htmlFor="price">
            Price
          </Label>

          <Input
            id="price"
            type="number"
            placeholder="500"
            {...register("price", {
              valueAsNumber: true,
              required:
                accessType === "PAID"
                  ? "Price is required"
                  : false,
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            })}
          />

          {errors.price && (
            <p className="text-sm text-destructive">
              {errors.price.message}
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading
          ? "Saving..."
          : assessment
            ? "Update Assessment"
            : "Create Assessment"}
      </Button>
    </form>
  );
}