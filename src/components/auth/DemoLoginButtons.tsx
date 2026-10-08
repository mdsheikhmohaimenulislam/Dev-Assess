// "use client";

// import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { useLogin } from "../hooks/auth.hook";

// const demoAccounts = [
//   {
//     role: "CANDIDATE",
//     label: "Candidate Account",
//     email: "user@gmail.com",
//     password: "Candidate123456@",
//     badge: "Candidate",
//     color: "blue",
//     dashboard: "/candidate/dashboard",
//   },
//   {
//     role: "COMPANY",
//     label: "Company Account",
//     email: "company@gmail.com",
//     password: "Company123456@",
//     badge: "Company",
//     color: "green",
//     dashboard: "/company/dashboard",
//   },
//   {
//     role: "ADMIN",
//     label: "Management Account",
//     email: "admin@gmail.com",
//     password: "Admin123456@",
//     badge: "Admin",
//     color: "purple",
//     dashboard: "/admin/dashboard",
//   },
// ] as const;

// export default function FillDemoAccount() {
//   const router = useRouter();

//   const { mutate: login, isPending } = useLogin();

//   const handleDemoLogin = (
//     account: (typeof demoAccounts)[number],
//   ) => {
//     login(
//       {
//         email: account.email,
//         password: account.password,
//       },
//       {
//         onSuccess: () => {
//           toast.success(`${account.role} login successful`);

//           router.push(account.dashboard);
//         },

//         onError: (error) => {
//           console.error("Demo login failed:", error);

//           toast.error(`${account.role} login failed`);
//         },
//       },
//     );
//   };

//   return (
//     <div className="mt-8 rounded-3xl border bg-background p-5 shadow-sm">
//       <div className="text-center">
//         <h3 className="text-lg font-bold text-foreground">
//           Quick Demo Access
//         </h3>

//         <p className="mt-1 text-sm text-muted-foreground">
//           Try different roles instantly
//         </p>
//       </div>

//       <div className="mt-5 space-y-3">
//         {demoAccounts.map((account) => (
//           <button
//             key={account.role}
//             type="button"
//             disabled={isPending}
//             onClick={() => handleDemoLogin(account)}
//             className="group w-full rounded-2xl border bg-background p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <div className="flex cursor-pointer items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`flex h-11 w-11 items-center justify-center rounded-xl ${
//                     account.color === "blue"
//                       ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
//                       : account.color === "green"
//                         ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
//                         : "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
//                   }`}
//                 >
//                   <ShieldCheck className="h-5 w-5" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-foreground">
//                     {account.role}
//                   </p>

//                   <p className="text-sm text-muted-foreground">
//                     {account.label}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
//                   {account.badge}
//                 </span>

//                 <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>

//       <div className="mt-5 grid grid-cols-2 gap-3">
//         <div className="rounded-2xl border bg-muted/30 p-4 text-center">
//           <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400">
//             <ShieldCheck className="h-4 w-4" />
//           </div>

//           <p className="mt-2 text-sm font-semibold text-foreground">
//             Secure Login
//           </p>

//           <p className="mt-1 text-xs text-muted-foreground">
//             Protected authentication
//           </p>
//         </div>

//         <div className="rounded-2xl border bg-muted/30 p-4 text-center">
//           <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400">
//             <Zap className="h-4 w-4" />
//           </div>

//           <p className="mt-2 text-sm font-semibold text-foreground">
//             Fast Access
//           </p>

//           <p className="mt-1 text-xs text-muted-foreground">
//             Instant dashboard entry
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }