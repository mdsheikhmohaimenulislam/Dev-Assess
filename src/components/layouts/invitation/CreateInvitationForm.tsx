"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { useGetAssessments } from "@/components/hooks/assessment.hook";
import { useGetAllCandidates } from "@/components/hooks/candidate.hook";
import { useCreateInvitation } from "@/components/hooks/invitation.hook";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

interface CreateInvitationFormProps {
  onSuccess?: () => void;
}

const invitationSchema = z.object({
  assessmentId: z
    .string()
    .min(1, "Assessment is required"),

  candidateId: z
    .string()
    .min(1, "Candidate is required"),

  userId: z
    .string()
    .min(1, "User ID is required"),

  expiresAt: z
    .string()
    .min(1, "Expiration date is required"),
});

export default function CreateInvitationForm({
  onSuccess,
}: CreateInvitationFormProps) {
  const createInvitation = useCreateInvitation();

  const { data: assessmentsData } = useGetAssessments();
  const { data: candidatesData } = useGetAllCandidates();

  const assessments = assessmentsData?.data ?? [];
  const candidates = candidatesData?.data ?? [];

  const form = useForm({
    defaultValues: {
      assessmentId: "",
      candidateId: "",
      userId: "",
      expiresAt: "",
    },

    validators: {
      onSubmit: invitationSchema,
    },

    onSubmit: ({ value }) => {
      createInvitation.mutate(
        {
          assessmentId: value.assessmentId,
          candidateId: value.candidateId,
          userId: value.userId,
          expiresAt: new Date(
            value.expiresAt,
          ).toISOString(),
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Invitation Sent",
              description:
                "The assessment invitation has been sent successfully.",
              type: "success",
            });

            onSuccess?.();
          },

          onError: (error) => {
            toast.add({
              title: "Invitation Failed",
              description:
                error.message ||
                "Failed to create invitation.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <FieldGroup>
        {/* Assessment */}
        <form.Field name="assessmentId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Assessment</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value ?? "")
                  }
                >
                  <SelectTrigger aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select assessment" />
                  </SelectTrigger>

                  <SelectContent>
                    {assessments.map((assessment) => (
                      <SelectItem
                        key={assessment.id}
                        value={assessment.id}
                      >
                        {assessment.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Candidate */}
        <form.Field name="candidateId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Candidate</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => {
                    const candidateId = value ?? "";

                    field.handleChange(candidateId);

                    const selectedCandidate = candidates.find(
                      (candidate) =>
                        candidate.id === candidateId,
                    );

                    if (!selectedCandidate) {
                      form.setFieldValue(
                        "userId",
                        "",
                      );

                      return;
                    }

                    form.setFieldValue(
                      "userId",
                      selectedCandidate.userId,
                    );
                  }}
                >
                  <SelectTrigger
                    aria-invalid={isInvalid}
                  >
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>

                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem
                        key={candidate.id}
                        value={candidate.id}
                      >
                        {candidate.user?.name ||
                          candidate.user?.email ||
                          candidate.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* User ID */}
        <form.Field name="userId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                User ID
              </FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                readOnly
                placeholder="User ID"
              />
            </Field>
          )}
        </form.Field>

        {/* Expires At */}
        <form.Field name="expiresAt">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Invitation Expires At
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="datetime-local"
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(
                      event.target.value,
                    )
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={createInvitation.isPending}
        >
          {createInvitation.isPending ? (
            <>
              <Spinner />
              Sending...
            </>
          ) : (
            "Send Invitation"
          )}
        </Button>
      </div>
    </form>
  );
}