// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import {
//   Loader2,
//   Plus,
//   Check,
//   User,
//   Users,
//   ShieldPlus,
// } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// import { useCreateSubscriptionMutation } from "@/redux/features/subscription/subscription.api";
// import { useGetAllPackagesQuery } from "@/redux/features/package/package.api";
// import { PlanType } from "@/types/subscription.types";

// // ── local shape assumption for package plans (adjust if IPackage differs) ──
// interface IPackagePlan {
//   type: PlanType;
//   regularPrice: number;
//   discountPrice?: number;
//   durationInMonths?: number;
// }
// interface IPackageWithPlans {
//   _id: string;
//   name: string;
//   plans: IPackagePlan[];
// }

// const PLAN_LABELS: Record<PlanType, string> = {
//   [PlanType.MONTHLY]: "Monthly",
//   [PlanType.QUARTERLY]: "Quarterly",
//   [PlanType.HALF_YEARLY]: "Half Yearly",
//   [PlanType.YEARLY]: "Yearly",
//   [PlanType.LIFETIME]: "Lifetime",
// };

// const formatCurrency = (n?: number) => `৳${(n ?? 0).toLocaleString("en-BD")}`;

// // ── schema (no customer-creation fields at all) ─────────────────────────────

// const schema = z
//   .object({
//     subscribeFor: z.enum(["SELF", "OTHER"]),
//     beneficiaryName: z.string().optional(),
//     beneficiaryPhone: z.string().optional(),
//     beneficiaryDateOfBirth: z.string().optional(),
//     beneficiaryRelationship: z.string().optional(),

//     package: z.string().min(1, "Please select a package"),
//     planType: z.nativeEnum(PlanType, { error: "Please select a plan" }),
//     price: z.number().min(0),
//   })
//   .superRefine((data, ctx) => {
//     if (data.subscribeFor === "OTHER") {
//       if (!data.beneficiaryName?.trim()) {
//         ctx.addIssue({
//           code: "custom",
//           path: ["beneficiaryName"],
//           message: "Beneficiary name is required",
//         });
//       }
//       if (
//         !data.beneficiaryPhone?.trim() ||
//         data.beneficiaryPhone.trim().length !== 11
//       ) {
//         ctx.addIssue({
//           code: "custom",
//           path: ["beneficiaryPhone"],
//           message: "Valid 11-digit phone required",
//         });
//       }
//       if (!data.beneficiaryRelationship?.trim()) {
//         ctx.addIssue({
//           code: "custom",
//           path: ["beneficiaryRelationship"],
//           message: "Relationship is required",
//         });
//       }
//     }
//   });

// type FormValues = z.infer<typeof schema>;

// const defaultValues: FormValues = {
//   subscribeFor: "SELF",
//   beneficiaryName: "",
//   beneficiaryPhone: "",
//   beneficiaryDateOfBirth: "",
//   beneficiaryRelationship: "",
//   package: "",
//   planType: undefined as any,
//   price: 0,
// };

// interface CreateMySubscriptionModalProps {
//   onSuccess?: () => void;
// }

// export function CreateMySubscriptionModal({
//   onSuccess,
// }: CreateMySubscriptionModalProps) {
//   const [open, setOpen] = useState(false);
//   const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

//   const { data: packagesData } = useGetAllPackagesQuery({ limit: 100 } as any);

//   const packages: IPackageWithPlans[] = useMemo(() => {
//     const raw = packagesData as any;
//     if (!raw) return [];
//     if (Array.isArray(raw.data)) return raw.data;
//     if (Array.isArray(raw.data?.data)) return raw.data.data;
//     return [];
//   }, [packagesData]);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues,
//   });

//   const subscribeFor = form.watch("subscribeFor");
//   const selectedPackageId = form.watch("package");
//   const selectedPlanType = form.watch("planType");

//   const selectedPackage = useMemo(
//     () => packages.find((p) => p._id === selectedPackageId),
//     [packages, selectedPackageId],
//   );

//   const availablePlans = useMemo(
//     () => selectedPackage?.plans ?? [],
//     [selectedPackage],
//   );

//   const selectedPlan = useMemo(
//     () => availablePlans.find((p) => p.type === selectedPlanType),
//     [availablePlans, selectedPlanType],
//   );

