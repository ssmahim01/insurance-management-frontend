// "use client";

// import { useEffect } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useFieldArray } from "react-hook-form";
// import { toast } from "sonner";
// import { Package, Trash2, PlusCircle } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger,
// } from "@/components/ui/select";

// import { useUpdatePackageMutation } from "@/redux/features/package/package.api";
// import { IInsurancePackage, PlanType } from "@/types/package.types";

// // ─── Schema ───────────────────────────────────────────────────────────────────

// const planSchema = z.object({
//   type:             z.nativeEnum(PlanType),
//   durationInMonths: z.preprocess((v) => Number(v), z.number().min(1)),
//   regularPrice:     z.preprocess((v) => Number(v), z.number().min(0)),
//   discountPrice:    z.preprocess((v) => Number(v), z.number().min(0)),
// });

// const updatePackageSchema = z.object({
//   name:           z.string().min(2, "Name must be at least 2 characters"),
//   slug:           z.string().min(2).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and hyphens"),
//   description:    z.string().min(10, "Description must be at least 10 characters"),
//   coverageAmount: z.preprocess((v) => Number(v), z.number().min(1)),
//   plans:          z.array(planSchema).min(1, "At least one plan is required"),
//   benefits:       z.array(z.object({ value: z.string().min(1) })).min(1),
//   exclusions:     z.array(z.object({ value: z.string().min(1) })),
//   isActive:       z.boolean(),
// });

// type UpdatePackageFormValues = z.infer<typeof updatePackageSchema>;

// const PLAN_LABELS: Record<PlanType, string> = {
//   [PlanType.MONTHLY]:     "Monthly",
//   [PlanType.QUARTERLY]:   "Quarterly",
//   [PlanType.HALF_YEARLY]: "Half-Yearly",
//   [PlanType.YEARLY]:      "Yearly",
//   [PlanType.LIFETIME]:    "Lifetime",
// };

// const PLAN_DEFAULT_MONTHS: Record<PlanType, number> = {
//   [PlanType.MONTHLY]: 1, [PlanType.QUARTERLY]: 3,
//   [PlanType.HALF_YEARLY]: 6, [PlanType.YEARLY]: 12, [PlanType.LIFETIME]: 999,
// };

