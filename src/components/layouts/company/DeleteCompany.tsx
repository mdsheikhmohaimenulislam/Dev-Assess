"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useDeleteCompany } from "@/components/hooks/company.hook";
import { Button } from "@/components/ui/button";

interface DeleteCompanyProps {
  id: string;
  onSuccess?: () => void;
}

export default function DeleteCompany({
  id,
  onSuccess,
}: DeleteCompanyProps) {
  const deleteCompany = useDeleteCompany();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmed) {
      return;
    }

    deleteCompany.mutate(id, {
      onSuccess: () => {
        toast.success("Company deleted successfully.");
        onSuccess?.();
      },
      onError: () => {
        toast.error("Failed to delete company.");
      },
    });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={deleteCompany.isPending}
    >
      <Trash2 className="mr-1.5 h-4 w-4" />

      {deleteCompany.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}