"use client";

import {
  useRegistration,
  useVerifyAccount,
} from "@/components/hooks/auth.hook";
import { RegistrationPayload, VerifyAccountPayload } from "@/components/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const form = useForm<RegistrationPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const verifyForm = useForm<VerifyAccountPayload>({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const { mutate: registerUser, isPending: isRegistering } = useRegistration();

  const { mutate: verifyUser, isPending: isVerifying } = useVerifyAccount();

  // Restore OTP modal after page reload
  useEffect(() => {
    const verificationPending = sessionStorage.getItem("verificationPending");

    const verificationEmail = sessionStorage.getItem("verificationEmail");

    if (verificationPending === "true" && verificationEmail) {
      setRegisteredEmail(verificationEmail);

      verifyForm.reset({
        email: verificationEmail,
        otp: "",
      });

      setVerifyModalOpen(true);
    }
  }, [verifyForm]);

  const onSubmit = (data: RegistrationPayload) => {
    registerUser(data, {
      onSuccess: (response) => {
        toast.success(
          response.message ||
            "Registration successful. Please verify your email.",
        );

        // Save verification state
        sessionStorage.setItem("verificationPending", "true");

        sessionStorage.setItem("verificationEmail", data.email);

        setRegisteredEmail(data.email);

        verifyForm.reset({
          email: data.email,
          otp: "",
        });

        setVerifyModalOpen(true);
      },

      onError: (error) => {
        toast.error(error.message || "Registration failed.");
      },
    });
  };

  const handleVerify = (data: VerifyAccountPayload) => {
    verifyUser(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Email verified successfully!");

        // Clear verification state
        sessionStorage.removeItem("verificationPending");

        sessionStorage.removeItem("verificationEmail");

        setVerifyModalOpen(false);
        setRegisteredEmail("");

        verifyForm.reset({
          email: "",
          otp: "",
        });

        router.push("/");
      },

      onError: (error) => {
        toast.error(error.message || "Invalid OTP.");
      },
    });
  };

  const handleCancelVerification = () => {
    // Clear verification state
    sessionStorage.removeItem("verificationPending");

    sessionStorage.removeItem("verificationEmail");

    // Reset OTP form
    verifyForm.reset({
      email: "",
      otp: "",
    });

    // Clear registered email
    setRegisteredEmail("");

    // Close modal
    setVerifyModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <p className="text-sm text-muted-foreground">
            Enter your information to create your Code Assess account.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...form.register("name")}
            />

            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...form.register("email")}
            />

            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                {...form.register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* OTP Modal */}
      {verifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
            {/* Modal Header */}
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold">Verify your email</h2>

              <p className="text-sm text-muted-foreground">
                We sent a verification code to
              </p>

              <p className="text-sm font-medium">{registeredEmail}</p>
            </div>

            {/* OTP Form */}
            <form
              onSubmit={verifyForm.handleSubmit(handleVerify)}
              className="mt-6 space-y-4"
            >
              {/* OTP */}
              <div className="space-y-2">
                <Label htmlFor="otp">Verification OTP</Label>

                <Input
                  id="otp"
                  placeholder="Enter 6 digit OTP"
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  {...verifyForm.register("otp")}
                />

                {verifyForm.formState.errors.otp && (
                  <p className="text-sm text-destructive">
                    {verifyForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {/* Verify */}
                <Button type="submit" className="w-full" disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Verify Account"}
                </Button>

                {/* Cancel */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleCancelVerification}
                  disabled={isVerifying}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
