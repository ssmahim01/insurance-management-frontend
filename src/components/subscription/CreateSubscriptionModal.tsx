
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Plus, Search, UserCheck, UserPlus, X, Check } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useCreateSubscriptionMutation } from "@/redux/features/subscription/subscription.api";
import { useGetAllCustomersQuery } from "@/redux/features/user/user.api";
import { useGetAllPackagesQuery } from "@/redux/features/package/package.api";
import { IUser } from "@/types/user.types";
import { PlanType } from "@/types/subscription.types";

// ── local shape assumption for package plans (adjust if IPackage differs) ──
interface IPackagePlan {
    type: PlanType;
    regularPrice: number;
    discountPrice?: number;
    durationInMonths?: number;
}
interface IPackageWithPlans {
    _id: string;
    name: string;
    plans: IPackagePlan[];
}

const PLAN_LABELS: Record<PlanType, string> = {
    [PlanType.MONTHLY]: "Monthly",
    [PlanType.QUARTERLY]: "Quarterly",
    [PlanType.HALF_YEARLY]: "Half Yearly",
    [PlanType.YEARLY]: "Yearly",
    [PlanType.LIFETIME]: "Lifetime",
};

const formatCurrency = (n?: number) => `৳${(n ?? 0).toLocaleString("en-BD")}`;

// ── schema ──────────────────────────────────────────────────────────────────

const schema = z
    .object({
        mode: z.enum(["existing", "new"]),

        // existing customer
        customerId: z.string().optional(),

        // new customer
        name: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        nid: z.string().optional(),
        dateOfBirth: z.string().optional(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
        division: z.string().optional(),
        district: z.string().optional(),
        thana: z.string().optional(),
        union: z.string().optional(),
        nomineeName: z.string().optional(),
        nomineeAge: z.string().optional(),
        nomineeRelationship: z.string().optional(),
        nomineePhone: z.string().optional(),

        // common
        package: z.string().min(1, "Please select a package"),
        planType: z.nativeEnum(PlanType, { error: "Please select a plan" }),
        price: z.number().min(0),
    })
    .superRefine((data, ctx) => {
        if (data.mode === "existing") {
            if (!data.customerId) {
                ctx.addIssue({ code: "custom", path: ["customerId"], message: "Please select a customer" });
            }
        } else {
            if (!data.name?.trim()) ctx.addIssue({ code: "custom", path: ["name"], message: "Name is required" });
            if (!data.phone?.trim() || data.phone.length !== 11) {
                ctx.addIssue({ code: "custom", path: ["phone"], message: "Valid 11-digit phone required" });
            }
            if (!data.division?.trim()) ctx.addIssue({ code: "custom", path: ["division"], message: "Division is required" });
            if (!data.district?.trim()) ctx.addIssue({ code: "custom", path: ["district"], message: "District is required" });
            if (!data.thana?.trim()) ctx.addIssue({ code: "custom", path: ["thana"], message: "Thana is required" });
        }
    });

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
    mode: "existing",
    customerId: "",
    name: "", phone: "", email: "", nid: "", dateOfBirth: "", gender: undefined,
    division: "", district: "", thana: "", union: "",
    nomineeName: "", nomineeAge: "", nomineeRelationship: "", nomineePhone: "",
    package: "",
    planType: undefined as any,
    price: 0,
};

