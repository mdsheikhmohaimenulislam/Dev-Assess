// "use client";

// import { useForm } from "@tanstack/react-form";
// import { z } from "zod";

// import {
//   useCreateCandidate,
//   useUpdateCandidate,
// } from "@/components/hooks/candidate.hook";



// import { toast } from "@/components/ui/toast";

// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Spinner } from "@/components/ui/spinner";
// import { Candidate, CreateCandidatePayload } from "@/api/candidate.api";

// const candidateSchema = z.object({
//   phone: z
//     .string()
//     .trim()
//     .min(11, "Phone number must be at least 11 characters"),

//   bio: z
//     .string()
//     .trim()
//     .max(500, "Bio must be less than 500 characters"),

//   githubUrl: z
//     .string()
//     .trim()
//     .url("Enter a valid GitHub URL")
//     .or(z.literal("")),

//   linkedinUrl: z
//     .string()
//     .trim()
//     .url("Enter a valid LinkedIn URL")
//     .or(z.literal("")),

//   resumeUrl: z
//     .string()
//     .trim()
//     .url("Enter a valid resume URL")
//     .or(z.literal("")),
// });

// interface CandidateProfileFormProps {
//   candidate?: Candidate;
//   onSuccess?: () => void;
// }

// export default function CandidateProfileForm({
//   candidate,
//   onSuccess,
// }: CandidateProfileFormProps) {
//   const createCandidate = useCreateCandidate();
//   const updateCandidate = useUpdateCandidate();

//   const isEditMode = Boolean(candidate);

//   const form = useForm({
//     defaultValues: {
//       phone: candidate?.phone ?? "",
//       bio: candidate?.bio ?? "",
//       githubUrl: candidate?.githubUrl ?? "",
//       linkedinUrl: candidate?.linkedinUrl ?? "",
//       resumeUrl: candidate?.resumeUrl ?? "",
//     },

//     validators: {
//       onSubmit: candidateSchema,
//     },

//     onSubmit: ({ value }) => {
//       const payload: CreateCandidatePayload = {
//         phone: value.phone,
//         bio: value.bio || undefined,
//         githubUrl: value.githubUrl || undefined,
//         linkedinUrl: value.linkedinUrl || undefined,
//         resumeUrl: value.resumeUrl || undefined,
//       };

//       if (isEditMode && candidate) {
//         updateCandidate.mutate(
//           {
//             id: candidate.id,
//             payload,
//           },
//           {
//             onSuccess: () => {
//               toast.add({
//                 title: "Profile Updated",
//                 description:
//                   "Your candidate profile has been updated successfully.",
//                 type: "success",
//               });

//               onSuccess?.();
//             },

//             onError: (error) => {
//               toast.add({
//                 title: "Update Failed",
//                 description:
//                   error.message ||
//                   "Failed to update candidate profile.",
//                 type: "error",
//               });
//             },
//           },
//         );

//         return;
//       }

//       createCandidate.mutate(payload, {
//         onSuccess: () => {
//           toast.add({
//             title: "Profile Created",
//             description:
//               "Your candidate profile has been created successfully.",
//             type: "success",
//           });

//           onSuccess?.();
//         },

//         onError: (error) => {
//           toast.add({
//             title: "Creation Failed",
//             description:
//               error.message ||
//               "Failed to create candidate profile.",
//             type: "error",
//           });
//         },
//       });
//     },
//   });

//   const isPending =
//     createCandidate.isPending || updateCandidate.isPending;

//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault();
//         form.handleSubmit();
//       }}
//       className="space-y-6"
//     >
//       <FieldGroup>
//         {/* Phone */}
//         <form.Field name="phone">
//           {(field) => {
//             const isInvalid =
//               field.state.meta.isTouched &&
//               !field.state.meta.isValid;

//             return (
//               <Field data-invalid={isInvalid}>
//                 <FieldLabel htmlFor={field.name}>
//                   Phone Number
//                 </FieldLabel>

//                 <Input
//                   id={field.name}
//                   name={field.name}
//                   type="tel"
//                   placeholder="01712345678"
//                   value={field.state.value}
//                   onChange={(event) =>
//                     field.handleChange(event.target.value)
//                   }
//                   onBlur={field.handleBlur}
//                   autoComplete="tel"
//                   aria-invalid={isInvalid}
//                 />

//                 {isInvalid && (
//                   <FieldError
//                     errors={field.state.meta.errors}
//                   />
//                 )}
//               </Field>
//             );
//           }}
//         </form.Field>

//         {/* Bio */}
//         <form.Field name="bio">
//           {(field) => {
//             const isInvalid =
//               field.state.meta.isTouched &&
//               !field.state.meta.isValid;

//             return (
//               <Field data-invalid={isInvalid}>
//                 <FieldLabel htmlFor={field.name}>
//                   Bio
//                 </FieldLabel>

//                 <Textarea
//                   id={field.name}
//                   name={field.name}
//                   placeholder="Tell us about yourself..."
//                   value={field.state.value}
//                   onChange={(event) =>
//                     field.handleChange(event.target.value)
//                   }
//                   onBlur={field.handleBlur}
//                   aria-invalid={isInvalid}
//                   className="min-h-28 resize-none"
//                 />

//                 {isInvalid && (
//                   <FieldError
//                     errors={field.state.meta.errors}
//                   />
//                 )}
//               </Field>
//             );
//           }}
//         </form.Field>

//         {/* GitHub + LinkedIn */}
//         <div className="grid gap-6 md:grid-cols-2">
//           <form.Field name="githubUrl">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched &&
//                 !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>
//                     GitHub URL
//                   </FieldLabel>

//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     type="url"
//                     placeholder="https://github.com/username"
//                     value={field.state.value}
//                     onChange={(event) =>
//                       field.handleChange(event.target.value)
//                     }
//                     onBlur={field.handleBlur}
//                     aria-invalid={isInvalid}
//                   />

//                   {isInvalid && (
//                     <FieldError
//                       errors={field.state.meta.errors}
//                     />
//                   )}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <form.Field name="linkedinUrl">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched &&
//                 !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>
//                     LinkedIn URL
//                   </FieldLabel>

//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     type="url"
//                     placeholder="https://linkedin.com/in/username"
//                     value={field.state.value}
//                     onChange={(event) =>
//                       field.handleChange(event.target.value)
//                     }
//                     onBlur={field.handleBlur}
//                     aria-invalid={isInvalid}
//                   />

//                   {isInvalid && (
//                     <FieldError
//                       errors={field.state.meta.errors}
//                     />
//                   )}
//                 </Field>
//               );
//             }}
//           </form.Field>
//         </div>

//         {/* Resume */}
//         <form.Field name="resumeUrl">
//           {(field) => {
//             const isInvalid =
//               field.state.meta.isTouched &&
//               !field.state.meta.isValid;

//             return (
//               <Field data-invalid={isInvalid}>
//                 <FieldLabel htmlFor={field.name}>
//                   Resume URL
//                 </FieldLabel>

//                 <Input
//                   id={field.name}
//                   name={field.name}
//                   type="url"
//                   placeholder="https://example.com/resume.pdf"
//                   value={field.state.value}
//                   onChange={(event) =>
//                     field.handleChange(event.target.value)
//                   }
//                   onBlur={field.handleBlur}
//                   aria-invalid={isInvalid}
//                 />

//                 {isInvalid && (
//                   <FieldError
//                     errors={field.state.meta.errors}
//                   />
//                 )}
//               </Field>
//             );
//           }}
//         </form.Field>
//       </FieldGroup>

//       <div className="flex justify-end gap-3">
//         <Button type="submit" disabled={isPending}>
//           {isPending ? (
//             <>
//               <Spinner />
//               {isEditMode ? "Updating..." : "Creating..."}
//             </>
//           ) : isEditMode ? (
//             "Update Profile"
//           ) : (
//             "Create Profile"
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// }