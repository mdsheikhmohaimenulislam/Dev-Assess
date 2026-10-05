"use client";

import { useRouter, useParams } from "next/navigation";


import { useGetCompanyById } from "@/components/hooks/company.hook";
import UpdateCompanyForm from "@/components/layouts/company/UpdateCompanyForm";

export default function EditCompanyPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } = useGetCompanyById(id);

  console.log(data);

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Loading company information...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">
          Failed to load company information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Edit Company
        </h1>

        <p className="text-muted-foreground">
          Update your company profile information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <UpdateCompanyForm
          company={data}
          onSuccess={() => {
            router.push("/company/myCompany");
          }}
          onCancel={() => {
            router.push("/company/myCompany");
          }}
        />
      </div>
    </div>
  );
}