export function CreateSubscriptionModal({ onSuccess }: { onSuccess?: () => void }) {
    const [open, setOpen] = useState(false);
    const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

    // customer search state
    const [customerSearch, setCustomerSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<IUser | null>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(customerSearch), 350);
        return () => clearTimeout(t);
    }, [customerSearch]);

    const { data: customersData, isFetching: isSearching } = useGetAllCustomersQuery(
        { searchTerm: debouncedSearch, limit: 8 },
        { skip: debouncedSearch.trim().length < 2 },
    );
    const customerResults: IUser[] = customersData?.data ?? [];

    //   const { data: packagesData } = useGetAllPackagesQuery({ limit: 100 } as any);
    //   const packages: IPackageWithPlans[] = (packagesData?.data as any) ?? [];
    const { data: packagesData } = useGetAllPackagesQuery({ limit: 100 } as any);

    // handles both possible shapes: { data: [] } or { data: { data: [] } }
    const packages: IPackageWithPlans[] = useMemo(() => {
        const raw = packagesData as any;
        if (!raw) return [];
        if (Array.isArray(raw.data)) return raw.data;
        if (Array.isArray(raw.data?.data)) return raw.data.data;
        return [];
    }, [packagesData]);

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const mode = form.watch("mode");
    const selectedPackageId = form.watch("package");
    const selectedPlanType = form.watch("planType");

    const selectedPackage = useMemo(
        () => packages.find((p) => p._id === selectedPackageId),
        [packages, selectedPackageId],
    );

    const availablePlans = selectedPackage?.plans ?? [];

    const selectedPlan = useMemo(
        () => availablePlans.find((p) => p.type === selectedPlanType),
        [availablePlans, selectedPlanType],
    );

    // auto-fill price whenever plan changes
    useEffect(() => {
        if (selectedPlan) {
            const price = selectedPlan.discountPrice || selectedPlan.regularPrice;
            form.setValue("price", price, { shouldValidate: true });
        }
    }, [selectedPlan]);

    // reset planType if package changes and current plan not available anymore
    useEffect(() => {
        if (selectedPackageId) {
            form.setValue("planType", undefined as any);
            form.setValue("price", 0);
        }
    }, [selectedPackageId]);

    const resetAll = () => {
        form.reset(defaultValues);
        setSelectedCustomer(null);
        setCustomerSearch("");
        setDebouncedSearch("");
    };

    const handleModeSwitch = (m: "existing" | "new") => {
        form.setValue("mode", m);
        if (m === "new") {
            setSelectedCustomer(null);
            form.setValue("customerId", "");
        } else {
            setCustomerSearch("");
        }
    };

    const pickCustomer = (c: IUser) => {
        setSelectedCustomer(c);
        form.setValue("customerId", String(c._id), { shouldValidate: true });
        setShowResults(false);
        setCustomerSearch("");
    };

    const clearCustomer = () => {
        setSelectedCustomer(null);
        form.setValue("customerId", "");
    };

    const onError = (errors: typeof form.formState.errors) => {
        const firstError = Object.values(errors)[0];
        toast.error((firstError as any)?.message || "Please check the form fields");
    };

    const onSubmit = async (values: FormValues) => {
        if (!selectedPlan) {
            toast.error("Please select a valid plan");
            return;
        }

        const basePayload = {
            package: values.package,
            planType: values.planType,
            durationInMonths: selectedPlan.durationInMonths,
            price: values.price,
        };

        const payload =
            values.mode === "existing"
                ? { ...basePayload, customer: values.customerId }
                : {
                    ...basePayload,
                    customerPayload: {
                        name: values.name!.trim(),
                        phone: values.phone!.trim(),
                        ...(values.email?.trim() && { email: values.email.trim() }),
                        role: "CUSTOMER" as const,
                        ...(values.nid?.trim() && { nid: values.nid.trim() }),
                        ...(values.dateOfBirth && { dateOfBirth: values.dateOfBirth }),
                        ...(values.gender && { gender: values.gender }),
                        address: {
                            division: values.division!.trim(),
                            district: values.district!.trim(),
                            thana: values.thana!.trim(),
                            ...(values.union?.trim() && { union: values.union.trim() }),
                        },
                        ...(values.nomineeName?.trim() && {
                            nominee: {
                                name: values.nomineeName.trim(),
                                ...(values.nomineeAge && { age: Number(values.nomineeAge) }),
                                ...(values.nomineeRelationship?.trim() && { relationship: values.nomineeRelationship.trim() }),
                                ...(values.nomineePhone?.trim() && { phone: values.nomineePhone.trim() }),
                            },
                        }),
                    },
                };

        try {
            const res = await createSubscription(payload as any).unwrap();
            toast.success("Subscription created successfully");
            const paymentUrl = res?.data?.data?.paymentUrl;
            //   if (paymentUrl) {
            //     window.open(paymentUrl, "_blank");
            //   }
            console.log(paymentUrl)
            setOpen(false);
            resetAll();
            onSuccess?.();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to create subscription");
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetAll(); }}>
            <DialogTrigger>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> New Subscription
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className="text-center">
                    <DialogTitle className="uppercase tracking-widest text-sm">
                        Create Subscription
                    </DialogTitle>
                </DialogHeader>

                <Separator />

                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-5">
                    {/* ── Mode Toggle ── */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleModeSwitch("existing")}
                            className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors ${mode === "existing"
                                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "border-slate-200 text-slate-500 dark:border-slate-700"
                                }`}
                        >
                            <UserCheck className="w-4 h-4" /> Existing Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => handleModeSwitch("new")}
                            className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors ${mode === "new"
                                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "border-slate-200 text-slate-500 dark:border-slate-700"
                                }`}
                        >
                            <UserPlus className="w-4 h-4" /> New Customer
                        </button>
                    </div>

                    {/* ── Existing Customer Search ── */}
                    {mode === "existing" && (
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                                Search Customer
                            </p>

                            {selectedCustomer ? (
                                <div className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2.5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {selectedCustomer.name?.charAt(0)?.toUpperCase() ?? "C"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedCustomer.name}</p>
                                            <p className="text-xs text-slate-500 font-mono">{selectedCustomer.phone}</p>
                                        </div>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={clearCustomer}>
                                        <X className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Search by name or phone..."
                                        className="pl-10"
                                        value={customerSearch}
                                        onChange={(e) => { setCustomerSearch(e.target.value); setShowResults(true); }}
                                        onFocus={() => setShowResults(true)}
                                    />
                                    {showResults && debouncedSearch.trim().length >= 2 && (
                                        <div className="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
                                            {isSearching ? (
                                                <p className="px-3 py-3 text-xs text-slate-400 text-center">Searching...</p>
                                            ) : customerResults.length === 0 ? (
                                                <p className="px-3 py-3 text-xs text-slate-400 text-center">No customers found</p>
                                            ) : (
                                                customerResults.map((c) => (
                                                    <button
                                                        key={String(c._id)}
                                                        type="button"
                                                        onClick={() => pickCustomer(c)}
                                                        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                    >
                                                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                            {c.name?.charAt(0)?.toUpperCase() ?? "C"}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{c.name}</p>
                                                            <p className="text-xs text-slate-500 font-mono">{c.phone}</p>
                                                        </div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                            {form.formState.errors.customerId && (
                                <p className="text-xs text-red-500">{form.formState.errors.customerId.message}</p>
                            )}
                        </div>
                    )}

                    {/* ── New Customer Form ── */}
                    {mode === "new" && (
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Basic Info</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5 col-span-2">
                                    <Input placeholder="Full Name *" {...form.register("name")} />
                                    {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Input placeholder="Phone *" {...form.register("phone")} />
                                    {form.formState.errors.phone && <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>}
                                </div>
                                <Input placeholder="Email" {...form.register("email")} />
                                <Input placeholder="NID" {...form.register("nid")} />
                                <Input type="date" placeholder="Date of Birth" {...form.register("dateOfBirth")} />
                                <Select value={form.watch("gender") ?? ""} onValueChange={(v) => form.setValue("gender", v as any)}>
                                    <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />
                            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Address</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Input placeholder="Division *" {...form.register("division")} />
                                    {form.formState.errors.division && <p className="text-xs text-red-500">{form.formState.errors.division.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Input placeholder="District *" {...form.register("district")} />
                                    {form.formState.errors.district && <p className="text-xs text-red-500">{form.formState.errors.district.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Input placeholder="Thana *" {...form.register("thana")} />
                                    {form.formState.errors.thana && <p className="text-xs text-red-500">{form.formState.errors.thana.message}</p>}
                                </div>
                                <Input placeholder="Union" {...form.register("union")} />
                            </div>

                            <Separator />
                            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Nominee (optional)</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Input placeholder="Nominee Name" {...form.register("nomineeName")} />
                                <Input placeholder="Nominee Age" type="number" {...form.register("nomineeAge")} />
                                <Input placeholder="Relationship" {...form.register("nomineeRelationship")} />
                                <Input placeholder="Nominee Phone" {...form.register("nomineePhone")} />
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* ── Package & Plan ── */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Subscription</p>

                        {/* <div className="space-y-1.5">
              <Select
                value={form.watch("package")}
                onValueChange={(v) => form.setValue("package", v as any, { shouldValidate: true })}
              >
                <SelectTrigger><SelectValue placeholder="Select Package" /></SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg._id} value={pkg._id}>{pkg.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.package && <p className="text-xs text-red-500">{form.formState.errors.package.message}</p>}
            </div> */}

                        <div className="space-y-1.5">
                            <Select
                                value={form.watch("package")}
                                onValueChange={(v) => form.setValue("package", v as any, { shouldValidate: true })}
                            >
                                <SelectTrigger>
                                    <span>{selectedPackage ? selectedPackage.name : "Select Package"}</span>
                                </SelectTrigger>
                                <SelectContent>
                                    {packages.map((pkg) => (
                                        <SelectItem key={pkg._id} value={pkg._id}>{pkg.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.package && <p className="text-xs text-red-500">{form.formState.errors.package.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Select
                                value={form.watch("planType") ?? ""}
                                onValueChange={(v) => form.setValue("planType", v as PlanType, { shouldValidate: true })}
                                disabled={!selectedPackageId}
                            >
                                <SelectTrigger><SelectValue placeholder="Select Plan" /></SelectTrigger>
                                <SelectContent>
                                    {availablePlans.map((plan) => {
                                        const price = plan.discountPrice || plan.regularPrice;
                                        return (
                                            <SelectItem key={plan.type} value={plan.type}>
                                                {PLAN_LABELS[plan.type]} — {formatCurrency(price)}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.planType && <p className="text-xs text-red-500">{form.formState.errors.planType.message}</p>}
                        </div>

                        {selectedPlan && (
                            <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2.5">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Price</span>
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    {formatCurrency(form.watch("price"))}
                                </span>
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Creating...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4" /> Create Subscription
                            </span>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}