//   useEffect(() => {
//     if (selectedPlan) {
//       const price = selectedPlan.discountPrice || selectedPlan.regularPrice;
//       form.setValue("price", price, { shouldValidate: true });
//     }
//   }, [selectedPlan, form]);

//   useEffect(() => {
//     if (selectedPackageId) {
//       form.setValue("planType", undefined as any);
//       form.setValue("price", 0);
//     }
//   }, [selectedPackageId, form]);

//   const resetAll = () => {
//     form.reset(defaultValues);
//   };

//   const onError = (errors: typeof form.formState.errors) => {
//     const firstError = Object.values(errors)[0];
//     toast.error((firstError as any)?.message || "Please check the form fields");
//   };

//   const onSubmit = async (values: FormValues) => {
//     if (!selectedPlan) {
//       toast.error("Please select a valid plan");
//       return;
//     }

//     // Backend infers the customer from req.user — no customer/customerPayload sent.
//     const payload = {
//       package: values.package,
//       planType: values.planType,
//       durationInMonths: selectedPlan.durationInMonths,
//       price: values.price,
//       subscribeFor: values.subscribeFor,
//       ...(values.subscribeFor === "OTHER" && {
//         beneficiary: {
//           name: values.beneficiaryName!.trim(),
//           phone: values.beneficiaryPhone!.trim(),
//           relationship: values.beneficiaryRelationship!.trim(),
//           ...(values.beneficiaryDateOfBirth && {
//             dateOfBirth: values.beneficiaryDateOfBirth,
//           }),
//         },
//       }),
//     };

