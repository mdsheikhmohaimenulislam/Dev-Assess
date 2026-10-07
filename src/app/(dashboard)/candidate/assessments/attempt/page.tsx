// "use client";

// import { useParams } from "next/navigation";

// import { useSubmitAttempt } from "@/components/hooks/attempt.hook";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useGetAssessmentProblems } from "@/components/hooks/assessment-problem.hook";

// export default function AttemptPage() {
//   const params = useParams();

//   const attemptId = params.attemptId as string;

//   const {
//     data,
//     isLoading,
//     isError,
//   } = useGetAssessmentProblems(attemptId);

//   const {
//     mutate: submitAttempt,
//     isPending: isSubmitting,
//   } = useSubmitAttempt();

//   const handleSubmit = () => {
//     submitAttempt(attemptId, {
//       onSuccess: () => {
//         toast.success("Assessment submitted successfully");
//       },
//       onError: (error) => {
//         toast.error(
//           error instanceof Error
//             ? error.message
//             : "Failed to submit assessment",
//         );
//       },
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p>Loading assessment...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p>Failed to load assessment problems.</p>
//       </div>
//     );
//   }

//   const problems = data?.data ?? [];

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold">
//           Assessment
//         </h1>

//         <p className="text-muted-foreground">
//           Attempt ID: {attemptId}
//         </p>
//       </div>

//       <div className="space-y-6">
//         {problems.length === 0 ? (
//           <Card>
//             <CardContent className="py-10 text-center">
//               <p>No problems found for this assessment.</p>
//             </CardContent>
//           </Card>
//         ) : (
//           problems.map((problem, index) => (
//             <Card key={problem.id}>
//               <CardHeader>
//                 <CardTitle>
//                   Question {index + 1}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent>
//                 <p className="mb-4">
//                   {problem.title}
//                 </p>

//                 {/* Question UI এখানে আসবে */}
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>

//       <div className="mt-8 flex justify-end">
//         <Button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//         >
//           {isSubmitting
//             ? "Submitting..."
//             : "Submit Assessment"}
//         </Button>
//       </div>
//     </main>
//   );
// }