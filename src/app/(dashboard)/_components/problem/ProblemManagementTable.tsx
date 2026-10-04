
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useGetAllProblems } from "@/components/hooks/problem.hook";

// interface Problem {
//   id: string;
//   title: string;
//   category: string;
//   difficulty: "EASY" | "MEDIUM" | "HARD";
//   type: "CODING";
//   description: string;
//   inputFormat: string;
//   outputFormat: string;
//   constraints: string;
//   timeLimit: number;
//   memoryLimit: number;
// }

// interface ProblemManagementTableProps {
//   basePath: "/admin/problems" | "/company/problems";
// }

// export default function ProblemManagementTable({
//   basePath,
// }: ProblemManagementTableProps) {
//   const [selectedProblem, setSelectedProblem] = useState<Problem | null>(
//     null,
//   );

//   const [isEditOpen, setIsEditOpen] = useState(false);

//   const { data } = useGetAllProblems();

//   const problems = data?.data ?? [];

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     difficulty: "EASY" as "EASY" | "MEDIUM" | "HARD",
//     description: "",
//     inputFormat: "",
//     outputFormat: "",
//     constraints: "",
//     timeLimit: "",
//     memoryLimit: "",
//   });

//   const handleEdit = (problem: Problem) => {
//     setSelectedProblem(problem);

//     setFormData({
//       title: problem.title,
//       category: problem.category,
//       difficulty: problem.difficulty,
//       description: problem.description,
//       inputFormat: problem.inputFormat,
//       outputFormat: problem.outputFormat,
//       constraints: problem.constraints,
//       timeLimit: String(problem.timeLimit),
//       memoryLimit: String(problem.memoryLimit),
//     });

//     setIsEditOpen(true);
//   };

//   const handleUpdate = () => {
//     if (!selectedProblem) return;

//     const updatedProblem = {
//       id: selectedProblem.id,
//       ...formData,
//       timeLimit: Number(formData.timeLimit),
//       memoryLimit: Number(formData.memoryLimit),
//     };

//     console.log("Updated problem:", updatedProblem);

//     // এখানে পরে PATCH API call করবে
//     // await updateProblem(selectedProblem.id, updatedProblem);

//     setIsEditOpen(false);
//   };

//   const handleDelete = (id: string) => {
//     console.log("Delete problem:", id);
//   };

//   return (
//     <div className="p-6">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <h1 className="text-2xl font-bold">Problem Management</h1>

//             <p className="text-sm text-muted-foreground">
//               Manage coding problems from here.
//             </p>
//           </div>

//           {/* <Button>
//             <Link href="/problems/create">
//               <Plus />
//               Create Problem
//             </Link>
//           </Button> */}
//         </div>

//         {/* Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>All Problems</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b text-left">
//                     <th className="px-4 py-3 font-medium">#</th>

//                     <th className="px-4 py-3 font-medium">Title</th>

//                     <th className="px-4 py-3 font-medium">Category</th>

//                     <th className="px-4 py-3 font-medium">Difficulty</th>

//                     <th className="px-4 py-3 font-medium">Type</th>

//                     <th className="px-4 py-3 text-right font-medium">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>


// <tbody>
//   {problems.map((problem: Problem, index: number) => (
//     <tr
//       key={problem.id}
//       className="border-b last:border-0"
//     >
//       <td className="px-4 py-4">
//         {index + 1}
//       </td>

//       <td className="px-4 py-4">
//         <p className="font-medium">
//           {problem.title}
//         </p>

//         <p className="mt-1 max-w-50 truncate text-xs text-muted-foreground">
//           {problem.id}
//         </p>
//       </td>

//       <td className="px-4 py-4">
//         {problem.category}
//       </td>

//       <td className="px-4 py-4">
//         <Badge
//           variant={
//             problem.difficulty === "EASY"
//               ? "secondary"
//               : problem.difficulty === "MEDIUM"
//                 ? "outline"
//                 : "destructive"
//           }
//         >
//           {problem.difficulty}
//         </Badge>
//       </td>

