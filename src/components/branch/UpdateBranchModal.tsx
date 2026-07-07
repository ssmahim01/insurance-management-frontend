// UpdateBranch.tsx
"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useUpdateBranchMutation } from "@/redux/features/branch/branch.api";
import { useGetAllPartnersQuery } from "@/redux/features/partner/partner.api";
import { IPartnerBranch } from "@/types/branch.types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const updateBranchSchema = z.object({
  partner:     z.string().min(1, "Partner is required"),
  branchName:  z.string().min(2, "Branch name must be at least 2 characters").max(100),
  phone:       z.string().min(10, "Enter a valid phone number").max(15).optional().or(z.literal("")),
  email:       z.string().email("Enter a valid email address").optional().or(z.literal("")),
  address:     z.string().min(2, "Address is required").max(200),
  city:        z.string().max(100).optional().or(z.literal("")),
  area:        z.string().max(100).optional().or(z.literal("")),
  postalCode:  z.string().max(20).optional().or(z.literal("")),
  latitude:    z.string().min(1, "Latitude is required"),
  longitude:   z.string().min(1, "Longitude is required"),
  isActive:    z.enum(["true", "false"]),
});

type UpdateBranchFormValues = z.infer<typeof updateBranchSchema>;

interface UpdateBranchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IPartnerBranch;
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function UpdateBranchModal({
  open,
  onOpenChange,
  item,
  onSuccess,
}: UpdateBranchModalProps) {
  const [updateBranch, { isLoading }] = useUpdateBranchMutation();
  const { data: partnersData } = useGetAllPartnersQuery({ limit: 100 });

  const getPartnerId = (p: IPartnerBranch["partner"]) =>
    typeof p === "string" ? p : String((p as any)?._id ?? "");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UpdateBranchFormValues>({
    resolver: zodResolver(updateBranchSchema) as any,
    defaultValues: {
      partner:    getPartnerId(item.partner),
      branchName: item.branchName ?? "",
      phone:      item.phone ?? "",
      email:      item.email ?? "",
      address:    item.address ?? "",
      city:       item.city ?? "",
      area:       item.area ?? "",
      postalCode: item.postalCode ?? "",
      latitude:   item.location?.coordinates?.[1] !== undefined ? String(item.location.coordinates[1]) : "",
      longitude:  item.location?.coordinates?.[0] !== undefined ? String(item.location.coordinates[0]) : "",
      isActive:   item.isActive ? "true" : "false",
    },
  });

  // reset form whenever a different item is opened
  useEffect(() => {
    if (!open) return;
    reset({
      partner:    getPartnerId(item.partner),
      branchName: item.branchName ?? "",
      phone:      item.phone ?? "",
      email:      item.email ?? "",
      address:    item.address ?? "",
      city:       item.city ?? "",
      area:       item.area ?? "",
      postalCode: item.postalCode ?? "",
      latitude:   item.location?.coordinates?.[1] !== undefined ? String(item.location.coordinates[1]) : "",
      longitude:  item.location?.coordinates?.[0] !== undefined ? String(item.location.coordinates[0]) : "",
      isActive:   item.isActive ? "true" : "false",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  const selectedStatus  = watch("isActive");
  const selectedPartner = watch("partner");

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (data: UpdateBranchFormValues) => {
    try {
      const payload = {
        partner:    data.partner,
        branchName: data.branchName,
        address:    data.address,
        isActive:   data.isActive === "true",
        location: {
          type: "Point" as const,
          coordinates: [Number(data.longitude), Number(data.latitude)] as [number, number],
        },
        ...(data.phone      && { phone:      data.phone }),
        ...(data.email      && { email:      data.email }),
        ...(data.city       && { city:       data.city }),
        ...(data.area       && { area:       data.area }),
        ...(data.postalCode && { postalCode: data.postalCode }),
      };

      await updateBranch({ id: String(item._id), data: payload }).unwrap();
      toast.success("Branch updated successfully!");
      handleClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update branch");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => { if (!val) handleClose(); }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">
            Update Branch
          </DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">
            Update the branch&apos;s information below
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

          {/* ── Basic Information ── */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Basic Information
            </p>
            <div className="space-y-4">

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase">
                  Partner <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={selectedPartner}
                  onValueChange={(v) => setValue("partner", v as any, { shouldValidate: true })}
                >
                  <SelectTrigger className="w-full">
                    <span className="text-sm">
                      {partnersData?.data.find((p) => String(p._id) === selectedPartner)?.name ||
                        "Select partner"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {partnersData?.data.map((p) => (
                      <SelectItem key={String(p._id)} value={String(p._id)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.partner && <p className="text-xs text-red-400">{errors.partner.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ub-name" className="text-xs font-semibold tracking-widest uppercase">
                  Branch Name <span className="text-red-500">*</span>
                </Label>
                <Input id="ub-name" placeholder="e.g. Dhanmondi Branch" {...register("branchName")} />
                {errors.branchName && (
                  <p className="text-xs text-red-400">{errors.branchName.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(v) =>
                    setValue("isActive", v as "true" | "false", { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="w-full">
                    <span className="flex items-center gap-2 text-sm">
                      <span
                        className={`h-2 w-2 rounded-full inline-block ${
                          selectedStatus === "true" ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />
                      {selectedStatus === "true" ? "Active" : "Inactive"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                        Active
                      </span>
                    </SelectItem>
                    <SelectItem value="false">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-400 inline-block" />
                        Inactive
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          <Separator />

          {/* ── Contact Information ── */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Contact Information{" "}
              <span className="text-[#96999A] normal-case font-normal">(optional)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <Label htmlFor="ub-phone" className="text-xs font-semibold tracking-widest uppercase">
                  Phone
                </Label>
                <Input id="ub-phone" placeholder="01XXXXXXXXX" {...register("phone")} />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ub-email" className="text-xs font-semibold tracking-widest uppercase">
                  Email
                </Label>
                <Input
                  id="ub-email"
                  type="email"
                  placeholder="branch@partner.com"
                  {...register("email")}
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

            </div>
          </div>

          <Separator />

          {/* ── Address ── */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Address
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="ub-address" className="text-xs font-semibold tracking-widest uppercase">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input id="ub-address" placeholder="House 12, Road 5" {...register("address")} />
                {errors.address && <p className="text-xs text-red-400">{errors.address.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ub-city" className="text-xs font-semibold tracking-widest uppercase">
                  City{" "}
                  <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                </Label>
                <Input id="ub-city" placeholder="Dhaka" {...register("city")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ub-area" className="text-xs font-semibold tracking-widest uppercase">
                  Area{" "}
                  <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                </Label>
                <Input id="ub-area" placeholder="Dhanmondi" {...register("area")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ub-postal" className="text-xs font-semibold tracking-widest uppercase">
                  Postal Code{" "}
                  <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                </Label>
                <Input id="ub-postal" placeholder="1209" {...register("postalCode")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ub-lat" className="text-xs font-semibold tracking-widest uppercase">
                  Latitude <span className="text-red-500">*</span>
                </Label>
                <Input id="ub-lat" placeholder="23.7461" {...register("latitude")} />
                {errors.latitude && <p className="text-xs text-red-400">{errors.latitude.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ub-lng" className="text-xs font-semibold tracking-widest uppercase">
                  Longitude <span className="text-red-500">*</span>
                </Label>
                <Input id="ub-lng" placeholder="90.3742" {...register("longitude")} />
                {errors.longitude && (
                  <p className="text-xs text-red-400">{errors.longitude.message}</p>
                )}
              </div>

            </div>
          </div>

          {/* ── Submit ── */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Update Branch
              </span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}