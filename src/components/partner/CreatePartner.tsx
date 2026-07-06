"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Handshake, Upload, X } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";

// Replace with your actual mutation hook
import { useCreatePartnerMutation } from "@/redux/features/partner/partner.api";

// ─── Schema ───────────────────────────────────────────────────────────────────

const createPartnerSchema = z.object({
  name:        z.string().min(2, "Name must be at least 2 characters").max(100),
  phone:       z.string().min(10, "Enter a valid phone number").max(15).optional().or(z.literal("")),
  email:       z.string().email("Enter a valid email address").optional().or(z.literal("")),
  website:     z.string().url("Enter a valid URL (e.g. https://example.com)").optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal("")),
  isActive:    z.enum(["true", "false"]),
});

type CreatePartnerFormValues = z.infer<typeof createPartnerSchema>;

interface CreatePartnerModalProps {
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreatePartnerModal({ onSuccess }: CreatePartnerModalProps) {
  const [open, setOpen]               = useState(false);
  const [logoFile, setLogoFile]       = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [createPartner, { isLoading }] = useCreatePartnerMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreatePartnerFormValues>({
    resolver: zodResolver(createPartnerSchema) as any,
    defaultValues: {
      name:        "",
      phone:       "",
      email:       "",
      website:     "",
      description: "",
      isActive:    "true",
    },
  });

  const selectedStatus = watch("isActive");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Logo must be under 2MB"); return; }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const clearLogo = () => {
    setLogoFile(null);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview(null);
  };

  const handleClose = () => {
    reset();
    clearLogo();
    setOpen(false);
  };

  const onSubmit = async (data: CreatePartnerFormValues) => {
    try {
      const formData = new FormData();
      const payload = {
        name:        data.name,
        isActive:    data.isActive === "true",
        ...(data.phone       && { phone:       data.phone }),
        ...(data.email       && { email:       data.email }),
        ...(data.website     && { website:     data.website }),
        ...(data.description && { description: data.description }),
      };
      formData.append("data", JSON.stringify(payload));
      if (logoFile) formData.append("logo", logoFile);

      await createPartner(formData).unwrap();
      toast.success("Partner created successfully!");
      handleClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create partner");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add Partner
      </Button>

      <Dialog
        open={open}
        onOpenChange={(val) => { if (!val) handleClose(); else setOpen(true); }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
          <DialogHeader className="flex flex-col items-center gap-2 pb-2">
            <div className="w-12 h-12 rounded-xl from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-widest uppercase">
              Add New Partner
            </DialogTitle>
            <DialogDescription className="text-[#96999A] text-sm tracking-wide">
              Fill in the partner&apos;s information below
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
                  <Label htmlFor="p-name" className="text-xs font-semibold tracking-widest uppercase">
                    Partner Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="p-name" placeholder="e.g. Green Life Insurance" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="p-description" className="text-xs font-semibold tracking-widest uppercase">
                    Description{" "}
                    <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="p-description"
                    placeholder="Brief description of the partner..."
                    rows={3}
                    className="resize-none"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400">{errors.description.message}</p>
                  )}
                </div>

                {/* Status */}
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
                  <Label htmlFor="p-phone" className="text-xs font-semibold tracking-widest uppercase">
                    Phone
                  </Label>
                  <Input id="p-phone" placeholder="01XXXXXXXXX" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="p-email" className="text-xs font-semibold tracking-widest uppercase">
                    Email
                  </Label>
                  <Input
                    id="p-email"
                    type="email"
                    placeholder="contact@partner.com"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="p-website" className="text-xs font-semibold tracking-widest uppercase">
                    Website
                  </Label>
                  <Input
                    id="p-website"
                    type="url"
                    placeholder="https://partner.com"
                    {...register("website")}
                  />
                  {errors.website && <p className="text-xs text-red-400">{errors.website.message}</p>}
                </div>

              </div>
            </div>

            <Separator />

            {/* ── Logo ── */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold tracking-widest uppercase">
                Partner Logo{" "}
                <span className="text-[#96999A] normal-case font-normal">(optional)</span>
              </Label>
              {logoPreview ? (
                <div className="relative flex items-center gap-3 rounded-md border border-slate-200 dark:border-slate-700 p-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-14 w-14 rounded-lg object-contain border border-slate-200 dark:border-slate-700 bg-white p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 truncate">{logoFile?.name}</p>
                    <p className="text-xs text-slate-400">
                      {logoFile ? (logoFile.size / 1024).toFixed(1) + " KB" : ""}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    type="button"
                    size="sm"
                    onClick={clearLogo}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="partner-logo-upload"
                  className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-6 cursor-pointer transition-colors"
                >
                  <Upload className="h-6 w-6 text-slate-400" />
                  <div className="text-center">
                    <p className="text-sm text-slate-500">Click to upload a logo</p>
                    <p className="text-xs text-slate-400">PNG, JPG, SVG, WEBP — max 2MB</p>
                  </div>
                  <input
                    id="partner-logo-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
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
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Handshake className="h-4 w-4" />
                  Create Partner
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}