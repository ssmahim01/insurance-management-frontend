"use client";

import Image from "next/image";
import {
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  Cake,
  IdCard,
  BadgeCheck,
  Pencil,
  KeyRound,
} from "lucide-react";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { Button } from "@/components/ui/button";
import UpdateProfileModal from "./UpdateProfileModal";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ProfilePage() {
  const { data, isLoading, isError } = useGetMeQuery();
  const user = data?.data;
  console.log(user);
  const [openModal, setOpenModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-48 rounded-2xl bg-muted" />
          <div className="h-40 rounded-2xl bg-muted" />
          <div className="h-40 rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center text-muted-foreground">
        প্রোফাইল তথ্য লোড করতে সমস্যা হয়েছে।
      </div>
    );
  }

  const address = user.address;

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      {/* Header Card */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border bg-background shadow-sm">
        {/* Cover / gradient banner */}
        <div className="h-28 w-full bg-linear-to-r from-primary/80 via-primary to-primary/60 sm:h-32" />

        <div className="relative flex flex-col items-center px-6 pb-6 sm:flex-row sm:items-end sm:gap-5">
          {/* Avatar overlapping the banner */}
          <div className="relative -mt-14 h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md sm:-mt-12 sm:h-24 sm:w-24">
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="mt-3 flex-1 text-center sm:mt-0 sm:pb-1 sm:text-left">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                <BadgeCheck className="h-3.5 w-3.5" />
                {user.role?.replace("_", " ")}
              </span>
              {user.customId && (
                <span className="text-xs text-muted-foreground">
                  ID: {user.customId}
                </span>
              )}
            </div>
          </div>

          {/* Update button */}
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:pb-1">
            <Button
              onClick={() => setOpenModal(true)}
              className="btn-bg cursor-pointer gap-2 text-white"
            >
              <Pencil className="h-4 w-4" />
              Update Profile
            </Button>

            <Button
              variant="outline"
              onClick={() => setOpenPasswordModal(true)}
              className="cursor-pointer gap-2"
            >
              <KeyRound className="h-4 w-4" />
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <section className="mb-4 rounded-2xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InfoItem
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={user.phone}
          />
          <InfoItem
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={user.email}
          />
          <InfoItem
            icon={<IdCard className="h-4 w-4" />}
            label="NID"
            value={user.nid}
          />
          <InfoItem
            icon={<Cake className="h-4 w-4" />}
            label="Date of Birth"
            value={
              user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString("en-GB")
                : undefined
            }
          />
          <InfoItem
            icon={<UserIcon className="h-4 w-4" />}
            label="Gender"
            value={user.gender}
          />
        </div>
      </section>

      {/* Address */}
      {address && (
        <section className="rounded-2xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Address
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem label="Division" value={address.division} />
            <InfoItem label="District" value={address.district} />
            <InfoItem label="Thana" value={address.thana} />
            <InfoItem label="Union" value={address?.street} />
          </div>
        </section>
      )}
      <UpdateProfileModal
        user={user}
        open={openModal}
        onOpenChange={setOpenModal}
      />
      
      <ChangePasswordModal 
      open={openPasswordModal} 
      onOpenChange={setOpenPasswordModal} 
       />
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
      {icon && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
      )}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value || "—"}</p>
      </div>
    </div>
  );
}