// interface UpdatePackageModalProps {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   item: IInsurancePackage;
//   onSuccess?: () => void;
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export function UpdatePackageModal({ open, onOpenChange, item, onSuccess }: UpdatePackageModalProps) {
//   const [updatePackage, { isLoading }] = useUpdatePackageMutation();

//   const {
//     register, handleSubmit, setValue, watch, control, reset,
//     formState: { errors },
//   } = useForm<UpdatePackageFormValues>({
//     resolver: zodResolver(updatePackageSchema) as any,
//   });

//   const { fields: planFields,      append: appendPlan,      remove: removePlan      } = useFieldArray({ control, name: "plans" });
//   const { fields: benefitFields,   append: appendBenefit,   remove: removeBenefit   } = useFieldArray({ control, name: "benefits" });
//   const { fields: exclusionFields, append: appendExclusion, remove: removeExclusion } = useFieldArray({ control, name: "exclusions" });

//   const watchedName     = watch("name");
//   const watchedIsActive = watch("isActive");

//   useEffect(() => {
//     if (open && item) {
//       reset({
//         name:           item.name,
//         slug:           item.slug,
//         description:    item.description,
//         coverageAmount: item.coverageAmount,
//         isActive:       item.isActive,
//         plans:          item.plans?.map((p) => ({ ...p })) ?? [],
//         benefits:       item.benefits?.map((b) => ({ value: b })) ?? [],
//         exclusions:     item.exclusions?.map((e) => ({ value: e })) ?? [],
//       });
//     }
//   }, [open, item, reset]);

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     setValue("name", val);
//     setValue("slug", val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
//   };

//   const handleClose = () => onOpenChange(false);

//   const onSubmit = async (data: UpdatePackageFormValues) => {
//     try {
//       const payload = {
//         ...data,
//         benefits:   data.benefits.map((b) => b.value),
//         exclusions: data.exclusions.map((e) => e.value),
//       };
//       await updatePackage({ id: String(item._id), data: payload }).unwrap();
//       toast.success("Package updated successfully!");
//       handleClose();
//       onSuccess?.();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update package");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else onOpenChange(true); }}>
//       <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
//         <DialogHeader className="flex flex-col items-center gap-2 pb-2">
//           <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mb-1">
//             <Package className="w-6 h-6 text-white" />
//           </div>
//           <DialogTitle className="text-xl font-bold tracking-widest uppercase">Edit Package</DialogTitle>
//           <DialogDescription className="text-[#96999A] text-sm tracking-wide">Update the package details below</DialogDescription>
//         </DialogHeader>

//         <Separator />

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

//           {/* ── Basic Info ── */}
//           <div>
//             <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Basic Information</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//               <div className="space-y-1.5">
//                 <Label htmlFor="up-name" className="text-xs font-semibold tracking-widest uppercase">Package Name <span className="text-red-500">*</span></Label>
//                 <Input id="up-name" placeholder="e.g. Basic Health Shield" value={watchedName ?? ""} onChange={handleNameChange} />
//                 {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="up-slug" className="text-xs font-semibold tracking-widest uppercase">Slug <span className="text-red-500">*</span></Label>
//                 <Input id="up-slug" placeholder="e.g. basic-health-shield" {...register("slug")} />
//                 {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
//               </div>

//               <div className="space-y-1.5 sm:col-span-2">
//                 <Label htmlFor="up-desc" className="text-xs font-semibold tracking-widest uppercase">Description <span className="text-red-500">*</span></Label>
//                 <Textarea id="up-desc" rows={3} placeholder="Description..." {...register("description")} />
//                 {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="up-coverage" className="text-xs font-semibold tracking-widest uppercase">Coverage Amount (BDT) <span className="text-red-500">*</span></Label>
//                 <Input id="up-coverage" type="number" min={0} placeholder="e.g. 500000" {...register("coverageAmount")} />
//                 {errors.coverageAmount && <p className="text-xs text-red-400">{errors.coverageAmount.message}</p>}
//               </div>

//               <div className="space-y-1.5 flex items-center gap-3 pt-5">
//                 <Switch id="up-active" checked={watchedIsActive ?? true} onCheckedChange={(v) => setValue("isActive", v)} />
//                 <Label htmlFor="up-active" className="text-sm font-medium">{watchedIsActive ? "Active" : "Inactive"}</Label>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* ── Plans ── */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Plans <span className="text-red-500">*</span></p>
//               <Button type="button" variant="outline" size="sm"
//                 onClick={() => appendPlan({ type: PlanType.MONTHLY, durationInMonths: 1, regularPrice: 0, discountPrice: 0 })}>
//                 <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Plan
//               </Button>
//             </div>

//             <div className="space-y-3">
//               {planFields.map((field, idx) => {
//                 const planType = watch(`plans.${idx}.type`);
//                 return (
//                   <div key={field.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/30">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan {idx + 1}</p>
//                       {planFields.length > 1 && (
//                         <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removePlan(idx)}>
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </Button>
//                       )}
//                     </div>
//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Type</Label>
//                         <Select
//                           value={planType}
//                           onValueChange={(v) => {
//                             setValue(`plans.${idx}.type`, v as PlanType, { shouldValidate: true });
//                             setValue(`plans.${idx}.durationInMonths`, PLAN_DEFAULT_MONTHS[v as PlanType]);
//                           }}
//                         >
//                           <SelectTrigger className="h-9 text-sm"><span>{PLAN_LABELS[planType] ?? "Select"}</span></SelectTrigger>
//                           <SelectContent>
//                             {Object.values(PlanType).map((pt) => (
//                               <SelectItem key={pt} value={pt}>{PLAN_LABELS[pt]}</SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Duration (months)</Label>
//                         <Input type="number" min={1} className="h-9" {...register(`plans.${idx}.durationInMonths`)} />
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Regular Price (৳)</Label>
//                         <Input type="number" min={0} className="h-9" {...register(`plans.${idx}.regularPrice`)} />
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Discount Price (৳)</Label>
//                         <Input type="number" min={0} className="h-9" {...register(`plans.${idx}.discountPrice`)} />
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <Separator />

//           {/* ── Benefits ── */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Benefits <span className="text-red-500">*</span></p>
//               <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit({ value: "" })}>
//                 <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
//               </Button>
//             </div>
//             <div className="space-y-2">
//               {benefitFields.map((field, idx) => (
//                 <div key={field.id} className="flex gap-2">
//                   <Input placeholder={`Benefit ${idx + 1}`} className="flex-1" {...register(`benefits.${idx}.value`)} />
//                   {benefitFields.length > 1 && (
//                     <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeBenefit(idx)}>
//                       <Trash2 className="w-3.5 h-3.5" />
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator />

//           {/* ── Exclusions ── */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
//                 Exclusions <span className="text-[#96999A] normal-case font-normal">(optional)</span>
//               </p>
//               <Button type="button" variant="outline" size="sm" onClick={() => appendExclusion({ value: "" })}>
//                 <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
//               </Button>
//             </div>
//             <div className="space-y-2">
//               {exclusionFields.map((field, idx) => (
//                 <div key={field.id} className="flex gap-2">
//                   <Input placeholder={`Exclusion ${idx + 1}`} className="flex-1" {...register(`exclusions.${idx}.value`)} />
//                   <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeExclusion(idx)}>
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </Button>
//                 </div>
//               ))}
//               {exclusionFields.length === 0 && <p className="text-xs text-slate-400 italic">No exclusions added yet.</p>}
//             </div>
//           </div>

//           {/* ── Submit ── */}
//           <Button type="submit" disabled={isLoading} className="w-full mt-2 font-bold tracking-widest uppercase disabled:opacity-60">
//             {isLoading ? (
//               <span className="flex items-center gap-2">
//                 <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Updating...
//               </span>
//             ) : (
//               <span className="flex items-center gap-2"><Package className="h-4 w-4" />Update Package</span>
//             )}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


// Version 2

// "use client";

// import { useEffect } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useFieldArray } from "react-hook-form";
// import { toast } from "sonner";
// import { Package, Trash2, PlusCircle } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger,
// } from "@/components/ui/select";

// import { useUpdatePackageMutation } from "@/redux/features/package/package.api";
// import { IInsurancePackage, PlanType } from "@/types/package.types";

// // ─── Schema ───────────────────────────────────────────────────────────────────

// const planSchema = z.object({
//   type:             z.nativeEnum(PlanType),
//   durationInMonths: z.preprocess((v) => Number(v), z.number().min(1)),
//   regularPrice:     z.preprocess((v) => Number(v), z.number().min(0)),
//   discountPrice:    z.preprocess((v) => Number(v), z.number().min(0)),
// });

// const updatePackageSchema = z.object({
//   name:           z.string().min(2, "Name must be at least 2 characters"),
//   description:    z.string().min(10, "Description must be at least 10 characters"),
//   coverageAmount: z.preprocess((v) => Number(v), z.number().min(1)),
//   plans:          z.array(planSchema).min(1, "At least one plan is required"),
//   benefits:       z.array(z.object({ value: z.string().min(1) })).min(1),
//   exclusions:     z.array(z.object({ value: z.string().min(1) })),
//   isActive:       z.boolean(),
// });

// type UpdatePackageFormValues = z.infer<typeof updatePackageSchema>;

// const PLAN_LABELS: Record<PlanType, string> = {
//   [PlanType.MONTHLY]:     "Monthly",
//   [PlanType.QUARTERLY]:   "Quarterly",
//   [PlanType.HALF_YEARLY]: "Half-Yearly",
//   [PlanType.YEARLY]:      "Yearly",
//   [PlanType.LIFETIME]:    "Lifetime",
// };

// const PLAN_DEFAULT_MONTHS: Record<PlanType, number> = {
//   [PlanType.MONTHLY]: 1, [PlanType.QUARTERLY]: 3,
//   [PlanType.HALF_YEARLY]: 6, [PlanType.YEARLY]: 12, [PlanType.LIFETIME]: 999,
// };

// interface UpdatePackageModalProps {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   item: IInsurancePackage;
//   onSuccess?: () => void;
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export function UpdatePackageModal({ open, onOpenChange, item, onSuccess }: UpdatePackageModalProps) {
//   const [updatePackage, { isLoading }] = useUpdatePackageMutation();

//   const {
//     register, handleSubmit, setValue, watch, control, reset,
//     formState: { errors },
//   } = useForm<UpdatePackageFormValues>({
//     resolver: zodResolver(updatePackageSchema) as any,
//   });

//   const { fields: planFields,      append: appendPlan,      remove: removePlan      } = useFieldArray({ control, name: "plans" });
//   const { fields: benefitFields,   append: appendBenefit,   remove: removeBenefit   } = useFieldArray({ control, name: "benefits" });
//   const { fields: exclusionFields, append: appendExclusion, remove: removeExclusion } = useFieldArray({ control, name: "exclusions" });

//   const watchedIsActive = watch("isActive");

//   useEffect(() => {
//     if (open && item) {
//       reset({
//         name:           item.name,
//         description:    item.description,
//         coverageAmount: item.coverageAmount,
//         isActive:       item.isActive,
//         plans:          item.plans?.map((p) => ({ ...p })) ?? [],
//         benefits:       item.benefits?.map((b) => ({ value: b })) ?? [],
//         exclusions:     item.exclusions?.map((e) => ({ value: e })) ?? [],
//       });
//     }
//   }, [open, item, reset]);

//   const handleClose = () => onOpenChange(false);

//   const onSubmit = async (data: UpdatePackageFormValues) => {
//     try {
//       const payload = {
//         ...data,
//         benefits:   data.benefits.map((b) => b.value),
//         exclusions: data.exclusions.map((e) => e.value),
//         // Note: slug is intentionally NOT sent — backend manages it automatically.
//       };
//       await updatePackage({ id: String(item._id), data: payload }).unwrap();
//       toast.success("Package updated successfully!");
//       handleClose();
//       onSuccess?.();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update package");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else onOpenChange(true); }}>
//       <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
//         <DialogHeader className="flex flex-col items-center gap-2 pb-2">
//           <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mb-1">
//             <Package className="w-6 h-6 text-white" />
//           </div>
//           <DialogTitle className="text-xl font-bold tracking-widest uppercase">Edit Package</DialogTitle>
//           <DialogDescription className="text-[#96999A] text-sm tracking-wide">Update the package details below</DialogDescription>
//         </DialogHeader>

//         <Separator />

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

//           {/* ── Basic Info ── */}
//           <div>
//             <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Basic Information</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//               <div className="space-y-1.5 sm:col-span-2">
//                 <Label htmlFor="up-name" className="text-xs font-semibold tracking-widest uppercase">Package Name <span className="text-red-500">*</span></Label>
//                 <Input id="up-name" placeholder="e.g. Basic Health Shield" {...register("name")} />
//                 {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
//               </div>

//               <div className="space-y-1.5 sm:col-span-2">
//                 <Label htmlFor="up-desc" className="text-xs font-semibold tracking-widest uppercase">Description <span className="text-red-500">*</span></Label>
//                 <Textarea id="up-desc" rows={3} placeholder="Description..." {...register("description")} />
//                 {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="up-coverage" className="text-xs font-semibold tracking-widest uppercase">Coverage Amount (BDT) <span className="text-red-500">*</span></Label>
//                 <Input id="up-coverage" type="number" min={0} placeholder="e.g. 500000" {...register("coverageAmount")} />
//                 {errors.coverageAmount && <p className="text-xs text-red-400">{errors.coverageAmount.message}</p>}
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="up-active" className="text-xs font-semibold tracking-widest uppercase">Status</Label>
//                 <Select
//                   value={watchedIsActive ? "active" : "inactive"}
//                   onValueChange={(v) => setValue("isActive", v === "active")}
//                 >
//                   <SelectTrigger id="up-active" className="h-9 text-sm">
//                     <span>{watchedIsActive ? "Active" : "Inactive"}</span>
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="inactive">Inactive</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* ── Plans ── */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Plans <span className="text-red-500">*</span></p>
//               <Button type="button" variant="outline" size="sm"
//                 onClick={() => appendPlan({ type: PlanType.MONTHLY, durationInMonths: 1, regularPrice: 0, discountPrice: 0 })}>
//                 <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Plan
//               </Button>
//             </div>

//             <div className="space-y-3">
//               {planFields.map((field, idx) => {
//                 const planType = watch(`plans.${idx}.type`);
//                 return (
//                   <div key={field.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/30">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan {idx + 1}</p>
//                       {planFields.length > 1 && (
//                         <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removePlan(idx)}>
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </Button>
//                       )}
//                     </div>
//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Type</Label>
//                         <Select
//                           value={planType}
//                           onValueChange={(v) => {
//                             setValue(`plans.${idx}.type`, v as PlanType, { shouldValidate: true });
//                             setValue(`plans.${idx}.durationInMonths`, PLAN_DEFAULT_MONTHS[v as PlanType]);
//                           }}
//                         >
//                           <SelectTrigger className="h-9 text-sm"><span>{PLAN_LABELS[planType] ?? "Select"}</span></SelectTrigger>
//                           <SelectContent>
//                             {Object.values(PlanType).map((pt) => (
//                               <SelectItem key={pt} value={pt}>{PLAN_LABELS[pt]}</SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Duration (months)</Label>
//                         <Input type="number" min={1} className="h-9" {...register(`plans.${idx}.durationInMonths`)} />
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Regular Price (৳)</Label>
//                         <Input type="number" min={0} className="h-9" {...register(`plans.${idx}.regularPrice`)} />
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label className="text-xs font-semibold tracking-widest uppercase">Discount Price (৳)</Label>
//                         <Input type="number" min={0} className="h-9" {...register(`plans.${idx}.discountPrice`)} />
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <Separator />

//           {/* ── Benefits ── */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Benefits <span className="text-red-500">*</span></p>
//               <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit({ value: "" })}>
//                 <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
//               </Button>
//             </div>
//             <div className="space-y-2">
//               {benefitFields.map((field, idx) => (
//                 <div key={field.id} className="flex gap-2">
//                   <Input placeholder={`Benefit ${idx + 1}`} className="flex-1" {...register(`benefits.${idx}.value`)} />
//                   {benefitFields.length > 1 && (
//                     <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeBenefit(idx)}>
//                       <Trash2 className="w-3.5 h-3.5" />
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator />

//           {/* ── Exclusions ── */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
//                 Exclusions <span className="text-[#96999A] normal-case font-normal">(optional)</span>
//               </p>
//               <Button type="button" variant="outline" size="sm" onClick={() => appendExclusion({ value: "" })}>
//                 <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
//               </Button>
//             </div>
//             <div className="space-y-2">
//               {exclusionFields.map((field, idx) => (
//                 <div key={field.id} className="flex gap-2">
//                   <Input placeholder={`Exclusion ${idx + 1}`} className="flex-1" {...register(`exclusions.${idx}.value`)} />
//                   <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeExclusion(idx)}>
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </Button>
//                 </div>
//               ))}
//               {exclusionFields.length === 0 && <p className="text-xs text-slate-400 italic">No exclusions added yet.</p>}
//             </div>
//           </div>

//           {/* ── Submit ── */}
//           <Button type="submit" disabled={isLoading} className="w-full mt-2 font-bold tracking-widest uppercase disabled:opacity-60">
//             {isLoading ? (
//               <span className="flex items-center gap-2">
//                 <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Updating...
//               </span>
//             ) : (
//               <span className="flex items-center gap-2"><Package className="h-4 w-4" />Update Package</span>
//             )}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { Package, Trash2, PlusCircle, ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from "@/components/ui/select";

import { useUpdatePackageMutation } from "@/redux/features/package/package.api";
import { IInsurancePackage, PlanType } from "@/types/package.types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const planSchema = z.object({
  type:             z.nativeEnum(PlanType),
  durationInMonths: z.preprocess((v) => Number(v), z.number().min(1)),
  regularPrice:     z.preprocess((v) => Number(v), z.number().min(0)),
  discountPrice:    z.preprocess((v) => Number(v), z.number().min(0)),
});

