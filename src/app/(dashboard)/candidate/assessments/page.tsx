// "use client";

// import { Clock, FileCheck2, Trophy } from "lucide-react";

// import { useGetInvitations } from "@/components/hooks/invitation.hook";

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import StartAttemptButton from "@/components/layouts/attempts/StartAttemptButton";

// export default function AssessmentsPage() {
//   const { data, isLoading, isError } = useGetInvitations();

//   if (isLoading) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex min-h-[300px] items-center justify-center">
//           <p className="text-muted-foreground">
//             Loading assessments...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   if (isError) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex min-h-[300px] items-center justify-center">
//           <p className="text-destructive">
//             Failed to load assessments.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   const invitations = data?.data ?? [];

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Assessments</h1>

//         <p className="mt-2 text-muted-foreground">
//           Complete your invited assessments and test your skills.
//         </p>
//       </div>

//       {invitations.length === 0 ? (
//         <Card>
//           <CardContent className="flex min-h-[250px] items-center justify-center">
//             <p className="text-muted-foreground">
//               No assessments available.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {invitations.map((invitation) => {
//             const assessment = invitation.assessment;

//             if (!assessment) {
//               return null;
//             }

//             const statusClassName =
//               assessment.status === "PUBLISHED"
//                 ? "bg-green-100 text-green-700 hover:bg-green-100"
//                 : assessment.status === "ONGOING"
//                   ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
//                   : "";

//             return (
//               <Card
//                 key={invitation.id}
//                 className="flex h-full flex-col"
//               >
//                 <CardHeader>
//                   <div className="flex items-start justify-between gap-3">
//                     <h2 className="text-xl font-semibold">
//                       {assessment.title}
//                     </h2>

//                     <Badge className={statusClassName}>
//                       {assessment.status}
//                     </Badge>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="flex flex-1 flex-col">
//                   <p className="mb-6 line-clamp-3 text-sm text-muted-foreground">
//                     {assessment.description}
//                   </p>

//                   <div className="mb-6 space-y-3 text-sm">
//                     <div className="flex items-center gap-2">
//                       <Clock className="h-4 w-4 text-muted-foreground" />

//                       <span>
//                         Duration:{" "}
//                         <span className="font-medium">
//                           {assessment.duration} minutes
//                         </span>
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <FileCheck2 className="h-4 w-4 text-muted-foreground" />

//                       <span>
//                         Assessment ID:{" "}
//                         <span className="font-medium">
//                           {assessment.id.slice(0, 8)}...
//                         </span>
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <Trophy className="h-4 w-4 text-muted-foreground" />

//                       <span>
//                         Invitation:{" "}
//                         <span className="font-medium">
//                           {invitation.status}
//                         </span>
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mt-auto">
//                     <StartAttemptButton
//                       assessmentId={assessment.id}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </main>
//   );
// }