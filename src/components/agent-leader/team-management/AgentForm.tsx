/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save, Upload, X, Eye, EyeOff } from "lucide-react";

import {
  agentCreateSchema,
  agentUpdateSchema,
  AgentCreateInput,
  AgentUpdateInput,
} from "@/schemas/agent.schema";
import { IsActive } from "@/types/user.types";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetSingleUserQuery,
  useGetMeQuery,
} from "@/redux/features/user/user.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface AgentFormProps {
  mode: "create" | "edit";
  agentId?: string; // required when mode === "edit"
}

export function AgentForm({ mode, agentId }: AgentFormProps) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [createAgent, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateAgent, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data: me } = useGetMeQuery();

  const {
    data: agentData,
    isLoading: isFetching,
    isError: isFetchError,
  } = useGetSingleUserQuery(agentId as string, {
    skip: mode !== "edit" || !agentId,
  });

  const schema = mode === "create" ? agentCreateSchema : agentUpdateSchema;
  type FormValues = AgentCreateInput | AgentUpdateInput;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      isActive: true,
      salary: undefined,
      salaryPerCustomer: undefined,
      division: "",
      district: "",
      thana: "",
      union: "",
      ...(mode === "create"
        ? { password: "", confirmPassword: "" }
        : { newPassword: "", confirmNewPassword: "" }),
    } as any,
  });

  // Populate form once the agent record loads (edit mode only)
  useEffect(() => {
    if (mode === "edit" && agentData) {
      const item = agentData;
      reset({
        name: item?.data?.name ?? "",
        phone: item?.data?.phone ?? "",
        email: item?.data?.email ?? "",
        isActive: item?.data?.isActive === IsActive.ACTIVE,
        salary: item?.data?.salary ? Number(item?.data?.salary) : undefined,
        salaryPerCustomer: item?.data?.salaryPerCustomer
          ? Number(item?.data?.salaryPerCustomer)
          : undefined,
        division: item?.data?.address?.division ?? "",
        district: item?.data?.address?.district ?? "",
        thana: item?.data?.address?.thana ?? "",
        union: item?.data?.address?.union ?? "",
        newPassword: "",
        confirmNewPassword: "",
      } as any);
      setTimeout(() => {
        setImagePreview(item?.data?.picture ?? null);
      }, 100);
    }
  }, [mode, agentData, reset]);

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
    setImagePreview(
      mode === "edit" ? (agentData?.data?.picture ?? null) : null,
    );
  };

  const onSubmit = async (data: any) => {
    try {
      const basePayload: Record<string, any> = {
        name: data.name,
        phone: data.phone,
        ...(data.email && { email: data.email }),
        agentLeader: me?.data?._id,
        isActive: data.isActive ? IsActive.ACTIVE : IsActive.INACTIVE,
        ...(data.salary !== undefined && { salary: String(data.salary) }),
        ...(data.salaryPerCustomer !== undefined && {
          salaryPerCustomer: String(data.salaryPerCustomer),
        }),
        address: {
          division: data.division || "",
          district: data.district || "",
          thana: data.thana || "",
          union: data.union || "",
        },
      };

      const formData = new FormData();

      if (mode === "create") {
        const payload = {
          ...basePayload,
          role: "AGENT",
          password: data.password,
        };
        formData.append("data", JSON.stringify(payload));
        if (imageFile) formData.append("picture", imageFile);

        await createAgent(formData).unwrap();
        toast.success("Agent created successfully");
        router.push("/agent-leader/my-agents");
      } else {
        const payload = { ...basePayload };
        if (data.newPassword && data.newPassword.trim().length > 0) {
          payload.password = data.newPassword;
        }
        formData.append("data", JSON.stringify(payload));
        if (imageFile) formData.append("picture", imageFile);

        await updateAgent({ id: agentId as string, data: formData }).unwrap();
        toast.success("Agent updated successfully");
        router.push("/agent-leader/my-agents");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  const isSubmitting = isCreating || isUpdating;

  if (mode === "edit" && isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading agent information...</p>
      </div>
    );
  }

  if (mode === "edit" && (isFetchError || !agentData)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Agent Not Found
          </h3>
          <p className="text-sm text-muted-foreground">
            The agent you are trying to edit does not exist or could not be
            loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="border border-border rounded-xl shadow-sm p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "create" ? "Add New Agent" : "Edit Agent"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Create a new agent account in your team"
              : "Update agent information"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Personal Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-name"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="agent-name"
                  placeholder="Enter agent name"
                  disabled={isSubmitting}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-phone"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="agent-phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  disabled={isSubmitting}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label
                  htmlFor="agent-email"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Email{" "}
                  <span className="text-muted-foreground normal-case font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="agent-email"
                  type="email"
                  placeholder="example@email.com"
                  disabled={isSubmitting}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Status */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">
                Agent Status
              </Label>
              <p className="text-xs text-muted-foreground">
                Enable or disable this agent account
              </p>
            </div>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
          </div>

          <Separator />

          {/* Compensation */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Compensation{" "}
              <span className="text-muted-foreground normal-case font-normal">
                (optional)
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-salary"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Monthly Salary (BDT)
                </Label>
                <Input
                  id="agent-salary"
                  type="number"
                  min={0}
                  placeholder="e.g. 15000"
                  disabled={isSubmitting}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  {...register("salary")}
                />
                {errors.salary && (
                  <p className="text-xs text-destructive">
                    {errors.salary.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-per-customer"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Salary Per Customer (BDT)
                </Label>
                <Input
                  id="agent-per-customer"
                  type="number"
                  min={0}
                  placeholder="e.g. 200"
                  disabled={isSubmitting}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  {...register("salaryPerCustomer")}
                />
                {errors.salaryPerCustomer && (
                  <p className="text-xs text-destructive">
                    {errors.salaryPerCustomer.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Address{" "}
              <span className="text-muted-foreground normal-case font-normal">
                (optional)
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-division"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Division
                </Label>
                <Input
                  id="agent-division"
                  placeholder="e.g. Dhaka"
                  disabled={isSubmitting}
                  {...register("division")}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-district"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  District
                </Label>
                <Input
                  id="agent-district"
                  placeholder="e.g. Dhaka"
                  disabled={isSubmitting}
                  {...register("district")}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-thana"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Thana
                </Label>
                <Input
                  id="agent-thana"
                  placeholder="e.g. Mirpur"
                  disabled={isSubmitting}
                  {...register("thana")}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-union"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  Union / Ward
                </Label>
                <Input
                  id="agent-union"
                  placeholder="e.g. Ward-10"
                  disabled={isSubmitting}
                  {...register("union")}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Profile Picture */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold tracking-widest uppercase">
              Profile Picture{" "}
              <span className="text-muted-foreground normal-case font-normal">
                (optional)
              </span>
            </Label>
            {imagePreview ? (
              <div className="relative flex items-center gap-3 rounded-md border border-border p-2">
                <Image
                  width={56}
                  height={56}
                  priority
                  quality={90}
                  src={imagePreview}
                  alt="Preview"
                  className="h-14 w-14 rounded-full object-cover shrink-0 border-2 border-border"
                />
                <div className="flex-1 min-w-0">
                  {imageFile ? (
                    <>
                      <p className="text-xs text-muted-foreground truncate">
                        {imageFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(imageFile.size / 1024).toFixed(1)} KB
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Current profile photo
                    </p>
                  )}
                </div>
                <Button
                  variant="destructive"
                  type="button"
                  size="sm"
                  onClick={clearImage}
                  className="shrink-0"
                  disabled={isSubmitting}
                >
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
                  <p className="text-sm text-muted-foreground">
                    Click to upload a photo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WEBP — max 2MB
                  </p>
                </div>
                <input
                  id="agent-image-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                />
              </label>
            )}
          </div>

          <Separator />

          {/* Password */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">
              {mode === "create" ? "Account Security" : "Change Password"}
            </p>
            {mode === "edit" && (
              <p className="text-xs text-muted-foreground mb-3">
                Leave blank to keep the current password
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-password"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  {mode === "create" ? (
                    <>
                      Password <span className="text-red-500">*</span>
                    </>
                  ) : (
                    "New Password"
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="agent-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    className="pr-10"
                    disabled={isSubmitting}
                    {...register(
                      mode === "create" ? "password" : "newPassword",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {mode === "create" && (errors as any).password && (
                  <p className="text-xs text-destructive">
                    {(errors as any).password.message}
                  </p>
                )}
                {mode === "edit" && (errors as any).newPassword && (
                  <p className="text-xs text-destructive">
                    {(errors as any).newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="agent-confirm-password"
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  {mode === "create" ? (
                    <>
                      Confirm Password <span className="text-red-500">*</span>
                    </>
                  ) : (
                    "Confirm New Password"
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="agent-confirm-password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter password"
                    className="pr-10"
                    disabled={isSubmitting}
                    {...register(
                      mode === "create"
                        ? "confirmPassword"
                        : "confirmNewPassword",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {mode === "create" && (errors as any).confirmPassword && (
                  <p className="text-xs text-destructive">
                    {(errors as any).confirmPassword.message}
                  </p>
                )}
                {mode === "edit" && (errors as any).confirmNewPassword && (
                  <p className="text-xs text-destructive">
                    {(errors as any).confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isSubmitting || (mode === "edit" && !isDirty && !imageFile)
              }
              className="gap-2 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {mode === "create" ? "Create Agent" : "Update Agent"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
