"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { IUser } from "@/types/user.types";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api";
import {
  divisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from "@/lib/bd-address";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface ProfileFormValues {
  name: string;
  email: string;
  nid: string;
  dateOfBirth: string;
  gender: string;
}

type Props = {
  user: IUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function UpdateProfileModal({
  user,
  open,
  onOpenChange,
}: Props) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [preview, setPreview] = useState<string | null>(user?.picture || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [thanaId, setThanaId] = useState("");

  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [thanaName, setThanaName] = useState("");
  const [street, setStreet] = useState("");

  const availableDistricts = useMemo(
    () => getDistrictsByDivision(divisionId),
    [divisionId],
  );
  const availableUpazilas = useMemo(
    () => getUpazilasByDistrict(districtId),
    [districtId],
  );

  const { register, reset, handleSubmit } = useForm<ProfileFormValues>();

  useEffect(() => {
    if (!open) return;

    reset({
      name: user?.name || "",
      email: user?.email || "",
      nid: user?.nid || "",
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
      gender: user?.gender || "",
    });

    setTimeout(() => {
      setPreview(user?.picture || null);
      setImageFile(null);
    }, 200);

    const existingDivisionName = user?.address?.division || "";
    const existingDivision = divisions.find(
      (d) => d.name === existingDivisionName,
    );
    const existingDivisionId = existingDivision?.id ?? "";

    const existingDistrictName = user?.address?.district || "";
    const districtsForDivision = getDistrictsByDivision(existingDivisionId);
    const existingDistrict = districtsForDivision.find(
      (d) => d.name === existingDistrictName,
    );
    const existingDistrictId = existingDistrict?.id ?? "";

    const existingThanaName = user?.address?.thana || "";
    const upazilasForDistrict = getUpazilasByDistrict(existingDistrictId);
    const existingThana = upazilasForDistrict.find(
      (u) => u.name === existingThanaName,
    );
    const existingThanaId = existingThana?.id ?? "";

  setTimeout(() => {
      setDivisionId(existingDivisionId);
    setDistrictId(existingDistrictId);
    setThanaId(existingThanaId);

    setDivisionName(existingDivisionName);
    setDistrictName(existingDistrictName);
    setThanaName(existingThanaName);
    setStreet(user?.address?.street || "");
  }, 200);
  }, [open, reset, user]);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDivisionChange = (id: string | null) => {
    const value = id ?? "";
    const division = divisions.find((d) => d.id === value);
    setDivisionId(value);
    setDistrictId("");
    setThanaId("");
    setDivisionName(division?.name ?? "");
    setDistrictName("");
    setThanaName("");
  };

  const handleDistrictChange = (id: string | null) => {
    const value = id ?? "";
    const district = availableDistricts.find((d) => d.id === value);
    setDistrictId(value);
    setThanaId("");
    setDistrictName(district?.name ?? "");
    setThanaName("");
  };

  const handleThanaChange = (id: string | null) => {
    const value = id ?? "";
    const upazila = availableUpazilas.find((u) => u.id === value);
    setThanaId(value);
    setThanaName(upazila?.name ?? "");
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const payload: Record<string, unknown> = {
        name: values.name,
        ...(values.email && { email: values.email }),
        ...(values.nid && { nid: values.nid }),
        ...(values.dateOfBirth && { dateOfBirth: values.dateOfBirth }),
        ...(values.gender && { gender: values.gender }),
        address: {
          division: divisionName,
          district: districtName,
          thana: thanaName,
          street,
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (imageFile) formData.append("picture", imageFile);

      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      onOpenChange(false);
    } catch (error) {
      const message =
        error && typeof error === "object" && "data" in error
          ? ((error as { data?: { message?: string } }).data?.message ??
            "Failed to update profile")
          : "Failed to update profile";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-gray-100 dark:bg-slate-950">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border">
                {preview ? (
                  <Image
                    src={preview}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold">
                    {user?.name?.charAt(0)}
                  </div>
                )}

                <label
                  htmlFor="picture"
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100"
                >
                  <Pencil className="h-5 w-5 text-white" />
                </label>

                <input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagePreview}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input {...register("name")} />
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
              </div>

              <div>
                <Label>NID</Label>
                <Input {...register("nid")} />
              </div>

              <div>
                <Label>Date of Birth</Label>
                <Input type="date" {...register("dateOfBirth")} />
              </div>

              <div>
                <Label>Gender</Label>
                <select
                  className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
                  {...register("gender")}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Address</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Division</Label>
                  <Select
                    value={divisionId}
                    onValueChange={handleDivisionChange}
                  >
                    <SelectTrigger className="w-full">
                      <span className="text-sm">
                        {divisionId
                          ? divisions.find((d) => d.id === divisionId)?.name
                          : "Select Division"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>District</Label>
                  <Select
                    value={districtId}
                    onValueChange={handleDistrictChange}
                    disabled={!divisionId}
                  >
                    <SelectTrigger className="w-full">
                      <span className="text-sm">
                        {districtId
                          ? availableDistricts.find((d) => d.id === districtId)
                              ?.name
                          : "Select District"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Thana</Label>
                  <Select
                    value={thanaId}
                    onValueChange={handleThanaChange}
                    disabled={!districtId}
                  >
                    <SelectTrigger className="w-full">
                      <span className="text-sm">
                        {thanaId
                          ? availableUpazilas.find((u) => u.id === thanaId)
                              ?.name
                          : "Select Thana"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {availableUpazilas.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
