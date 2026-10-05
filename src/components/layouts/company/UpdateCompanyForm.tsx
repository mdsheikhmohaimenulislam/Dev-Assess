"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useUpdateCompany } from "@/components/hooks/company.hook";
import type { Company } from "@/components/types/company.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UpdateCompanyFormProps {
  company: Company;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function UpdateCompanyForm({
  company,
  onSuccess,
  onCancel,
}: UpdateCompanyFormProps) {
  const updateCompany = useUpdateCompany();

  const [formData, setFormData] = useState({
    companyName: company.companyName,
    description: company.description ?? "",
    website: company.website ?? "",
    logo: company.logo ?? "",
  });

  useEffect(() => {
    setFormData({
      companyName: company.companyName,
      description: company.description ?? "",
      website: company.website ?? "",
      logo: company.logo ?? "",
    });
  }, [company]);

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

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const companyName = formData.companyName.trim();
    const description = formData.description.trim();
    const website = formData.website.trim();
    const logo = formData.logo.trim();

    if (!companyName) {
      toast.error("Company name is required.");
      return;
    }

    const payload = {
      companyName,
      description: description || undefined,
      website: website || undefined,
      logo: logo || undefined,
    };

    updateCompany.mutate(
      {
        id: company.id,
        payload,
      },
      {
        onSuccess: () => {
          toast.success("Company updated successfully.");
          onSuccess?.();
        },
        onError: (error) => {
          console.error("Update company error:", error);
          toast.error("Failed to update company.");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>

        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          disabled={updateCompany.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={updateCompany.isPending}
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
          disabled={updateCompany.isPending}
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
          disabled={updateCompany.isPending}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={updateCompany.isPending}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={updateCompany.isPending}
        >
          {updateCompany.isPending
            ? "Updating..."
            : "Update Company"}
        </Button>
      </div>
    </form>
  );
}