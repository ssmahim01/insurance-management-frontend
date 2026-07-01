// // components/subscription/UpdateSubscriptionModal.tsx

// "use client";

// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";

// import { useUpdateSubscriptionMutation } from "@/redux/features/subscription/subscription.api";
// import { ISubscription, SubscriptionStatus, PaymentStatus, PlanType } from "@/types/subscription.types";

// // const formSchema = z.object({
// //   status: z.nativeEnum(SubscriptionStatus),
// //   paymentStatus: z.nativeEnum(PaymentStatus),
// //   planType: z.nativeEnum(PlanType),
// //   price: z.coerce.number().min(0, "Price must be positive"),
// //   autoRenew: z.boolean(),
// // });

// // components/subscription/UpdateSubscriptionModal.tsx

// const formSchema = z.object({
//     status: z.nativeEnum(SubscriptionStatus),
//     paymentStatus: z.nativeEnum(PaymentStatus),
//     planType: z.nativeEnum(PlanType),
//     price: z
//         .number({ error: "Price must be a number" })
//         .min(0, "Price must be positive"),
//     autoRenew: z.boolean(),
// });

// type FormValues = z.infer<typeof formSchema>;

// export function UpdateSubscriptionModal({
//     open,
//     onOpenChange,
//     item,
//     onSuccess,
// }: {
//     open: boolean;
//     onOpenChange: (v: boolean) => void;
//     item: ISubscription;
//     onSuccess?: () => void;
// }) {
//     const [updateSubscription, { isLoading }] = useUpdateSubscriptionMutation();

//     const form = useForm<FormValues>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             status: item.status,
//             paymentStatus: item.paymentStatus,
//             planType: item.planType,
//             price: item.price,
//             autoRenew: item.autoRenew ?? false,
//         },
//     });

//     // populate form only after modal is actually open
//     useEffect(() => {
//         if (open) {
//             form.reset({
//                 status: item.status,
//                 paymentStatus: item.paymentStatus,
//                 planType: item.planType,
//                 price: item.price,
//                 autoRenew: item.autoRenew ?? false,
//             });
//         }
//     }, [open, item]);

// //     const onSubmit = async (values: FormValues) => {
// //         try {
// // console.log("values " , values) 
// //  toast.success("Subscription clicked successfully");
// //             await updateSubscription({ id: String(item._id), data: values }).unwrap();
// //             toast.success("Subscription updated successfully");
// //             onOpenChange(false);
// //             onSuccess?.();
// //         } catch (err: any) {
// //             toast.error(err?.data?.message || "Failed to update subscription");
// //         }
// //     };


// const onSubmit = async (values: FormValues) => {
//         try {
//             await updateSubscription({ id: String(item._id), data: values }).unwrap();
//             toast.success("Subscription updated successfully");
//             onOpenChange(false);
//             onSuccess?.();
//         } catch (err: any) {
//             toast.error(err?.data?.message || "Failed to update subscription");
//         }
//     };

//     const onError = (errors: typeof form.formState.errors) => {
//         console.log("validation errors:", errors);
//         const firstError = Object.values(errors)[0];
//         toast.error(firstError?.message || "Please check the form fields");
//     };

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="max-w-md">
//                 <DialogHeader className="text-center">
//                     <DialogTitle className="uppercase tracking-widest text-sm">
//                         Update Subscription
//                     </DialogTitle>
//                 </DialogHeader>

//                 <Separator />

//                 {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"> */}
//                     <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-5">

//                     <div className="space-y-2">
//                         <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Status</p>
//                         <Select
//                             value={form.watch("status")}
//                             onValueChange={(v) => form.setValue("status", v as SubscriptionStatus, { shouldValidate: true })}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {Object.values(SubscriptionStatus).map((s) => (
//                                     <SelectItem key={s} value={s}>{s}</SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="space-y-2">
//                         <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Payment Status</p>
//                         <Select
//                             value={form.watch("paymentStatus")}
//                             onValueChange={(v) => form.setValue("paymentStatus", v as PaymentStatus, { shouldValidate: true })}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {Object.values(PaymentStatus).map((s) => (
//                                     <SelectItem key={s} value={s}>{s}</SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="space-y-2">
//                         <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Plan Type</p>
//                         <Select
//                             value={form.watch("planType")}
//                             onValueChange={(v) => form.setValue("planType", v as PlanType, { shouldValidate: true })}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {Object.values(PlanType).map((p) => (
//                                     <SelectItem key={p} value={p}>{p}</SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="space-y-2">
//                         <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Price</p>
//                         <Input
//                             type="number"
//                             {...form.register("price", { valueAsNumber: true })}
//                         />
//                         {form.formState.errors.price && (
//                             <p className="text-xs text-red-500">{form.formState.errors.price.message}</p>
//                         )}
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Auto Renew</p>
//                         <Select
//                             value={form.watch("autoRenew") ? "true" : "false"}
//                             onValueChange={(v) => form.setValue("autoRenew", v === "true")}
//                         >
//                             <SelectTrigger className="w-28 h-8 text-xs">
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="true">Yes</SelectItem>
//                                 <SelectItem value="false">No</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <Button type="submit" className="w-full" disabled={isLoading}>
//                         {isLoading ? (
//                             <span className="flex items-center gap-2">
//                                 <Loader2 className="w-4 h-4 animate-spin" /> Updating...
//                             </span>
//                         ) : (
//                             "Update Subscription"
//                         )}
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }



