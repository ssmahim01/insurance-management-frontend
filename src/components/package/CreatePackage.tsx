
// "use client";

// import { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useFieldArray } from "react-hook-form";
// import { toast } from "sonner";
// import { Plus, Package, Trash2, PlusCircle } from "lucide-react";

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

// import { useCreatePackageMutation } from "@/redux/features/package/package.api";
// import { useGetAllPartnersQuery } from "@/redux/features/partner/partner.api";
// import { PlanType } from "@/types/package.types";

// // ─── Schema ───────────────────────────────────────────────────────────────────

// const planSchema = z.object({
//   type:             z.nativeEnum(PlanType, { error: "Plan type is required" }),
//   durationInMonths: z.preprocess((v) => Number(v), z.number().min(1, "Must be at least 1 month")),
//   regularPrice:     z.preprocess((v) => Number(v), z.number().min(0, "Must be 0 or more")),
//   discountPrice:    z.preprocess((v) => Number(v), z.number().min(0, "Must be 0 or more")),
// });

// const partnerDiscountSchema = z.object({
//   partner:         z.string().min(1, "Partner ID is required"),
//   discountPercent: z.preprocess((v) => Number(v), z.number().min(0).max(100, "Must be between 0–100")),
//   isActive:        z.boolean().default(true),
// });

// const createPackageSchema = z.object({
//   name:             z.string().min(2, "Name must be at least 2 characters"),
//   description:      z.string().min(10, "Description must be at least 10 characters"),
//   coverageAmount:   z.preprocess((v) => Number(v), z.number().min(1, "Coverage amount is required")),
//   plans:            z.array(planSchema).min(1, "At least one plan is required"),
//   benefits:         z.array(z.object({ value: z.string().min(1, "Benefit cannot be empty") })).min(1, "At least one benefit is required"),
//   exclusions:       z.array(z.object({ value: z.string().min(1, "Exclusion cannot be empty") })),
//   partnerDiscounts: z.array(partnerDiscountSchema),
//   isActive:         z.boolean().default(true),
//   isDeleted:        z.boolean().default(false),
// });

// type CreatePackageFormValues = z.infer<typeof createPackageSchema>;

// const PLAN_LABELS: Record<PlanType, string> = {
//   [PlanType.MONTHLY]:     "Monthly",
//   [PlanType.QUARTERLY]:   "Quarterly",
//   [PlanType.HALF_YEARLY]: "Half-Yearly",
//   [PlanType.YEARLY]:      "Yearly",
//   [PlanType.LIFETIME]:    "Lifetime",
// };

// const PLAN_DEFAULT_MONTHS: Record<PlanType, number> = {
//   [PlanType.MONTHLY]:     1,
//   [PlanType.QUARTERLY]:   3,
//   [PlanType.HALF_YEARLY]: 6,
//   [PlanType.YEARLY]:      12,
//   [PlanType.LIFETIME]:    5000,
// };

// interface CreatePackageModalProps { onSuccess?: () => void; }

// // ─── Component ────────────────────────────────────────────────────────────────

// export function CreatePackageModal({ onSuccess }: CreatePackageModalProps) {
//   const [open, setOpen] = useState(false);
//   const [createPackage, { isLoading }] = useCreatePackageMutation();

//   // Fetch all active partners — only when modal is open
//   const { data: partnersData, isLoading: isPartnersLoading } = useGetAllPartnersQuery(
//     { isActive: "true", limit: 100 },
//     { skip: !open },
//   );
//   // Response shape: { data: [...], meta: {...}, stats: {...} }
//   const partners: { _id: string; name: string; logo?: string }[]  = partnersData?.data ?? [];

//   const {
//     register, handleSubmit, setValue, watch, control,
//     formState: { errors }, reset,
//   } = useForm<CreatePackageFormValues>({
//     resolver: zodResolver(createPackageSchema) as any,
//     defaultValues: {
//       name: "", description: "", coverageAmount: undefined,
//       plans: [{ type: PlanType.MONTHLY, durationInMonths: 1, regularPrice: 0, discountPrice: 0 }],
//       benefits:         [{ value: "" }],
//       exclusions:       [],
//       partnerDiscounts: [],
//       isActive:         true,
//       isDeleted:        false,
//     },
//   });