//     try {
//       const res = await createSubscription(payload as any).unwrap();
//       toast.success("Subscription created successfully");
//       const paymentUrl = res?.data?.data?.paymentUrl;
//       console.log(paymentUrl);
//       setOpen(false);
//       resetAll();
//       onSuccess?.();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to create subscription");
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(v) => {
//         setOpen(v);
//         if (!v) resetAll();
//       }}
//     >
//       <DialogTrigger>
//         <Button className="bg-green-600 hover:from-green-700 text-white gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:cursor-pointer">
//           <Plus className="w-4 h-4" /> New Subscription
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-lg w-full scrollbar-none">
//         <DialogHeader className="text-center items-center">
//           <div className="w-11 h-11 rounded-full bg-linear-to-br from-green-400 to-green-600 hover:from-green-700 flex items-center justify-center shadow-sm mb-1">
//             <ShieldPlus className="w-5 h-5 text-white" />
//           </div>
//           <DialogTitle className="uppercase tracking-widest text-sm">
//             Subscribe to a Package
//           </DialogTitle>
//         </DialogHeader>

//         <Separator />

//         <ScrollArea className="max-h-[75vh] pr-2">
//           <form
//             onSubmit={form.handleSubmit(onSubmit, onError)}
//             className="space-y-5 pr-2"
//           >
//             <SubscribeForBlock form={form} subscribeFor={subscribeFor} />

//             <Separator />

//             <PlanBlock
//               form={form}
//               packages={packages}
//               selectedPackage={selectedPackage}
//               selectedPackageId={selectedPackageId}
//               availablePlans={availablePlans}
//               selectedPlan={selectedPlan}
//             />

//             <Button
//               type="submit"
//               className="w-full mt-2 bg-linear-to-br from-green-400 to-green-600 hover:from-green-700 text-white font-bold tracking-widest uppercase transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 hover:cursor-pointer"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <Loader2 className="w-4 h-4 animate-spin" /> Creating...
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2">
//                   <Check className="w-4 h-4" /> Confirm Subscription
//                 </span>
//               )}
//             </Button>
//           </form>
//           <ScrollBar orientation="vertical" />
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // ── Subscribing For (self / someone else) ───────────────────────────────────

// function SubscribeForBlock({ form, subscribeFor }: { form: any; subscribeFor: "SELF" | "OTHER" }) {
//   return (
//     <div className="space-y-3">
//       <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
//         Subscribing For
//       </p>
//       <div className="grid grid-cols-2 gap-2">
//         <button
//           type="button"
//           onClick={() =>
//             form.setValue("subscribeFor", "SELF", { shouldValidate: true })
//           }
//           className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-all duration-200 ${subscribeFor === "SELF"
//             ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 scale-[1.02]"
//             : "border-slate-200 text-slate-500 dark:border-slate-700"
//             }`}
//         >
//           <User className="w-4 h-4" /> For Myself
//         </button>
//         <button
//           type="button"
//           onClick={() =>
//             form.setValue("subscribeFor", "OTHER", { shouldValidate: true })
//           }
//           className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-all duration-200 ${subscribeFor === "OTHER"
//             ? "border-green-600 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 scale-[1.02]"
//             : "border-slate-200 text-slate-500 dark:border-slate-700"
//             }`}
//         >
//           <Users className="w-4 h-4" /> For Someone Else
//         </button>
//       </div>

//       {subscribeFor === "OTHER" && (
//         <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-250">
//           <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 pt-1">
//             Beneficiary Info
//           </p>
//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1.5 col-span-2">
//               <Input
//                 placeholder="Beneficiary Name *"
//                 {...form.register("beneficiaryName")}
//               />
//               {form.formState.errors.beneficiaryName && (
//                 <p className="text-xs text-red-500">
//                   {form.formState.errors.beneficiaryName.message}
//                 </p>
//               )}
//             </div>
//             <div className="space-y-1.5">
//               <Input
//                 placeholder="Beneficiary Phone *"
//                 {...form.register("beneficiaryPhone")}
//               />
//               {form.formState.errors.beneficiaryPhone && (
//                 <p className="text-xs text-red-500">
//                   {form.formState.errors.beneficiaryPhone.message}
//                 </p>
//               )}
//             </div>
//             <Input
//               type="date"
//               placeholder="Date of Birth"
//               {...form.register("beneficiaryDateOfBirth")}
//             />
//             <div className="space-y-1.5 col-span-2">
//               <Input
//                 placeholder="Relationship (e.g. Spouse, Son, Father) *"
//                 {...form.register("beneficiaryRelationship")}
//               />
//               {form.formState.errors.beneficiaryRelationship && (
//                 <p className="text-xs text-red-500">
//                   {form.formState.errors.beneficiaryRelationship.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Package + Plan selection ─────────────────────────────────────────────────

// function PlanBlock({
//   form,
//   packages,
//   selectedPackage,
//   selectedPackageId,
//   availablePlans,
//   selectedPlan,
// }: {
//   form: any;
//   packages: IPackageWithPlans[];
//   selectedPackage?: IPackageWithPlans;
//   selectedPackageId: string;
//   availablePlans: IPackagePlan[];
//   selectedPlan?: IPackagePlan;
// }) {
//   return (
//     <div className="space-y-4">
//       <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
//         Choose Package & Plan
//       </p>

//       <div className="grid grid-cols-2 gap-3">
//         <div className="space-y-1.5">
//           <Select
//             value={form.watch("package")}
//             onValueChange={(v: string) =>
//               form.setValue("package", v as any, { shouldValidate: true })
//             }
//           >
//             <SelectTrigger className="w-full">
//               <span>
//                 {selectedPackage ? selectedPackage.name : "Select Package"}
//               </span>
//             </SelectTrigger>
//             <SelectContent>
//               {packages.map((pkg) => (
//                 <SelectItem key={pkg._id} value={pkg._id}>
//                   {pkg.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {form.formState.errors.package && (
//             <p className="text-xs text-red-500">
//               {form.formState.errors.package.message}
//             </p>
//           )}
//         </div>

//         <div className="space-y-1.5">
//           <Select
//             value={form.watch("planType") ?? ""}
//             onValueChange={(v: string) =>
//               form.setValue("planType", v as PlanType, { shouldValidate: true })
//             }
//             disabled={!selectedPackageId}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select Plan" />
//             </SelectTrigger>
//             <SelectContent>
//               {availablePlans.map((plan) => {
//                 const price = plan.discountPrice || plan.regularPrice;
//                 return (
//                   <SelectItem key={plan.type} value={plan.type}>
//                     {PLAN_LABELS[plan.type]} — {formatCurrency(price)}
//                   </SelectItem>
//                 );
//               })}
//             </SelectContent>
//           </Select>
//           {form.formState.errors.planType && (
//             <p className="text-xs text-red-500">
//               {form.formState.errors.planType.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {selectedPlan && (
//         <div className="flex items-center justify-between rounded-lg bg-linear-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 px-3 py-2.5 animate-in fade-in zoom-in-95 duration-200">
//           <span className="text-sm text-slate-500 dark:text-slate-400">
//             Price
//           </span>
//           <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
//             {formatCurrency(form.watch("price"))}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }