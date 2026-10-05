import CreateAssessmentForm from "@/components/layouts/assessment/CreateAssessmentForm";


export default function CreateAdminAssessmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Create Assessment
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a new assessment.
        </p>
      </div>

      <CreateAssessmentForm
        basePath="/company/assessments"
      />
    </div>
  );
}