//   const { fields: planFields,            append: appendPlan,            remove: removePlan            } = useFieldArray({ control, name: "plans" });
//   const { fields: benefitFields,         append: appendBenefit,         remove: removeBenefit         } = useFieldArray({ control, name: "benefits" });
//   const { fields: exclusionFields,       append: appendExclusion,       remove: removeExclusion       } = useFieldArray({ control, name: "exclusions" });
//   const { fields: partnerDiscountFields, append: appendPartnerDiscount, remove: removePartnerDiscount } = useFieldArray({ control, name: "partnerDiscounts" });

//   const watchedIsActive = watch("isActive");

//   const handleClose = () => { reset(); setOpen(false); };

//   const onSubmit = async (data: CreatePackageFormValues) => {
//     try {
//       const payload = {
//         name:             data.name,
//         description:      data.description,
//         coverageAmount:   data.coverageAmount,
//         plans:            data.plans,
//         benefits:         data.benefits.map((b) => b.value),
//         exclusions:       data.exclusions.map((e) => e.value),
//         partnerDiscounts: data.partnerDiscounts,
//         isActive:         data.isActive,
//         isDeleted:        data.isDeleted,
//       };
//       await createPackage(payload).unwrap();
//       toast.success("Package created successfully!");
//       handleClose();
//       onSuccess?.();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to create package");
//     }
//   };

//   return (
//     <>
//       <Button onClick={() => setOpen(true)}>
//         <Plus className="h-4 w-4" />
//         Create Package
//       </Button>

//       <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
//         <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
//           <DialogHeader className="flex flex-col items-center gap-2 pb-2">
//             <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md mb-1">
//               <Package className="w-6 h-6 text-white" />
//             </div>
//             <DialogTitle className="text-xl font-bold tracking-widest uppercase">Create Insurance Package</DialogTitle>
//             <DialogDescription className="text-[#96999A] text-sm tracking-wide">Fill in the package details below</DialogDescription>
//           </DialogHeader>

//           <Separator />

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

//             {/* ── Basic Info ── */}
//             <div>
//               <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Basic Information</p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                 <div className="space-y-1.5 sm:col-span-2">
//                   <Label htmlFor="p-name" className="text-xs font-semibold tracking-widest uppercase">Package Name <span className="text-red-500">*</span></Label>
//                   <Input id="p-name" placeholder="e.g. Basic Health Shield" {...register("name")} />
//                   {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
//                 </div>

//                 <div className="space-y-1.5 sm:col-span-2">
//                   <Label htmlFor="p-desc" className="text-xs font-semibold tracking-widest uppercase">Description <span className="text-red-500">*</span></Label>
//                   <Textarea id="p-desc" rows={3} placeholder="Brief description of this insurance package..." {...register("description")} />
//                   {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
//                 </div>

//                 <div className="space-y-1.5">
//                   <Label htmlFor="p-coverage" className="text-xs font-semibold tracking-widest uppercase">Coverage Amount (BDT) <span className="text-red-500">*</span></Label>
//                   <Input id="p-coverage" type="number" min={0} placeholder="e.g. 1000000" {...register("coverageAmount")} />
//                   {errors.coverageAmount && <p className="text-xs text-red-400">{errors.coverageAmount.message}</p>}
//                 </div>

