"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useGoogleLogin } from "@/components/hooks/auth.hook";

export default function GoogleAuthButton() {
  const router = useRouter();

  const { mutateAsync: loginWithGoogle } = useGoogleLogin();

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    console.log("1. Google onSuccess called");

    if (!credentialResponse.credential) {
      console.log("2. Google credential missing");
      toast.error("Google ID token not found");
      return;
    }

    console.log("2. Google credential received");

    try {
      console.log("3. Calling backend...");

      const result = await loginWithGoogle(credentialResponse.credential);

      console.log("4. Backend response:", result);

      toast.success("Google login successful");

      console.log("5. Success toast called");

      router.push("/");
    } catch (error) {
      console.error("6. Google login failed:", error);

      toast.error("Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => {
        console.log("GoogleLogin onError called");
        toast.error("Google login failed");
      }}
    />
  );
}
