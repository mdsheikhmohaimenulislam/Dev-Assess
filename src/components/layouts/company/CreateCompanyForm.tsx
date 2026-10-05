"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCreateCompany } from "@/components/hooks/company.hook";
import { useGetMe } from "@/components/hooks/auth.hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateCompanyFormProps {
  basePath: "/company";
}

export default function CreateCompanyForm({
  basePath,
}: CreateCompanyFormProps) {
  const router = useRouter();

  const createCompany = useCreateCompany();
  const { data, isLoading } = useGetMe();

  const user = data?.data;
  console.log(user);

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    logo: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

const handleCancel = () => {
//   router.push(`${basePath}/dashboard`);

  router.back();
};

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!user?.id) {
      toast.error("User information not found.");
      return;
    }

    if (!formData.companyName.trim()) {
      toast.error("Company name is required.");
      return;
    }

    createCompany.mutate(
      {
        userId: user.id,
        companyName: formData.companyName.trim(),
        description: formData.description.trim(),
        website: formData.website.trim(),
        logo: formData.logo.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Company created successfully.");

          setFormData({
            companyName: "",
            description: "",
            website: "",
            logo: "",
          });

          router.push(`${basePath}/dashboard`);
        },
        onError: () => {
          toast.error("Failed to create company.");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Loading user information...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>

        <Input
          id="userId"
          value={user?.id ?? ""}
          disabled
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>

        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          disabled={createCompany.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your company"
          rows={5}
          disabled={createCompany.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>

        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
          disabled={createCompany.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Logo URL</Label>

        <Input
          id="logo"
          name="logo"
          type="url"
          value={formData.logo}
          onChange={handleChange}
          placeholder="https://example.com/logo.png"
          disabled={createCompany.isPending}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={createCompany.isPending || !user?.id}
        >
          {createCompany.isPending
            ? "Creating..."
            : "Create Company"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={createCompany.isPending}
        >
          Back
        </Button>
      </div>
    </form>
  );
}