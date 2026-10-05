import CompanyList from "@/components/layouts/company/CompanyList";


export default function AdminCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Company Management
        </h1>

        <p className="text-muted-foreground">
          Manage all registered companies.
        </p>
      </div>

      <CompanyList basePath="/admin" />
    </div>
  );
}