const updatePackageSchema = z.object({
  name:           z.string().min(2, "Name must be at least 2 characters"),
  description:    z.string().min(10, "Description must be at least 10 characters"),
  coverageAmount: z.preprocess((v) => Number(v), z.number().min(1)),
  plans:          z.array(planSchema).min(1, "At least one plan is required"),
  benefits:       z.array(z.object({ value: z.string().min(1) })).min(1),
  exclusions:     z.array(z.object({ value: z.string().min(1) })),
  isActive:       z.boolean(),
});

type UpdatePackageFormValues = z.infer<typeof updatePackageSchema>;

const PLAN_LABELS: Record<PlanType, string> = {
  [PlanType.MONTHLY]:     "Monthly",
  [PlanType.QUARTERLY]:   "Quarterly",
  [PlanType.HALF_YEARLY]: "Half-Yearly",
  [PlanType.YEARLY]:      "Yearly",
  [PlanType.LIFETIME]:    "Lifetime",
};

const PLAN_DEFAULT_MONTHS: Record<PlanType, number> = {
  [PlanType.MONTHLY]: 1, [PlanType.QUARTERLY]: 3,
  [PlanType.HALF_YEARLY]: 6, [PlanType.YEARLY]: 12, [PlanType.LIFETIME]: 999,
};

interface UpdatePackageModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: IInsurancePackage;
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function UpdatePackageModal({ open, onOpenChange, item, onSuccess }: UpdatePackageModalProps) {
  const [updatePackage, { isLoading }] = useUpdatePackageMutation();

  // Feature image state
  const [imageFile, setImageFile]         = useState<File | null>(null);
  const [imagePreview, setImagePreview]   = useState<string | null>(null);
  const fileInputRef                      = useRef<HTMLInputElement>(null);

  const {
    register, handleSubmit, setValue, watch, control, reset,
    formState: { errors },
  } = useForm<UpdatePackageFormValues>({
    resolver: zodResolver(updatePackageSchema) as any,
  });

  const { fields: planFields,      append: appendPlan,      remove: removePlan      } = useFieldArray({ control, name: "plans" });
  const { fields: benefitFields,   append: appendBenefit,   remove: removeBenefit   } = useFieldArray({ control, name: "benefits" });
  const { fields: exclusionFields, append: appendExclusion, remove: removeExclusion } = useFieldArray({ control, name: "exclusions" });

  const watchedIsActive = watch("isActive");

  useEffect(() => {
    if (open && item) {
      reset({
        name:           item.name,
        description:    item.description,
        coverageAmount: item.coverageAmount,
        isActive:       item.isActive,
        plans:          item.plans?.map((p) => ({ ...p })) ?? [],
        benefits:       item.benefits?.map((b) => ({ value: b })) ?? [],
        exclusions:     item.exclusions?.map((e) => ({ value: e })) ?? [],
      });
      // Show existing image as preview (no new file selected yet)
      setImageFile(null);
      setImagePreview((item as any).featureImage ?? null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [open, item, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    handleRemoveImage();
    onOpenChange(false);
  };

 const onSubmit = async (data: UpdatePackageFormValues) => {
  try {
    const formData = new FormData();

    if (imageFile) formData.append("featureImage", imageFile);

    const payload = {
      name:           data.name,
      description:    data.description,
      coverageAmount: data.coverageAmount,
      plans:          data.plans,
      benefits:       data.benefits.map((b) => b.value),
      exclusions:     data.exclusions.map((e) => e.value),
      isActive:       data.isActive,
    };

    formData.append("data", JSON.stringify(payload));

    await updatePackage({ id: String(item._id), data: formData }).unwrap();
    toast.success("Package updated successfully!");
    handleClose();
    onSuccess?.();
  } catch (err: any) {
    toast.error(err?.data?.message || "Failed to update package");
  }
};

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else onOpenChange(true); }}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mb-1">
            <Package className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">Edit Package</DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">Update the package details below</DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

          {/* ── Basic Info ── */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Basic Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="up-name" className="text-xs font-semibold tracking-widest uppercase">Package Name <span className="text-red-500">*</span></Label>
                <Input id="up-name" placeholder="e.g. Basic Health Shield" {...register("name")} />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="up-desc" className="text-xs font-semibold tracking-widest uppercase">Description <span className="text-red-500">*</span></Label>
                <Textarea id="up-desc" rows={3} placeholder="Description..." {...register("description")} />
                {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="up-coverage" className="text-xs font-semibold tracking-widest uppercase">Coverage Amount (BDT) <span className="text-red-500">*</span></Label>
                <Input id="up-coverage" type="number" min={0} placeholder="e.g. 500000" {...register("coverageAmount")} />
                {errors.coverageAmount && <p className="text-xs text-red-400">{errors.coverageAmount.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="up-active" className="text-xs font-semibold tracking-widest uppercase">Status</Label>
                <Select
                  value={watchedIsActive ? "active" : "inactive"}
                  onValueChange={(v) => setValue("isActive", v === "active")}
                >
                  <SelectTrigger id="up-active" className="h-9 text-sm">
                    <span>{watchedIsActive ? "Active" : "Inactive"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Feature Image */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-semibold tracking-widest uppercase">
                  Feature Image <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                </Label>
                {imagePreview ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                    <img src={imagePreview} alt="Feature preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {/* Show "Change" option when existing image is shown */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-black/50 hover:bg-black/70 text-white text-[10px] font-semibold tracking-wide transition-colors"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors flex flex-col items-center justify-center gap-2 text-slate-400"
                  >
                    <ImagePlus className="w-6 h-6" />
                    <span className="text-xs font-medium">Click to upload image</span>
                    <span className="text-[10px]">PNG, JPG, WEBP up to 5MB</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* ── Plans ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Plans <span className="text-red-500">*</span></p>
              <Button type="button" variant="outline" size="sm"
                onClick={() => appendPlan({ type: PlanType.MONTHLY, durationInMonths: 1, regularPrice: 0, discountPrice: 0 })}>
                <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Plan
              </Button>
            </div>

            <div className="space-y-3">
              {planFields.map((field, idx) => {
                const planType = watch(`plans.${idx}.type`);
                return (
                  <div key={field.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan {idx + 1}</p>
                      {planFields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removePlan(idx)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold tracking-widest uppercase">Type</Label>
                        <Select
                          value={planType}
                          onValueChange={(v) => {
                            setValue(`plans.${idx}.type`, v as PlanType, { shouldValidate: true });
                            setValue(`plans.${idx}.durationInMonths`, PLAN_DEFAULT_MONTHS[v as PlanType]);
                          }}
                        >
                          <SelectTrigger className="h-9 text-sm"><span>{PLAN_LABELS[planType] ?? "Select"}</span></SelectTrigger>
                          <SelectContent>
                            {Object.values(PlanType).map((pt) => (
                              <SelectItem key={pt} value={pt}>{PLAN_LABELS[pt]}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold tracking-widest uppercase">Duration (months)</Label>
                        <Input type="number" min={1} className="h-9" {...register(`plans.${idx}.durationInMonths`)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold tracking-widest uppercase">Regular Price (৳)</Label>
                        <Input type="number" min={0} className="h-9" {...register(`plans.${idx}.regularPrice`)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold tracking-widest uppercase">Discount Price (৳)</Label>
                        <Input type="number" min={0} className="h-9" {...register(`plans.${idx}.discountPrice`)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* ── Benefits ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Benefits <span className="text-red-500">*</span></p>
              <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit({ value: "" })}>
                <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {benefitFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2">
                  <Input placeholder={`Benefit ${idx + 1}`} className="flex-1" {...register(`benefits.${idx}.value`)} />
                  {benefitFields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeBenefit(idx)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* ── Exclusions ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                Exclusions <span className="text-[#96999A] normal-case font-normal">(optional)</span>
              </p>
              <Button type="button" variant="outline" size="sm" onClick={() => appendExclusion({ value: "" })}>
                <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {exclusionFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2">
                  <Input placeholder={`Exclusion ${idx + 1}`} className="flex-1" {...register(`exclusions.${idx}.value`)} />
                  <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeExclusion(idx)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              {exclusionFields.length === 0 && <p className="text-xs text-slate-400 italic">No exclusions added yet.</p>}
            </div>
          </div>

          {/* ── Submit ── */}
          <Button type="submit" disabled={isLoading} className="w-full mt-2 font-bold tracking-widest uppercase disabled:opacity-60">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2"><Package className="h-4 w-4" />Update Package</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}