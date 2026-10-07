// "use client";

// import { useParams } from "next/navigation";
// import {
//   Calendar,
//   CheckCircle2,
//   Clock,
//   FileText,
//   Hash,
//   Target,
//   Trophy,
//   User,
// } from "lucide-react";

// import { useGetAttemptById } from "@/components/hooks/attempt.hook";
// import { useGetAssessmentProblems } from "@/components/hooks/assessment-problem.hook";

// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default function AssessmentAttemptPage() {
//   const params = useParams();

//   const attemptId = params.id as string;

//   const {
//     data: attemptData,
//     isLoading: isAttemptLoading,
//     isError: isAttemptError,
//   } = useGetAttemptById(attemptId);

//   const attempt = attemptData?.data;
//   const assessment = attempt?.assessment;
//   const candidate = attempt?.candidate;

//   const assessmentId = attempt?.assessmentId ?? "";

//   const {
//     data: problemsData,
//     isLoading: isProblemsLoading,
//     isError: isProblemsError,
//   } = useGetAssessmentProblems(assessmentId);

//   if (isAttemptLoading) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex min-h-[400px] items-center justify-center">
//           <p className="text-muted-foreground">
//             Loading assessment...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   if (
//     isAttemptError ||
//     !attempt ||
//     !assessment ||
//     !candidate
//   ) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex min-h-[400px] items-center justify-center">
//           <p className="text-destructive">
//             Failed to load assessment.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   const statusClassName =
//     attempt.status === "IN_PROGRESS"
//       ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
//       : attempt.status === "SUBMITTED"
//         ? "bg-green-100 text-green-700 hover:bg-green-100"
//         : "bg-red-100 text-red-700 hover:bg-red-100";

//   const problems = problemsData?.data ?? [];

//   return (
//     <main className="container mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">
//               {assessment.title}
//             </h1>

//             <p className="mt-2 text-muted-foreground">
//               {assessment.description}
//             </p>
//           </div>

//           <Badge className={statusClassName}>
//             {attempt.status}
//           </Badge>
//         </div>
//       </div>

//       {/* Assessment Information */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-base">
//               <Clock className="h-5 w-5" />
//               Duration
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <p className="text-2xl font-bold">
//               {assessment.duration}
//             </p>

//             <p className="text-sm text-muted-foreground">
//               minutes
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-base">
//               <Trophy className="h-5 w-5" />
//               Total Marks
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <p className="text-2xl font-bold">
//               {assessment.totalMarks}
//             </p>

//             <p className="text-sm text-muted-foreground">
//               total marks
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-base">
//               <Target className="h-5 w-5" />
//               Passing Marks
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <p className="text-2xl font-bold">
//               {assessment.passingMarks}
//             </p>

//             <p className="text-sm text-muted-foreground">
//               required to pass
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Attempt Information */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="h-5 w-5" />
//             Attempt Information
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div className="grid gap-5 md:grid-cols-2">
//             <div className="flex items-start gap-3">
//               <Hash className="mt-0.5 h-5 w-5 text-muted-foreground" />

//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Attempt ID
//                 </p>

//                 <p className="break-all font-medium">
//                   {attempt.id}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />

//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Assessment ID
//                 </p>

//                 <p className="break-all font-medium">
//                   {attempt.assessmentId}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />

//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Started At
//                 </p>

//                 <p className="font-medium">
//                   {new Date(attempt.startedAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />

//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Expires At
//                 </p>

//                 <p className="font-medium">
//                   {new Date(attempt.expiresAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />

//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Created At
//                 </p>

//                 <p className="font-medium">
//                   {new Date(attempt.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <CheckCircle2 className="mt-0.5 h-5 w-5 text-muted-foreground" />

//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Status
//                 </p>

//                 <Badge className={`mt-1 ${statusClassName}`}>
//                   {attempt.status}
//                 </Badge>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Candidate Information */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <User className="h-5 w-5" />
//             Candidate Information
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div className="grid gap-5 md:grid-cols-2">
//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Candidate ID
//               </p>

//               <p className="break-all font-medium">
//                 {candidate.id}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-muted-foreground">
//                 User ID
//               </p>

//               <p className="break-all font-medium">
//                 {candidate.userId}
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Assessment Schedule */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Calendar className="h-5 w-5" />
//             Assessment Schedule
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div className="grid gap-5 md:grid-cols-2">
//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Start Time
//               </p>

//               <p className="font-medium">
//                 {assessment.startTime
//                   ? new Date(
//                       assessment.startTime,
//                     ).toLocaleString()
//                   : "Not specified"}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-muted-foreground">
//                 End Time
//               </p>

//               <p className="font-medium">
//                 {assessment.endTime
//                   ? new Date(
//                       assessment.endTime,
//                     ).toLocaleString()
//                   : "Not specified"}
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Problems */}
//       <Card className="mt-6">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               Assessment Problems
//             </CardTitle>

//             {!isProblemsLoading && (
//               <Badge variant="secondary">
//                 {problems.length} Problems
//               </Badge>
//             )}
//           </div>
//         </CardHeader>

//         <CardContent>
//           {isProblemsLoading ? (
//             <div className="flex min-h-[200px] items-center justify-center">
//               <p className="text-muted-foreground">
//                 Loading problems...
//               </p>
//             </div>
//           ) : isProblemsError ? (
//             <div className="flex min-h-[200px] items-center justify-center">
//               <p className="text-destructive">
//                 Failed to load problems.
//               </p>
//             </div>
//           ) : problems.length === 0 ? (
//             <div className="flex min-h-[200px] items-center justify-center">
//               <p className="text-muted-foreground">
//                 No problems available for this assessment.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {problems.map((problem, index) => (
//                 <Card key={problem.id}>
//                   <CardHeader>
//                     <div className="flex items-start justify-between gap-4">
//                       <CardTitle className="text-lg">
//                         Question {index + 1}
//                       </CardTitle>

//                       <Badge variant="outline">
//                         {problem.marks} Marks
//                       </Badge>
//                     </div>
//                   </CardHeader>

//                   <CardContent>
//                     <p className="mb-4 whitespace-pre-wrap">
//                       {problem.question}
//                     </p>

//                     <div className="flex flex-wrap gap-2">
//                       {problem.type && (
//                         <Badge variant="secondary">
//                           {problem.type}
//                         </Badge>
//                       )}

//                       {problem.language && (
//                         <Badge variant="secondary">
//                           {problem.language}
//                         </Badge>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </main>
//   );
// }