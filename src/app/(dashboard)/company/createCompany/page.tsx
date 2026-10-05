import CreateCompanyForm from "@/components/layouts/company/CreateCompanyForm";


export default function CreateCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Create Company
        </h1>

        <p className="text-muted-foreground">
          Create a new company profile.
        </p>
      </div>

      <CreateCompanyForm basePath="/company"/>
    </div>
  );
}