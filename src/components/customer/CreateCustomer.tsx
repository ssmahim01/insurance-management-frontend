"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Users, Upload, X, Eye, EyeOff } from "lucide-react";

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
import {
  useCreateUserMutation,
  useGetAllAgentsQuery,
} from "@/redux/features/user/user.api";
import { IUser } from "@/types/user.types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const createCustomerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    phone: z.string().min(11, "Enter a valid phone number").max(15),
    email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
    nid: z.string().optional().or(z.literal("")),
    dateOfBirth: z.string().optional().or(z.literal("")),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    // Nominee
    nomineeName: z.string().optional().or(z.literal("")),
    nomineeAge: z.preprocess(
      (val) => (val !== "" && val !== undefined ? Number(val) : undefined),
      z.number().min(1).optional(),
    ),
    nomineeRelationship: z.string().optional().or(z.literal("")),
    nomineePhone: z.string().optional().or(z.literal("")),
    // Address
    division: z.string().optional(),
    district: z.string().optional(),
    thana: z.string().optional(),
    union: z.string().optional(),
    // Auth
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateCustomerFormValues = z.infer<typeof createCustomerSchema>;

interface CreateCustomerModalProps {
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreateCustomerModal({ onSuccess }: CreateCustomerModalProps) {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: agentsData } = useGetAllAgentsQuery({ limit: 200 });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateCustomerFormValues>({
    resolver: zodResolver(createCustomerSchema) as any,
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      nid: "",
      dateOfBirth: "",
      gender: undefined,
      nomineeName: "",
      nomineeAge: undefined,
      nomineeRelationship: "",
      nomineePhone: "",
      division: "",
      district: "",
      thana: "",
      union: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedGender = watch("gender");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const handleClose = () => {
    reset();
    clearImage();
    setShowPassword(false);
    setShowConfirmPassword(false);
    setOpen(false);
  };

  const onSubmit = async (data: CreateCustomerFormValues) => {
    try {
      const formData = new FormData();
      const payload = {
        name: data.name,
        phone: data.phone,
        role: "CUSTOMER",
        ...(data.email        && { email: data.email }),
        ...(data.nid          && { nid: data.nid }),
        ...(data.dateOfBirth  && { dateOfBirth: data.dateOfBirth }),
        ...(data.gender       && { gender: data.gender }),
        password: data.password,
        address: {
          division: data.division || "",
          district: data.district || "",
          thana:    data.thana    || "",
          union:    data.union    || "",
        },
        nominee: {
          name:         data.nomineeName         || "",
          relationship: data.nomineeRelationship || "",
          phone:        data.nomineePhone        || "",
          ...(data.nomineeAge !== undefined && { age: data.nomineeAge }),
        },
      };
      formData.append("data", JSON.stringify(payload));
      if (imageFile) formData.append("picture", imageFile);

      await createUser(formData).unwrap();
      toast.success("Customer created successfully!");
      handleClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create customer");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add Customer
      </Button>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          if (!val) handleClose();
          else setOpen(true);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="flex flex-col items-center gap-2 pb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-md mb-1">
              <Users className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-widest uppercase">
              Add New Customer
            </DialogTitle>
            <DialogDescription className="text-[#96999A] text-sm tracking-wide">
              Fill in the customer&apos;s information below
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

            {/* ── Personal Information ── */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Personal Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="space-y-1.5">
                  <Label htmlFor="c-name" className="text-xs font-semibold tracking-widest uppercase">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="c-name" placeholder="e.g. Md. Karim Mia" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-phone" className="text-xs font-semibold tracking-widest uppercase">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input id="c-phone" placeholder="01XXXXXXXXX" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-email" className="text-xs font-semibold tracking-widest uppercase">
                    Email{" "}
                    <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                  </Label>
                  <Input id="c-email" type="email" placeholder="example@email.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-nid" className="text-xs font-semibold tracking-widest uppercase">
                    NID Number{" "}
                    <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                  </Label>
                  <Input id="c-nid" placeholder="e.g. 1234567890" {...register("nid")} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-dob" className="text-xs font-semibold tracking-widest uppercase">
                    Date of Birth{" "}
                    <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                  </Label>
                  <Input id="c-dob" type="date" {...register("dateOfBirth")} />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold tracking-widest uppercase">
                    Gender{" "}
                    <span className="text-[#96999A] normal-case font-normal">(optional)</span>
                  </Label>
                  <Select
                    value={selectedGender ?? ""}
                    onValueChange={(v) =>
                      setValue("gender", v as "MALE" | "FEMALE" | "OTHER", { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <span className="text-sm">
                        {selectedGender
                          ? { MALE: "Male", FEMALE: "Female", OTHER: "Other" }[selectedGender]
                          : "Select gender"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </div>

            <Separator />

            {/* ── Nominee Information ── */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Nominee Information{" "}
                <span className="text-[#96999A] normal-case font-normal">(optional)</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="space-y-1.5">
                  <Label htmlFor="c-nominee-name" className="text-xs font-semibold tracking-widest uppercase">
                    Nominee Name
                  </Label>
                  <Input id="c-nominee-name" placeholder="e.g. Fatema Begum" {...register("nomineeName")} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-nominee-relationship" className="text-xs font-semibold tracking-widest uppercase">
                    Relationship
                  </Label>
                  <Input id="c-nominee-relationship" placeholder="e.g. Wife, Son, Father" {...register("nomineeRelationship")} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-nominee-phone" className="text-xs font-semibold tracking-widest uppercase">
                    Nominee Phone
                  </Label>
                  <Input id="c-nominee-phone" placeholder="01XXXXXXXXX" {...register("nomineePhone")} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-nominee-age" className="text-xs font-semibold tracking-widest uppercase">
                    Nominee Age
                  </Label>
                  <Input id="c-nominee-age" type="number" min={1} placeholder="e.g. 35" {...register("nomineeAge")} />
                  {errors.nomineeAge && <p className="text-xs text-red-400">{errors.nomineeAge.message}</p>}
                </div>

              </div>
            </div>

            <Separator />

            {/* ── Address ── */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Address{" "}
                <span className="text-[#96999A] normal-case font-normal">(optional)</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="c-division" className="text-xs font-semibold tracking-widest uppercase">Division</Label>
                  <Input id="c-division" placeholder="e.g. Dhaka" {...register("division")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-district" className="text-xs font-semibold tracking-widest uppercase">District</Label>
                  <Input id="c-district" placeholder="e.g. Dhaka" {...register("district")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-thana" className="text-xs font-semibold tracking-widest uppercase">Thana</Label>
                  <Input id="c-thana" placeholder="e.g. Mirpur" {...register("thana")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-union" className="text-xs font-semibold tracking-widest uppercase">Union / Ward</Label>
                  <Input id="c-union" placeholder="e.g. Ward-10" {...register("union")} />
                </div>
              </div>
            </div>

            <Separator />

            {/* ── Profile Picture ── */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold tracking-widest uppercase">
                Profile Picture{" "}
                <span className="text-[#96999A] normal-case font-normal">(optional)</span>
              </Label>
              {imagePreview ? (
                <div className="relative flex items-center gap-3 rounded-md border border-slate-200 dark:border-slate-700 p-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-14 w-14 rounded-full object-cover shrink-0 border-2 border-slate-200 dark:border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 truncate">{imageFile?.name}</p>
                    <p className="text-xs text-slate-400">
                      {imageFile ? (imageFile.size / 1024).toFixed(1) + " KB" : ""}
                    </p>
                  </div>
                  <Button variant="destructive" type="button" size="sm" onClick={clearImage} className="shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="customer-image-upload"
                  className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-6 cursor-pointer transition-colors"
                >
                  <Upload className="h-6 w-6 text-slate-400" />
                  <div className="text-center">
                    <p className="text-sm text-slate-500">Click to upload a photo</p>
                    <p className="text-xs text-slate-400">PNG, JPG, WEBP — max 2MB</p>
                  </div>
                  <input
                    id="customer-image-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <Separator />

            {/* ── Account Security ── */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Account Security
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="space-y-1.5">
                  <Label htmlFor="c-password" className="text-xs font-semibold tracking-widest uppercase">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="c-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      className="pr-10"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-confirm-password" className="text-xs font-semibold tracking-widest uppercase">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="c-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="pr-10"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
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
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Create Customer
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}