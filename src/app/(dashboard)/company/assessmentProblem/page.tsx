import AssessmentProblems from "@/components/layouts/AssessmentProblemForm/AssessmentProblems";


interface AssessmentProblemsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AssessmentProblemsPage({
  params,
}: AssessmentProblemsPageProps) {
  const { id } = await params;

  return <AssessmentProblems assessmentId={id} />;
}