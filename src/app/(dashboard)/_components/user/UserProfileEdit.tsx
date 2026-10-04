
"use client";





//   id={user.id}<UserProfileEdit
//   id={user.id}
//   name={user.name}
//   imageUrl={user.imageUrl}
// />






import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Save, UserRound } from "lucide-react";

import { useUpdateMyProfile } from "@/components/hooks/user.hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserProfileEditProps {
  id: string;
  name: string;
  imageUrl?: string | null;
}

export default function UserProfileEdit({
  id,
  name,
  imageUrl,
}: UserProfileEditProps) {
  const [formData, setFormData] = useState({
    name,
    imageUrl: imageUrl ?? "",
  });

  const updateProfile = useUpdateMyProfile();

  useEffect(() => {
    setFormData({
      name,
      imageUrl: imageUrl ?? "",
    });
  }, [name, imageUrl]);

  const handleChange = (
    field: "name" | "imageUrl",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfile.mutate({
      id,
      payload: {
        name: formData.name,
        imageUrl: formData.imageUrl || undefined,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pencil className="h-5 w-5" />
          Edit Profile
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Profile Image Preview */}
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
              {formData.imageUrl ? (
                <Image
                  src={formData.imageUrl}
                  alt={formData.name || "User"}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound className="h-8 w-8 text-muted-foreground" />
              )}
            </div>

            <div>
              <p className="font-medium">
                Profile Image
              </p>

              <p className="text-sm text-muted-foreground">
                Enter an image URL below.
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name
            </Label>

            <Input
              id="name"
              value={formData.name}
              onChange={(event) =>
                handleChange(
                  "name",
                  event.target.value,
                )
              }
              placeholder="Enter your name"
              disabled={updateProfile.isPending}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">
              Image URL
            </Label>

            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(event) =>
                handleChange(
                  "imageUrl",
                  event.target.value,
                )
              }
              placeholder="https://example.com/image.jpg"
              disabled={updateProfile.isPending}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={updateProfile.isPending}
            >
              <Save className="mr-2 h-4 w-4" />

              {updateProfile.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>

          {/* Success */}
          {updateProfile.isSuccess && (
            <p className="text-sm text-green-600">
              Profile updated successfully.
            </p>
          )}

          {/* Error */}
          {updateProfile.isError && (
            <p className="text-sm text-destructive">
              Failed to update profile. Please try again.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
