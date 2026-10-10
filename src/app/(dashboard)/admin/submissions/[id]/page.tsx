import SubmissionDetails from "@/app/(dashboard)/_components/submission/SubmissionDetails";
import { useGetAllProblems } from "@/components/hooks/problem.hook";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CompanySubmissionDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const problem = useGetAllProblems()

  return <SubmissionDetails id={id} userRole="ADMIN" />;
}
