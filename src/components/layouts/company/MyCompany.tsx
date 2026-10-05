"use client";

import { Building2, Globe, Mail, Pencil } from "lucide-react";
import { useState } from "react";

import { useGetMyCompany } from "@/components/hooks/company.hook";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateCompanyForm from "./UpdateCompanyForm";

export default function MyCompany() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isLoading, isError } = useGetMyCompany();

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Loading company information...
        </p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <Building2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

        <h3 className="text-lg font-semibold">
          Company profile not found
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          You have not created your company profile yet.
        </p>
      </div>
    );
  }
  console.log(data);

  const company = data?.data;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              My Company
            </h2>

            <p className="text-muted-foreground">
              View and manage your company profile.
            </p>
          </div>

          {/* Edit Button */}
          <Button
            type="button"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Company
          </Button>
        </div>

        {/* Company Information */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Logo */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.companyName} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 className="h-10 w-10 text-primary" />
              )}
            </div>

            {/* Company Name & Description */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold">
                  {company.companyName}
                </h3>

                <p className="text-sm text-muted-foreground">
                  Company ID: {company.id}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                {company.description ||
                  "No description available."}
              </p>
            </div>
          </div>

          {/* Website & User ID */}
          <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
            {/* Website */}
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Website
                </p>

                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  <p className="text-sm">
                    Not provided
                  </p>
                )}
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">
                  User ID
                </p>

                <p className="font-mono text-sm">
                  {company.userId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Company Dialog */}
      <Dialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Edit Company
            </DialogTitle>

            <DialogDescription>
              Update your company profile information.
            </DialogDescription>
          </DialogHeader>

          <UpdateCompanyForm
            company={company}
            onSuccess={() => {
              setIsEditOpen(false);
            }}
            onCancel={() => {
              setIsEditOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}