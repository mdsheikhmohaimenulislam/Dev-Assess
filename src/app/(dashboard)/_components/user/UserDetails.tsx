
"use client";

import { ArrowLeft, Mail, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { useGetSingleUser } from "@/components/hooks/user.hook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface UserDetailsProps {
  id: string;
}

type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED"
  | "DELETED";




export default function UserDetails({
  id,
}: UserDetailsProps) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useGetSingleUser(id);

  const user = data?.data;

  const getStatusVariant = (
    status: UserStatus,
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "ACTIVE":
        return "default";

      case "BLOCKED":
      case "DELETED":
        return "destructive";

      case "INACTIVE":
        return "secondary";

      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <section className="space-y-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardContent className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading user...
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section className="space-y-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardContent className="flex min-h-60 flex-col items-center justify-center">
            <p className="font-medium text-destructive">
              Failed to load user.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              User information could not be found.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            User Details
          </h1>

          <p className="text-sm text-muted-foreground">
            View user account information.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Image */}
<div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
  {user.imageUrl ? (
    <Image
      src={user.imageUrl}
      alt={user.name}
      width={96}
      height={96}
      className="h-full w-full object-cover"
    />
  ) : (
    <UserRound className="h-10 w-10 text-muted-foreground" />
  )}
</div>

            {/* Name & Email */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                {user.name}
              </h2>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Role */}
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Role
              </p>

              <div className="mt-2">
                <Badge variant="outline">
                  {user.role}
                </Badge>
              </div>
            </div>

            {/* Status */}
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <div className="mt-2">
                <Badge
                  variant={getStatusVariant(user.status)}
                >
                  {user.status}
                </Badge>
              </div>
            </div>

            {/* Created */}
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Created At
              </p>

              <p className="mt-2 font-medium">
                {new Date(
                  user.createdAt,
                ).toLocaleDateString()}
              </p>
            </div>

            {/* Updated */}
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Updated At
              </p>

              <p className="mt-2 font-medium">
                {new Date(
                  user.updatedAt,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