// components/subscription/UpdateSubscriptionModal.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Wallet, CalendarClock, Banknote } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useUpdateSubscriptionMutation } from "@/redux/features/subscription/subscription.api";
import { ISubscription, SubscriptionStatus, PaymentStatus, PlanType } from "@/types/subscription.types";

const formSchema = z.object({
    status: z.nativeEnum(SubscriptionStatus),
    paymentStatus: z.nativeEnum(PaymentStatus, {
        error: "Invalid payment status",
    }),
    planType: z.nativeEnum(PlanType),
    price: z
        .number({ error: "Price must be a number" })
        .min(0, "Price must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Field wrapper ──────────────────────────────────────────────────────────

function FieldGroup({
    icon: Icon,
    label,
    children,
    error,
}: {
    icon: React.ElementType;
    label: string;
    children: React.ReactNode;
    error?: string;
}) {
    return (
        <div className="space-y-2">
            <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-slate-400">
                <Icon className="w-3 h-3" />
                {label}
            </p>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

// ─── Status style maps (for the trigger preview) ───────────────────────────

const STATUS_DOT: Record<SubscriptionStatus, string> = {
    [SubscriptionStatus.PENDING]: "bg-amber-500",
    [SubscriptionStatus.ACTIVE]: "bg-emerald-500",
    [SubscriptionStatus.EXPIRED]: "bg-slate-400",
    [SubscriptionStatus.CANCELLED]: "bg-red-500",
    [SubscriptionStatus.FAILED]: "bg-red-500",
};

const PAYMENT_DOT: Record<PaymentStatus, string> = {
    [PaymentStatus.PAID]: "bg-emerald-500",
    [PaymentStatus.UNPAID]: "bg-slate-400",
    [PaymentStatus.FAILED]: "bg-red-500",
    [PaymentStatus.REFUNDED]: "bg-blue-500",
    [PaymentStatus.COMPLETED]: "bg-emerald-500",
};

export function UpdateSubscriptionModal({
    open,
    onOpenChange,
    item,
    onSuccess,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    item: ISubscription;
    onSuccess?: () => void;
}) {
    const [updateSubscription, { isLoading }] = useUpdateSubscriptionMutation();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: item.status,
            paymentStatus: Object.values(PaymentStatus).includes(item.paymentStatus as PaymentStatus)
                ? item.paymentStatus
                : PaymentStatus.UNPAID,
            planType: item.planType,
            price: item.price,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                status: item.status,
                paymentStatus: Object.values(PaymentStatus).includes(item.paymentStatus as PaymentStatus)
                    ? item.paymentStatus
                    : PaymentStatus.UNPAID,
                planType: item.planType,
                price: item.price,
            });
        }
    }, [open, item]);

    const status = form.watch("status");
    const paymentStatus = form.watch("paymentStatus");
    const planType = form.watch("planType");

    const onSubmit = async (values: FormValues) => {
        try {
            await updateSubscription({ id: String(item._id), data: values }).unwrap();
            toast.success("Subscription updated successfully");
            onOpenChange(false);
            onSuccess?.();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update subscription");
        }
    };

    const onError = (errors: typeof form.formState.errors) => {
        const firstError = Object.values(errors)[0];
        toast.error((firstError as any)?.message || "Please check the form fields");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle className="uppercase tracking-widest text-sm">
                        Update Subscription
                    </DialogTitle>
                </DialogHeader>

                <Separator />

                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <FieldGroup icon={ShieldCheck} label="Status">
                            <Select
                                value={status}
                                onValueChange={(v) => form.setValue("status", v as SubscriptionStatus, { shouldValidate: true })}
                            >
                                <SelectTrigger className="w-full">
                                    <span className="flex items-center gap-2">
                                        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${STATUS_DOT[status]}`} />
                                        {status}
                                    </span>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(SubscriptionStatus).map((s) => (
                                        <SelectItem key={s} value={s}>
                                            <span className="flex items-center gap-2">
                                                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${STATUS_DOT[s]}`} />
                                                {s}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FieldGroup>

                        <FieldGroup icon={Wallet} label="Payment">
                            <Select
                                value={paymentStatus}
                                onValueChange={(v) => form.setValue("paymentStatus", v as PaymentStatus, { shouldValidate: true })}
                            >
                                <SelectTrigger className="w-full">
                                    <span className="flex items-center gap-2">
                                        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${PAYMENT_DOT[paymentStatus]}`} />
                                        {paymentStatus}
                                    </span>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(PaymentStatus).map((s) => (
                                        <SelectItem key={s} value={s}>
                                            <span className="flex items-center gap-2">
                                                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${PAYMENT_DOT[s]}`} />
                                                {s}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FieldGroup>
                    </div>

                    <FieldGroup icon={CalendarClock} label="Plan Type">
                        <Select
                            value={planType}
                            onValueChange={(v) => form.setValue("planType", v as PlanType, { shouldValidate: true })}
                        >
                            <SelectTrigger className="w-full">
                                <span>{planType}</span>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(PlanType).map((p) => (
                                    <SelectItem key={p} value={p}>{p}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FieldGroup>

                    <FieldGroup
                        icon={Banknote}
                        label="Price"
                        error={form.formState.errors.price?.message}
                    >
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">৳</span>
                            <Input
                                type="number"
                                className="pl-7"
                                {...form.register("price", { valueAsNumber: true })}
                            />
                        </div>
                    </FieldGroup>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                            </span>
                        ) : (
                            "Update Subscription"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}