//                 <div className="space-y-1.5 flex items-center gap-3 pt-5">
//                   <Switch
//                     id="p-active"
//                     checked={watchedIsActive}
//                     onCheckedChange={(v) => setValue("isActive", v)}
//                   />
//                   <Label htmlFor="p-active" className="text-sm font-medium">
//                     {watchedIsActive ? "Active" : "Inactive"}
//                   </Label>
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             {/* ── Plans ── */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Plans <span className="text-red-500">*</span></p>
//                 <Button
//                   type="button" variant="outline" size="sm"
//                   onClick={() => appendPlan({ type: PlanType.MONTHLY, durationInMonths: 1, regularPrice: 0, discountPrice: 0 })}
//                 >
//                   <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Plan
//                 </Button>
//               </div>
//               {errors.plans?.root && <p className="text-xs text-red-400 mb-2">{errors.plans.root.message}</p>}

//               <div className="space-y-3">
//                 {planFields.map((field, idx) => {
//                   const planType = watch(`plans.${idx}.type`);
//                   return (
//                     <div key={field.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/30">
//                       <div className="flex items-center justify-between mb-3">
//                         <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan {idx + 1}</p>
//                         {planFields.length > 1 && (
//                           <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removePlan(idx)}>
//                             <Trash2 className="w-3.5 h-3.5" />
//                           </Button>
//                         )}
//                       </div>
//                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                         <div className="space-y-1.5 sm:col-span-1">
//                           <Label className="text-xs font-semibold tracking-widest uppercase">Type</Label>
//                           <Select
//                             value={planType}
//                             onValueChange={(v) => {
//                               setValue(`plans.${idx}.type`, v as PlanType, { shouldValidate: true });
//                               setValue(`plans.${idx}.durationInMonths`, PLAN_DEFAULT_MONTHS[v as PlanType]);
//                             }}
//                           >
//                             <SelectTrigger className="h-9 text-sm">
//                               <span>{PLAN_LABELS[planType] ?? "Select"}</span>
//                             </SelectTrigger>
//                             <SelectContent>
//                               {Object.values(PlanType).map((pt) => (
//                                 <SelectItem key={pt} value={pt}>{PLAN_LABELS[pt]}</SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                           {errors.plans?.[idx]?.type && <p className="text-xs text-red-400">{errors.plans[idx]?.type?.message}</p>}
//                         </div>

//                         <div className="space-y-1.5">
//                           <Label className="text-xs font-semibold tracking-widest uppercase">Duration (months)</Label>
//                           <Input type="number" min={1} className="h-9" {...register(`plans.${idx}.durationInMonths`)} />
//                           {errors.plans?.[idx]?.durationInMonths && <p className="text-xs text-red-400">{errors.plans[idx]?.durationInMonths?.message}</p>}
//                         </div>

//                         <div className="space-y-1.5">
//                           <Label className="text-xs font-semibold tracking-widest uppercase">Regular Price (৳)</Label>
//                           <Input type="number" min={0} className="h-9" placeholder="0" {...register(`plans.${idx}.regularPrice`)} />
//                           {errors.plans?.[idx]?.regularPrice && <p className="text-xs text-red-400">{errors.plans[idx]?.regularPrice?.message}</p>}
//                         </div>

//                         <div className="space-y-1.5">
//                           <Label className="text-xs font-semibold tracking-widest uppercase">Discount Price (৳)</Label>
//                           <Input type="number" min={0} className="h-9" placeholder="0" {...register(`plans.${idx}.discountPrice`)} />
//                           {errors.plans?.[idx]?.discountPrice && <p className="text-xs text-red-400">{errors.plans[idx]?.discountPrice?.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <Separator />

//             {/* ── Benefits ── */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Benefits <span className="text-red-500">*</span></p>
//                 <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit({ value: "" })}>
//                   <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
//                 </Button>
//               </div>
//               {errors.benefits?.root && <p className="text-xs text-red-400 mb-2">{errors.benefits.root.message}</p>}
//               <div className="space-y-2">
//                 {benefitFields.map((field, idx) => (
//                   <div key={field.id} className="flex gap-2">
//                     <Input placeholder={`Benefit ${idx + 1}`} className="flex-1" {...register(`benefits.${idx}.value`)} />
//                     {benefitFields.length > 1 && (
//                       <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeBenefit(idx)}>
//                         <Trash2 className="w-3.5 h-3.5" />
//                       </Button>
//                     )}
//                     {errors.benefits?.[idx]?.value && <p className="text-xs text-red-400">{errors.benefits[idx]?.value?.message}</p>}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Separator />

//             {/* ── Exclusions ── */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
//                   Exclusions <span className="text-[#96999A] normal-case font-normal">(optional)</span>
//                 </p>
//                 <Button type="button" variant="outline" size="sm" onClick={() => appendExclusion({ value: "" })}>
//                   <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {exclusionFields.map((field, idx) => (
//                   <div key={field.id} className="flex gap-2">
//                     <Input placeholder={`Exclusion ${idx + 1}`} className="flex-1" {...register(`exclusions.${idx}.value`)} />
//                     <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeExclusion(idx)}>
//                       <Trash2 className="w-3.5 h-3.5" />
//                     </Button>
//                   </div>
//                 ))}
//                 {exclusionFields.length === 0 && (
//                   <p className="text-xs text-slate-400 italic">No exclusions added yet.</p>
//                 )}
//               </div>
//             </div>

//             <Separator />

//             {/* ── Partner Discounts ── */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
//                   Partner Discounts <span className="text-[#96999A] normal-case font-normal">(optional)</span>
//                 </p>
//                 <Button
//                   type="button" variant="outline" size="sm"
//                   onClick={() => appendPartnerDiscount({ partner: "", discountPercent: 0, isActive: true })}
//                 >
//                   <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
//                 </Button>
//               </div>
//               <div className="space-y-3">
//                 {partnerDiscountFields.map((field, idx) => {
//                   const isPartnerActive = watch(`partnerDiscounts.${idx}.isActive`);
//                   return (
//                     <div key={field.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/30">
//                       <div className="flex items-center justify-between mb-3">
//                         <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Partner {idx + 1}</p>
//                         <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removePartnerDiscount(idx)}>
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </Button>
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                         <div className="space-y-1.5 sm:col-span-1">
//                           <Label className="text-xs font-semibold tracking-widest uppercase">Partner</Label>
//                           <Select
//                             value={watch(`partnerDiscounts.${idx}.partner`)}
//                             onValueChange={(v) => setValue(`partnerDiscounts.${idx}.partner`, v as any, { shouldValidate: true })}
//                           >
//                             <SelectTrigger className="h-9 text-sm">
//                               {isPartnersLoading ? (
//                                 <span className="text-slate-400">Loading...</span>
//                               ) : (
//                                 <span className="truncate">
//                                   {partners.find((p) => p._id === watch(`partnerDiscounts.${idx}.partner`))?.name ?? "Select partner"}
//                                 </span>
//                               )}
//                             </SelectTrigger>
//                             <SelectContent>
//                               {partners.length === 0 && !isPartnersLoading && (
//                                 <div className="px-3 py-4 text-center text-xs text-slate-400">No active partners found</div>
//                               )}
//                               {partners.map((partner) => (
//                                 <SelectItem key={partner._id} value={partner._id}>
//                                   <div className="flex items-center gap-2">
//                                     {partner.logo ? (
//                                       <img
//                                         src={partner.logo}
//                                         alt={partner.name}
//                                         className="w-5 h-5 rounded-full object-cover shrink-0 border border-slate-200"
//                                         onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
//                                       />
//                                     ) : (
//                                       <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 flex items-center justify-center text-[9px] font-bold text-slate-500 uppercase">
//                                         {partner.name.charAt(0)}
//                                       </div>
//                                     )}
//                                     <span className="truncate">{partner.name}</span>
//                                   </div>
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                           {errors.partnerDiscounts?.[idx]?.partner && (
//                             <p className="text-xs text-red-400">{errors.partnerDiscounts[idx]?.partner?.message}</p>
//                           )}
//                         </div>
//                         <div className="space-y-1.5">
//                           <Label className="text-xs font-semibold tracking-widest uppercase">Discount (%)</Label>
//                           <Input type="number" min={0} max={100} className="h-9" placeholder="e.g. 10" {...register(`partnerDiscounts.${idx}.discountPercent`)} />
//                           {errors.partnerDiscounts?.[idx]?.discountPercent && (
//                             <p className="text-xs text-red-400">{errors.partnerDiscounts[idx]?.discountPercent?.message}</p>
//                           )}
//                         </div>
//                         <div className="space-y-1.5 flex items-center gap-3 pt-5">
//                           <Switch
//                             id={`pd-active-${idx}`}
//                             checked={isPartnerActive}
//                             onCheckedChange={(v) => setValue(`partnerDiscounts.${idx}.isActive`, v)}
//                           />
//                           <Label htmlFor={`pd-active-${idx}`} className="text-sm font-medium">
//                             {isPartnerActive ? "Active" : "Inactive"}
//                           </Label>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 {partnerDiscountFields.length === 0 && (
//                   <p className="text-xs text-slate-400 italic">No partner discounts added yet.</p>
//                 )}
//               </div>
//             </div>

//             {/* ── Submit ── */}
//             <Button type="submit" disabled={isLoading} className="w-full mt-2 font-bold tracking-widest uppercase disabled:opacity-60">
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
//                   Creating...
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2"><Package className="h-4 w-4" />Create Package</span>
//               )}
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Package, Trash2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from "@/components/ui/select";

import { useCreatePackageMutation } from "@/redux/features/package/package.api";
import { useGetAllPartnersQuery } from "@/redux/features/partner/partner.api";
import { PlanType } from "@/types/package.types";
import { IPartner } from "@/types/partner.types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const planSchema = z.object({
  type:             z.nativeEnum(PlanType, { error: "Plan type is required" }),
  durationInMonths: z.preprocess((v) => Number(v), z.number().min(1, "Must be at least 1 month")),
  regularPrice:     z.preprocess((v) => Number(v), z.number().min(0, "Must be 0 or more")),
  discountPrice:    z.preprocess((v) => Number(v), z.number().min(0, "Must be 0 or more")),
});

const partnerDiscountSchema = z.object({
  partner:         z.string().min(1, "Partner ID is required"),
  discountPercent: z.preprocess((v) => Number(v), z.number().min(0).max(100, "Must be between 0–100")),
  isActive:        z.boolean().default(true),
});

const createPackageSchema = z.object({
  name:             z.string().min(2, "Name must be at least 2 characters"),
  description:      z.string().min(10, "Description must be at least 10 characters"),
  coverageAmount:   z.preprocess((v) => Number(v), z.number().min(1, "Coverage amount is required")),
  plans:            z.array(planSchema).min(1, "At least one plan is required"),
  benefits:         z.array(z.object({ value: z.string().min(1, "Benefit cannot be empty") })).min(1, "At least one benefit is required"),
  exclusions:       z.array(z.object({ value: z.string().min(1, "Exclusion cannot be empty") })),
  partnerDiscounts: z.array(partnerDiscountSchema),
  isActive:         z.boolean().default(true),
  isDeleted:        z.boolean().default(false),
});

type CreatePackageFormValues = z.infer<typeof createPackageSchema>;

const PLAN_LABELS: Record<PlanType, string> = {
  [PlanType.MONTHLY]:     "Monthly",
  [PlanType.QUARTERLY]:   "Quarterly",
  [PlanType.HALF_YEARLY]: "Half-Yearly",
  [PlanType.YEARLY]:      "Yearly",
  [PlanType.LIFETIME]:    "Lifetime",
};

const PLAN_DEFAULT_MONTHS: Record<PlanType, number> = {
  [PlanType.MONTHLY]:     1,
  [PlanType.QUARTERLY]:   3,
  [PlanType.HALF_YEARLY]: 6,
  [PlanType.YEARLY]:      12,
  [PlanType.LIFETIME]:    5000,
};

interface CreatePackageModalProps { onSuccess?: () => void; }

// ─── Component ────────────────────────────────────────────────────────────────

export function CreatePackageModal({ onSuccess }: CreatePackageModalProps) {
  const [open, setOpen] = useState(false);
  const [createPackage, { isLoading }] = useCreatePackageMutation();

  // Fetch all active partners — only when modal is open
  const { data: partnersData, isLoading: isPartnersLoading } = useGetAllPartnersQuery(
    { isActive: "true", limit: 100 },
    { skip: !open },
  );
  // Response shape: { data: [...], meta: {...}, stats: {...} }
  // _id is optional on IPartner, so filter out any entries missing it
  const partners = ((partnersData?.data ?? []) as IPartner[]).filter(
    (p): p is IPartner & { _id: string } => typeof p._id === "string",
  );

  const {
    register, handleSubmit, setValue, watch, control,
    formState: { errors }, reset,
  } = useForm<CreatePackageFormValues>({
    resolver: zodResolver(createPackageSchema) as any,
    defaultValues: {
      name: "", description: "", coverageAmount: undefined,
      plans: [{ type: PlanType.MONTHLY, durationInMonths: 1, regularPrice: 0, discountPrice: 0 }],
      benefits:         [{ value: "" }],
      exclusions:       [],
      partnerDiscounts: [],
      isActive:         true,
      isDeleted:        false,
    },
  });

  const { fields: planFields,            append: appendPlan,            remove: removePlan            } = useFieldArray({ control, name: "plans" });
  const { fields: benefitFields,         append: appendBenefit,         remove: removeBenefit         } = useFieldArray({ control, name: "benefits" });
  const { fields: exclusionFields,       append: appendExclusion,       remove: removeExclusion       } = useFieldArray({ control, name: "exclusions" });
  const { fields: partnerDiscountFields, append: appendPartnerDiscount, remove: removePartnerDiscount } = useFieldArray({ control, name: "partnerDiscounts" });

  const watchedIsActive = watch("isActive");

  const handleClose = () => { reset(); setOpen(false); };

  const onSubmit = async (data: CreatePackageFormValues) => {
    try {
      const payload = {
        name:             data.name,
        description:      data.description,
        coverageAmount:   data.coverageAmount,
        plans:            data.plans,
        benefits:         data.benefits.map((b) => b.value),
        exclusions:       data.exclusions.map((e) => e.value),
        partnerDiscounts: data.partnerDiscounts,
        isActive:         data.isActive,
        isDeleted:        data.isDeleted,
      };
      await createPackage(payload).unwrap();
      toast.success("Package created successfully!");
      handleClose();
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create package");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Create Package
      </Button>

      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="flex flex-col items-center gap-2 pb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md mb-1">
              <Package className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-widest uppercase">Create Insurance Package</DialogTitle>
            <DialogDescription className="text-[#96999A] text-sm tracking-wide">Fill in the package details below</DialogDescription>
          </DialogHeader>

          <Separator />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

            {/* ── Basic Info ── */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Basic Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="p-name" className="text-xs font-semibold tracking-widest uppercase">Package Name <span className="text-red-500">*</span></Label>
                  <Input id="p-name" placeholder="e.g. Basic Health Shield" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="p-desc" className="text-xs font-semibold tracking-widest uppercase">Description <span className="text-red-500">*</span></Label>
                  <Textarea id="p-desc" rows={3} placeholder="Brief description of this insurance package..." {...register("description")} />
                  {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="p-coverage" className="text-xs font-semibold tracking-widest uppercase">Coverage Amount (BDT) <span className="text-red-500">*</span></Label>
                  <Input id="p-coverage" type="number" min={0} placeholder="e.g. 1000000" {...register("coverageAmount")} />
                  {errors.coverageAmount && <p className="text-xs text-red-400">{errors.coverageAmount.message}</p>}
                </div>

                <div className="space-y-1.5 flex items-center gap-3 pt-5">
                  <Switch
                    id="p-active"
                    checked={watchedIsActive}
                    onCheckedChange={(v) => setValue("isActive", v)}
                  />
                  <Label htmlFor="p-active" className="text-sm font-medium">
                    {watchedIsActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* ── Plans ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Plans <span className="text-red-500">*</span></p>
                <Button
                  type="button" variant="outline" size="sm"
                  onClick={() => appendPlan({ type: PlanType.MONTHLY, durationInMonths: 1, regularPrice: 0, discountPrice: 0 })}
                >
                  <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Plan
                </Button>
              </div>
              {errors.plans?.root && <p className="text-xs text-red-400 mb-2">{errors.plans.root.message}</p>}

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
                        <div className="space-y-1.5 sm:col-span-1">
                          <Label className="text-xs font-semibold tracking-widest uppercase">Type</Label>
                          <Select
                            value={planType}
                            onValueChange={(v) => {
                              setValue(`plans.${idx}.type`, v as PlanType, { shouldValidate: true });
                              setValue(`plans.${idx}.durationInMonths`, PLAN_DEFAULT_MONTHS[v as PlanType]);
                            }}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <span>{PLAN_LABELS[planType] ?? "Select"}</span>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(PlanType).map((pt) => (
                                <SelectItem key={pt} value={pt}>{PLAN_LABELS[pt]}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.plans?.[idx]?.type && <p className="text-xs text-red-400">{errors.plans[idx]?.type?.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold tracking-widest uppercase">Duration (months)</Label>
                          <Input type="number" min={1} className="h-9" {...register(`plans.${idx}.durationInMonths`)} />
                          {errors.plans?.[idx]?.durationInMonths && <p className="text-xs text-red-400">{errors.plans[idx]?.durationInMonths?.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold tracking-widest uppercase">Regular Price (৳)</Label>
                          <Input type="number" min={0} className="h-9" placeholder="0" {...register(`plans.${idx}.regularPrice`)} />
                          {errors.plans?.[idx]?.regularPrice && <p className="text-xs text-red-400">{errors.plans[idx]?.regularPrice?.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold tracking-widest uppercase">Discount Price (৳)</Label>
                          <Input type="number" min={0} className="h-9" placeholder="0" {...register(`plans.${idx}.discountPrice`)} />
                          {errors.plans?.[idx]?.discountPrice && <p className="text-xs text-red-400">{errors.plans[idx]?.discountPrice?.message}</p>}
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
              {errors.benefits?.root && <p className="text-xs text-red-400 mb-2">{errors.benefits.root.message}</p>}
              <div className="space-y-2">
                {benefitFields.map((field, idx) => (
                  <div key={field.id} className="flex gap-2">
                    <Input placeholder={`Benefit ${idx + 1}`} className="flex-1" {...register(`benefits.${idx}.value`)} />
                    {benefitFields.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 shrink-0" onClick={() => removeBenefit(idx)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                    {errors.benefits?.[idx]?.value && <p className="text-xs text-red-400">{errors.benefits[idx]?.value?.message}</p>}
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
                {exclusionFields.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No exclusions added yet.</p>
                )}
              </div>
            </div>

            <Separator />

            {/* ── Partner Discounts ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                  Partner Discounts <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                </p>
                <Button
                  type="button" variant="outline" size="sm"
                  onClick={() => appendPartnerDiscount({ partner: "", discountPercent: 0, isActive: true })}
                >
                  <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-3">
                {partnerDiscountFields.map((field, idx) => {
                  const isPartnerActive = watch(`partnerDiscounts.${idx}.isActive`);
                  return (
                    <div key={field.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Partner {idx + 1}</p>
                        <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removePartnerDiscount(idx)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1.5 sm:col-span-1">
                          <Label className="text-xs font-semibold tracking-widest uppercase">Partner</Label>
                          <Select
                            value={watch(`partnerDiscounts.${idx}.partner`)}
                            onValueChange={(v) => setValue(`partnerDiscounts.${idx}.partner`, v as any, { shouldValidate: true })}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              {isPartnersLoading ? (
                                <span className="text-slate-400">Loading...</span>
                              ) : (
                                <span className="truncate">
                                  {partners.find((p) => p._id === watch(`partnerDiscounts.${idx}.partner`))?.name ?? "Select partner"}
                                </span>
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {partners.length === 0 && !isPartnersLoading && (
                                <div className="px-3 py-4 text-center text-xs text-slate-400">No active partners found</div>
                              )}
                              {partners.map((partner) => (
                                <SelectItem key={partner._id} value={partner._id}>
                                  <div className="flex items-center gap-2">
                                    {partner.logo ? (
                                      <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="w-5 h-5 rounded-full object-cover shrink-0 border border-slate-200"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                      />
                                    ) : (
                                      <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 flex items-center justify-center text-[9px] font-bold text-slate-500 uppercase">
                                        {partner.name.charAt(0)}
                                      </div>
                                    )}
                                    <span className="truncate">{partner.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.partnerDiscounts?.[idx]?.partner && (
                            <p className="text-xs text-red-400">{errors.partnerDiscounts[idx]?.partner?.message}</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold tracking-widest uppercase">Discount (%)</Label>
                          <Input type="number" min={0} max={100} className="h-9" placeholder="e.g. 10" {...register(`partnerDiscounts.${idx}.discountPercent`)} />
                          {errors.partnerDiscounts?.[idx]?.discountPercent && (
                            <p className="text-xs text-red-400">{errors.partnerDiscounts[idx]?.discountPercent?.message}</p>
                          )}
                        </div>
                        <div className="space-y-1.5 flex items-center gap-3 pt-5">
                          <Switch
                            id={`pd-active-${idx}`}
                            checked={isPartnerActive}
                            onCheckedChange={(v) => setValue(`partnerDiscounts.${idx}.isActive`, v)}
                          />
                          <Label htmlFor={`pd-active-${idx}`} className="text-sm font-medium">
                            {isPartnerActive ? "Active" : "Inactive"}
                          </Label>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {partnerDiscountFields.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No partner discounts added yet.</p>
                )}
              </div>
            </div>

            {/* ── Submit ── */}
            <Button type="submit" disabled={isLoading} className="w-full mt-2 font-bold tracking-widest uppercase disabled:opacity-60">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2"><Package className="h-4 w-4" />Create Package</span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}