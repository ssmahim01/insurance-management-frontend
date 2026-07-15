/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, UserCog, Upload, X, Eye, EyeOff } from "lucide-react";

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
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useCreateUserMutation, useGetMeQuery } from "@/redux/features/user/user.api";
import { divisions, getDistrictsByDivision, getUpazilasByDistrict } from "@/lib/bd-address";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const createAgentSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    phone: z.string().min(11, "Enter a valid phone number").max(15),
    email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
    salary: z.preprocess(
      (val) => (val !== "" && val !== undefined ? Number(val) : undefined),
      z.number().min(0, "Must be 0 or more").optional(),
    ),
    salaryPerCustomer: z.preprocess(
      (val) => (val !== "" && val !== undefined ? Number(val) : undefined),
      z.number().min(0, "Must be 0 or more").optional(),
    ),
    division: z.string().optional(),
    district: z.string().optional(),
    thana: z.string().optional(),
    street: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateAgentFormValues = z.infer<typeof createAgentSchema>;

interface CreateAgentModalProps {
  onSuccess?: () => void;
}

export function CreateAgentModal({ onSuccess }: CreateAgentModalProps) {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [thanaId, setThanaId] = useState("");

  const availableDistricts = useMemo(() => getDistrictsByDivision(divisionId), [divisionId]);
  const availableUpazilas = useMemo(() => getUpazilasByDistrict(districtId), [districtId]);

  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: me } = useGetMeQuery();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateAgentFormValues>({
    resolver: zodResolver(createAgentSchema as any),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      salary: undefined,
      salaryPerCustomer: undefined,
      division: "",
      district: "",
      thana: "",
      street: "",
      password: "",
      confirmPassword: "",
    },
  });

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

  const handleDivisionChange = (id: string | null) => {
    const value = id ?? "";
    const division = divisions.find((d) => d.id === value);
    setDivisionId(value);
    setDistrictId("");
    setThanaId("");
    setValue("division", division?.name ?? "", { shouldValidate: true });
    setValue("district", "", { shouldValidate: true });
    setValue("thana", "", { shouldValidate: true });
  };

  const handleDistrictChange = (id: string | null) => {
    const value = id ?? "";
    const district = availableDistricts.find((d) => d.id === value);
    setDistrictId(value);
    setThanaId("");
    setValue("district", district?.name ?? "", { shouldValidate: true });
    setValue("thana", "", { shouldValidate: true });
  };

  const handleThanaChange = (id: string | null) => {
    const value = id ?? "";
    const upazila = availableUpazilas.find((u) => u.id === value);
    setThanaId(value);
    setValue("thana", upazila?.name ?? "", { shouldValidate: true });
  };

  const handleClose = () => {
    reset();
    clearImage();
    setShowPassword(false);
    setShowConfirmPassword(false);
    setDivisionId("");
    setDistrictId("");
    setThanaId("");
    setOpen(false);
  };

  const onSubmit = async (data: CreateAgentFormValues) => {
    if (!me?.data?._id) {
      toast.error("Could not determine your account. Please refresh and try again.");
      return;
    }
    try {
      const formData = new FormData();
      const payload = {
        name: data.name,
        phone: data.phone,
        ...(data.email && { email: data.email }),
        password: data.password,
        role: "AGENT",
        agentLeader: me.data._id,
        ...(data.salary !== undefined && { salary: String(data.salary) }),
        ...(data.salaryPerCustomer !== undefined && {
          salaryPerCustomer: String(data.salaryPerCustomer),
        }),
        address: {
          division: data.division || "",
          district: data.district || "",
          thana: data.thana || "",
          street: data.street || "",
        },
      };
      formData.append("data", JSON.stringify(payload));
      if (imageFile) formData.append("picture", imageFile);

      await createUser(formData).unwrap();
      toast.success("Agent created successfully!");
      handleClose();
      onSuccess?.();
    } catch (error) {
      const message =
        error && typeof error === "object" && "data" in error
          ? ((error as { data?: { message?: string } }).data?.message ?? "Failed to create agent")
          : "Failed to create agent";
      toast.error(message);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"default"} className="group hover:cursor-pointer border-indigo-600 text-white bg-indigo-700 hover:bg-indigo-800 hover:shadow-xl hover:text-white duration-500 dark:text-white mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60 hover:scale-105 transition-transform ease-in-out flex gap-2 items-center">
        <Plus className="h-4 w-4" />
        Add Agent
      </Button>

      <Dialog open={open} onOpenChange={(val) => (val ? setOpen(true) : handleClose())}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] p-4">
        <ScrollArea className={"max-h-[85vh]"}>
          <DialogHeader className="flex flex-col items-center gap-2 pb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md mb-1">
              <UserCog className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-widest uppercase">
              Add New Agent
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm tracking-wide">
              Fill in the agent&apos;s information below
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1 pr-2">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Personal Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="a-name" className="text-xs font-semibold tracking-widest uppercase">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="a-name" placeholder="e.g. Md. Rafiqul Islam" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="a-phone" className="text-xs font-semibold tracking-widest uppercase">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input id="a-phone" placeholder="01XXXXXXXXX" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="a-email" className="text-xs font-semibold tracking-widest uppercase">
                    Email <span className="text-muted-foreground normal-case font-normal">(optional)</span>
                  </Label>
                  <Input id="a-email" type="email" placeholder="example@email.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Compensation <span className="text-muted-foreground normal-case font-normal">(optional)</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="a-salary" className="text-xs font-semibold tracking-widest uppercase">
                    Monthly Salary (BDT)
                  </Label>
                  <Input
                    id="a-salary"
                    type="number"
                    min={0}
                    placeholder="e.g. 15000"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    {...register("salary")}
                  />
                  {errors.salary && <p className="text-xs text-red-400">{errors.salary.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="a-per-customer" className="text-xs font-semibold tracking-widest uppercase">
                    Salary Per Customer (BDT)
                  </Label>
                  <Input
                    id="a-per-customer"
                    type="number"
                    min={0}
                    placeholder="e.g. 500"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    {...register("salaryPerCustomer")}
                  />
                  {errors.salaryPerCustomer && (
                    <p className="text-xs text-red-400">{errors.salaryPerCustomer.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Address <span className="text-muted-foreground normal-case font-normal">(optional)</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold tracking-widest uppercase">Division</Label>
                  <Select value={divisionId} onValueChange={handleDivisionChange}>
                    <SelectTrigger className="w-full">
                      <span className="text-sm">
                        {divisionId ? divisions.find((d) => d.id === divisionId)?.name : "Select Division"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold tracking-widest uppercase">District</Label>
                  <Select value={districtId} onValueChange={handleDistrictChange} disabled={!divisionId}>
                    <SelectTrigger className="w-full">
                      <span className="text-sm">
                        {districtId ? availableDistricts.find((d) => d.id === districtId)?.name : "Select District"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold tracking-widest uppercase">Thana</Label>
                  <Select value={thanaId} onValueChange={handleThanaChange} disabled={!districtId}>
                    <SelectTrigger className="w-full">
                      <span className="text-sm">
                        {thanaId ? availableUpazilas.find((u) => u.id === thanaId)?.name : "Select Thana"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {availableUpazilas.map((u) => (
                        <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="a-street" className="text-xs font-semibold tracking-widest uppercase">
                    Street
                  </Label>
                  <Input id="a-street" placeholder="e.g. Dhaka, 1230" {...register("street")} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold tracking-widest uppercase">
                Profile Picture <span className="text-muted-foreground normal-case font-normal">(optional)</span>
              </Label>
              {imagePreview ? (
                <div className="relative flex items-center gap-3 rounded-md border border-border p-2">
                  <Image
                  priority
                  quality={90}
                  width={300}
                  height={300}
                    src={imagePreview}
                    alt="Preview"
                    className="h-14 w-14 rounded-full object-cover shrink-0 border-2 border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{imageFile?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {imageFile ? (imageFile.size / 1024).toFixed(1) + " KB" : ""}
                    </p>
                  </div>
                  <Button variant="destructive" type="button" size="sm" onClick={clearImage} className="shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="agent-image-upload"
                  className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border hover:bg-muted/40 px-4 py-6 cursor-pointer transition-colors"
                >
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Click to upload a photo</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP — max 2MB</p>
                  </div>
                  <input
                    id="agent-image-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <Separator />

            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Account Security
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="a-password" className="text-xs font-semibold tracking-widest uppercase">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="a-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      className="pr-10"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="a-confirm-password" className="text-xs font-semibold tracking-widest uppercase">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="a-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="pr-10"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant="outline"
              className="group hover:cursor-pointer border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white duration-300 w-full mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  Create Agent
                </span>
              )}
            </Button>
          </form>
        <ScrollBar orientation="vertical" />
        </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}