//       <td className="px-4 py-4">
//         <Badge variant="outline">
//           {problem.type}
//         </Badge>
//       </td>

//       <td className="px-4 py-4">
//         <div className="flex justify-end gap-2">
//           {/* View */}
//           <Button
   
//             size="icon"
//             variant="outline"
//             title="View"
//           >
//             <Link href={`${basePath}/${problem.id}`}>
//               <Eye />
//             </Link>
//           </Button>

//           {/* Edit */}
//           <Button
//             size="icon"
//             variant="outline"
//             title="Edit"
//             onClick={() => handleEdit(problem)}
//           >
//             <Pencil />
//           </Button>

//           {/* Delete */}
//           <Button
//             size="icon"
//             variant="destructive"
//             title="Delete"
//             onClick={() => handleDelete(problem.id)}
//           >
//             <Trash2 />
//           </Button>
//         </div>
//       </td>
//     </tr>
//   ))}
// </tbody>

//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Edit Dialog */}
//         <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
//           <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
//             <DialogHeader>
//               <DialogTitle>Edit Problem</DialogTitle>

//               <DialogDescription>
//                 Update the problem information and save your changes.
//               </DialogDescription>
//             </DialogHeader>

//             <div className="grid gap-5 py-4">
//               {/* Title */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="title"
//                   className="text-sm font-medium"
//                 >
//                   Title
//                 </label>

//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       title: event.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {/* Category */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="category"
//                   className="text-sm font-medium"
//                 >
//                   Category
//                 </label>

//                 <Input
//                   id="category"
//                   value={formData.category}
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       category: event.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {/* Difficulty */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="difficulty"
//                   className="text-sm font-medium"
//                 >
//                   Difficulty
//                 </label>

//                 <select
//                   id="difficulty"
//                   value={formData.difficulty}
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       difficulty: event.target.value as
//                         | "EASY"
//                         | "MEDIUM"
//                         | "HARD",
//                     })
//                   }
//                   className="h-10 w-full rounded-md border bg-background px-3 text-sm"
//                 >
//                   <option value="EASY">EASY</option>
//                   <option value="MEDIUM">MEDIUM</option>
//                   <option value="HARD">HARD</option>
//                 </select>
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="description"
//                   className="text-sm font-medium"
//                 >
//                   Description
//                 </label>

//                 <Textarea
//                   id="description"
//                   rows={4}
//                   value={formData.description}
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       description: event.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {/* Input Format */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="inputFormat"
//                   className="text-sm font-medium"
//                 >
//                   Input Format
//                 </label>

//                 <Textarea
//                   id="inputFormat"
//                   value={formData.inputFormat}
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       inputFormat: event.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {/* Output Format */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="outputFormat"
//                   className="text-sm font-medium"
//                 >
//                   Output Format
//                 </label>

//                 <Textarea
//                   id="outputFormat"
//                   value={formData.outputFormat}
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       outputFormat: event.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {/* Constraints */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="constraints"
//                   className="text-sm font-medium"
//                 >
//                   Constraints
//                 </label>

//                 <Textarea
//                   id="constraints"
//                   value={formData.constraints}
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       constraints: event.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {/* Time + Memory */}
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="timeLimit"
//                     className="text-sm font-medium"
//                   >
//                     Time Limit (ms)
//                   </label>

//                   <Input
//                     id="timeLimit"
//                     type="number"
//                     value={formData.timeLimit}
//                     onChange={(event) =>
//                       setFormData({
//                         ...formData,
//                         timeLimit: event.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="memoryLimit"
//                     className="text-sm font-medium"
//                   >
//                     Memory Limit (MB)
//                   </label>

//                   <Input
//                     id="memoryLimit"
//                     type="number"
//                     value={formData.memoryLimit}
//                     onChange={(event) =>
//                       setFormData({
//                         ...formData,
//                         memoryLimit: event.target.value,
//                       })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsEditOpen(false)}
//               >
//                 Cancel
//               </Button>

//               <Button onClick={handleUpdate}>
//                 Update Problem
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }
