"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCreateAssessment } from "@/components/hooks/assessment.hook";
import { useGetMyCompany } from "@/components/hooks/company.hook";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateAssessmentFormProps {
  basePath: "/admin/assessments" | "/company/assessments";
}

export default function CreateAssessmentForm({
  basePath,
}: CreateAssessmentFormProps) {
  const router = useRouter();

  const createAssessment = useCreateAssessment();

  const { data: companyData, isLoading: companyLoading } =
    useGetMyCompany();

  const company = companyData?.data;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "90",
    startTime: "",
    endTime: "",
    totalMarks: "100",
    passingMarks: "50",
    accessType: "FREE" as "FREE" | "PAID",
    price: "",
  });

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("1. SUBMIT CLICKED");
    console.log("2. COMPANY:", company);

    // --------------------------------
    // Company validation
    // --------------------------------

    if (!company?.id) {
      console.log("STOP: COMPANY ID NOT FOUND");

      toast.error("Company information not found.");

      return;
    }

    console.log("3. COMPANY ID OK");

    // --------------------------------
    // Title validation
    // --------------------------------

    const title = formData.title.trim();

    if (title.length < 3) {
      console.log("STOP: TITLE TOO SHORT");

      toast.error("Title must be at least 3 characters.");

      return;
    }

    console.log("4. TITLE OK");

    if (title.length > 200) {
      console.log("STOP: TITLE TOO LONG");

      toast.error("Title cannot exceed 200 characters.");

      return;
    }

    console.log("5. TITLE LENGTH OK");

    // --------------------------------
    // Description validation
    // --------------------------------

    const description = formData.description.trim();

    if (description.length > 2000) {
      console.log("STOP: DESCRIPTION TOO LONG");

      toast.error("Description cannot exceed 2000 characters.");

      return;
    }

    console.log("6. DESCRIPTION OK");

    // --------------------------------
    // Number values
    // --------------------------------

    const duration = Number(formData.duration);

    const totalMarks = Number(formData.totalMarks);

    const passingMarks = Number(formData.passingMarks);

    // --------------------------------
    // Duration validation
    // --------------------------------

    if (!Number.isInteger(duration) || duration <= 0) {
      console.log("STOP: INVALID DURATION");

      toast.error("Duration must be a positive integer.");

      return;
    }

    console.log("7. DURATION OK");

    // --------------------------------
    // Total marks validation
    // --------------------------------

    if (totalMarks <= 0) {
      console.log("STOP: INVALID TOTAL MARKS");

      toast.error("Total marks must be greater than 0.");

      return;
    }

    console.log("8. TOTAL MARKS OK");

    // --------------------------------
    // Passing marks validation
    // --------------------------------

    if (passingMarks < 0) {
      console.log("STOP: INVALID PASSING MARKS");

      toast.error("Passing marks cannot be negative.");

      return;
    }

    console.log("9. PASSING MARKS OK");

    if (passingMarks > totalMarks) {
      console.log("STOP: PASSING MARKS GREATER THAN TOTAL MARKS");

      toast.error("Passing marks cannot be greater than total marks.");

      return;
    }

    console.log("10. MARKS VALIDATION OK");

    // --------------------------------
    // Time validation
    // --------------------------------

    if (formData.startTime && formData.endTime) {
      const startTime = new Date(formData.startTime);

      const endTime = new Date(formData.endTime);

      if (startTime >= endTime) {
        console.log("STOP: INVALID TIME RANGE");

        toast.error("End time must be greater than start time.");

        return;
      }
    }

    console.log("11. TIME VALIDATION OK");

    // --------------------------------
    // Paid assessment validation
    // --------------------------------

    if (formData.accessType === "PAID") {
      if (!formData.price) {
        console.log("STOP: PAID PRICE MISSING");

        toast.error("Price is required for paid assessment.");

        return;
      }

      const price = Number(formData.price);

      if (price <= 0) {
        console.log("STOP: INVALID PRICE");

        toast.error("Price must be greater than 0.");

        return;
      }
    }

    console.log("12. PRICE VALIDATION OK");

    // --------------------------------
    // Free assessment validation
    // --------------------------------

    if (
      formData.accessType === "FREE" &&
      formData.price &&
      Number(formData.price) !== 0
    ) {
      console.log("STOP: FREE ASSESSMENT HAS PRICE");

      toast.error("Free assessment cannot have a price.");

      return;
    }

    console.log("13. ALL VALIDATION OK");

    // --------------------------------
    // Create payload
    // --------------------------------

    const payload = {
      title,

      ...(description && {
        description,
      }),

      duration,

      ...(formData.startTime && {
        startTime: new Date(formData.startTime).toISOString(),
      }),

      ...(formData.endTime && {
        endTime: new Date(formData.endTime).toISOString(),
      }),

      totalMarks,

      passingMarks,

      accessType: formData.accessType,

      ...(formData.accessType === "PAID" && {
        price: Number(formData.price),
      }),

      companyId: company.id,
    };

    console.log("14. FINAL PAYLOAD:", payload);

    // --------------------------------
    // Create assessment
    // --------------------------------

    createAssessment.mutate(payload, {
      onSuccess: () => {
        console.log("15. CREATE SUCCESS");

        toast.success("Assessment created successfully.");

        router.push(basePath);
      },

      onError: (error) => {
        console.error("15. CREATE ERROR:", error);

        toast.error("Failed to create assessment.");
      },
    });
  };

  // --------------------------------
  // Company loading
  // --------------------------------

  if (companyLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Loading company information...
        </p>
      </div>
    );
  }

  // --------------------------------
  // Form
  // --------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
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
          placeholder="JavaScript Basic Assessment"
          disabled={createAssessment.isPending}
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
          placeholder="Enter assessment description"
          rows={5}
          disabled={createAssessment.isPending}
        />
      </div>

      {/* Duration + Marks */}

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
            disabled={createAssessment.isPending}
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
            disabled={createAssessment.isPending}
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
            max={formData.totalMarks}
            value={formData.passingMarks}
            onChange={handleChange}
            disabled={createAssessment.isPending}
          />
        </div>
      </div>

      {/* Access Type + Price */}

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
            disabled={createAssessment.isPending}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
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
              disabled={createAssessment.isPending}
            />
          </div>
        )}
      </div>

      {/* Start + End Time */}

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
            disabled={createAssessment.isPending}
          />

          <p className="text-xs text-muted-foreground">
            Optional
          </p>
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
            disabled={createAssessment.isPending}
          />

          <p className="text-xs text-muted-foreground">
            Optional
          </p>
        </div>
      </div>

      {/* Company */}

      <div className="space-y-2">
        <Label>
          Company
        </Label>

        <Input
          value={company?.companyName ?? "Company not found"}
          disabled
        />

        <p className="text-xs text-muted-foreground">
          Company ID:{" "}
          {company?.id ?? "Not available"}
        </p>
      </div>

      {/* Buttons */}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={createAssessment.isPending}
        >
          {createAssessment.isPending
            ? "Creating..."
            : "Create Assessment"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={createAssessment.isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}