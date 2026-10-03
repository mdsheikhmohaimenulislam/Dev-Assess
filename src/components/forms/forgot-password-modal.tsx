"use client";

import { useState } from "react";

import { Eye, EyeClosed } from "lucide-react";

import { useForm } from "@tanstack/react-form";

import { resetPasswordSchema } from "@/validation/auth.validation";

import { usePasswordForgot, usePasswordReset } from "../hooks/auth.hook";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

interface ForgotPasswordModalProps {
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ForgotPasswordModal({
  email,
  open,
  onOpenChange,
}: ForgotPasswordModalProps) {
  const [otpSent, setOtpSent] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    mutate: sendOtp,
    isPending: sendOtpPending,
  } = usePasswordForgot();

  const {
    mutate: resetPassword,
    isPending: resetPasswordPending,
  } = usePasswordReset();

  const form = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: ({ value }) => {
      resetPassword(
        {
          email,
          otp: value.otp,
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Password Reset Successful",
              description:
                "Your password has been updated successfully.",
              type: "success",
            });

            form.reset();

            setOtpSent(false);
            setShowPassword(false);
            setShowConfirmPassword(false);

            onOpenChange(false);
          },

          onError: (error) => {
            toast.add({
              title: "Password Reset Failed",
              description:
                error.message ||
                "Invalid OTP or something went wrong.",
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleSendOtp = () => {
    if (!email) {
      toast.add({
        title: "Email Required",
        description:
          "Please enter your email address first.",
        type: "error",
      });

      return;
    }

    sendOtp(
      {
        email,
      },
      {
        onSuccess: () => {
          setOtpSent(true);

          toast.add({
            title: "OTP Sent",
            description:
              "A password reset OTP has been sent to your email.",
            type: "success",
          });
        },

        onError: (error) => {
          toast.add({
            title: "Failed to Send OTP",
            description:
              error.message ||
              "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      form.reset();

      setOtpSent(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {otpSent
              ? "Reset your password"
              : "Forgot your password?"}
          </DialogTitle>

          <DialogDescription>
            {otpSent
              ? "Enter the OTP sent to your email and create a new password."
              : "We will send a password reset OTP to your email address."}
          </DialogDescription>
        </DialogHeader>

        {!otpSent ? (
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="forgot-email">
                Email
              </FieldLabel>

              <Input
                id="forgot-email"
                type="email"
                value={email}
                className="text-black"
                readOnly
              />
            </div>

            {/* Send OTP */}
            <Button
              type="button"
              className="w-full"
              disabled={sendOtpPending}
              onClick={handleSendOtp}
            >
              {sendOtpPending ? (
                <>
                  <Spinner />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* OTP */}
              <form.Field name="otp">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        OTP
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(
                            event.target.value.replace(
                              /\D/g,
                              "",
                            ),
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

              {/* New Password */}
              <form.Field name="newPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        New Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter new password"
                          value={field.state.value}
                          onChange={(event) =>
                            field.handleChange(
                              event.target.value,
                            )
                          }
                          onBlur={field.handleBlur}
                          autoComplete="new-password"
                          aria-invalid={isInvalid}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setShowPassword(
                              (previous) => !previous,
                            )
                          }
                        >
                          {showPassword ? (
                            <EyeClosed className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Confirm Password */}
              <form.Field name="confirmPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm new password"
                          value={field.state.value}
                          onChange={(event) =>
                            field.handleChange(
                              event.target.value,
                            )
                          }
                          onBlur={field.handleBlur}
                          autoComplete="new-password"
                          aria-invalid={isInvalid}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setShowConfirmPassword(
                              (previous) => !previous,
                            )
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeClosed className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Reset Password */}
              <Button
                type="submit"
                className="w-full"
                disabled={resetPasswordPending}
              >
                {resetPasswordPending ? (
                  <>
                    <Spinner />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              {/* Back */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  form.reset();

                  setOtpSent(false);
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
              >
                Back
              </Button>
            </FieldGroup>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}