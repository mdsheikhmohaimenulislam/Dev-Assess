import SubmissionDetails from "@/app/(dashboard)/_components/submission/SubmissionDetails";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CompanySubmissionDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <SubmissionDetails id={id} />;
}