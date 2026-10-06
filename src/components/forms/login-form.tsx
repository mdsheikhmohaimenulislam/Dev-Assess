"use client";

import { useState } from "react";

import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";


import { useForm } from "@tanstack/react-form";

import { loginSchema } from "@/validation/auth.validation";

import { useLogin } from "../hooks/auth.hook";
import ForgotPasswordModal from "./forgot-password-modal";

import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import GoogleAuthButton from "../auth/google-auth-button";
import { useRouter } from "next/navigation";
import { refresh } from "next/cache";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
const router = useRouter();


  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

login(loginData, {
  onSuccess: () => {
    toast.add({
      title: "Login Successful",
      description: "Welcome back to Code Assess.",
      type: "success",
    });



    router.push("/");

  },

  onError: (error) => {
    const message = error.message?.toLowerCase() ?? "";

    if (message.includes("email")) {
      toast.add({
        title: "Login Failed",
        description: "Invalid email address.",
        type: "error",
      });
      return;
    }

    if (message.includes("password")) {
      toast.add({
        title: "Login Failed",
        description: "Incorrect password.",
        type: "error",
      });
      return;
    }

    toast.add({
      title: "Login Failed",
      description: "Something went wrong. Please try again.",
      type: "error",
    });
  },
});
    },
  });

  const handleForgotPassword = () => {
    const email = form.getFieldValue("email").trim();

    if (!email) {
      toast.add({
        title: "Email Required",
        description: "Please enter your email address first.",
        type: "error",
      });

      return;
    }

    setForgotPasswordEmail(email);
    setForgotPasswordOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Email */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="Enter your email"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      autoComplete="email"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        autoComplete="current-password"
                        aria-invalid={isInvalid}
                        className="pr-10"
                      />

                      {/* Show / Hide Password */}
                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword((previous) => !previous)}
                      >
                        {showPassword ? (
                          <EyeClosed className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>

                      {/* Forgot Password */}
                      <button
                        type="button"
                        className="absolute right-0 -bottom-6 text-sm font-medium text-muted-foreground hover:text-primary"
                        onClick={handleForgotPassword}
                      >
                        Forgot password?
                      </button>
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Login Button */}
            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={loginPending}
            >
              {loginPending ? (
                <>
                  <Spinner />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* Separator */}
            <FieldSeparator>Or continue with</FieldSeparator>

            {/* Google Login */}
  <GoogleAuthButton />
          </FieldGroup>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        email={forgotPasswordEmail}
        open={forgotPasswordOpen}
        onOpenChange={setForgotPasswordOpen}
      />
    </>
  );
}
