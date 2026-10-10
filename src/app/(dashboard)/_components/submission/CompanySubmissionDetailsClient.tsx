
// "use client";

// import SubmissionDetails from "@/app/(dashboard)/_components/submission/SubmissionDetails";
// import { useGetAllProblems } from "@/components/hooks/problem.hook";

// interface Props {
//   id: string;
// }

// export default function CompanySubmissionDetailsClient({
//   id,
// }: Props) {
//   const { data, isLoading, isError } = useGetAllProblems();

//   if (isLoading) {
//     return <p>Loading problems...</p>;
//   }

//   if (isError) {
//     return <p>Failed to load problems.</p>;
//   }

//   const problems = data?.data ?? [];
//   const problem = problems.find((item) => item.id === id);

//   if (!problem) {
//     return <p>Problem not found.</p>;
//   }

//   return (
//     <SubmissionDetails id={id} userRole="COMPANY" />
//   );
// }
