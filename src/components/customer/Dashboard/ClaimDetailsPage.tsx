/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, Circle, FileText, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetSingleClaimQuery,
  useUpdateClaimMutation,
} from "@/redux/features/claim/claim.api";
import { CustomerPortalHeader } from "./CustomerPortalHeader";
import { formatDateTime } from "@/lib/utils/customer-portal-format";
import { ClaimStatus } from "@/types/claim.types";
import Link from "next/link";
import { BackToDashboardSection } from "@/components/shared/dashboard/BackToDashboardSection";

interface ClaimDetailsPageProps {
  id: string;
}

export function ClaimDetailsPage({ id }: ClaimDetailsPageProps) {
  const { data, isLoading, isError } = useGetSingleClaimQuery(id);
  const claim = data?.data;

  return (
    <div className="min-h-screen">
        
      <div className="mx-auto container">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96 w-full rounded-2xl lg:col-span-2" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        ) : isError || !claim ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-8 text-center text-red-600 dark:text-red-400">
            Couldn&apos;t load this claim. It may have been removed.
          </div>
        ) : (
          <>
           <BackToDashboardSection />
            <ClaimDetailsContent claim={claim as any} />
          </>
        )}
      </div>
    </div>
  );
}

function ClaimDetailsContent({ claim }: { claim: any }) {
  const [files, setFiles] = useState<File[]>([]);
  const [updateClaim, { isLoading: isUploading }] = useUpdateClaimMutation();

  const subscription = claim.subscription;
  const pkg = subscription?.package;
  const customer = claim.customer;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setFiles(Array.from(list));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("attachments", f));
      await updateClaim({ id: claim._id, data: formData }).unwrap();
      toast.success("Documents uploaded");
      setFiles([]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to upload documents");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between bg-linear-to-r from-indigo-600 to-blue-600 px-5 py-4">
            <h3 className="text-base font-bold text-white truncate pr-2">
              {claim.serviceTitle}
            </h3>
            <ClaimStatusBadge status={claim.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
            <Field label="Id" value={String(claim._id).slice(-6)} />
            <Field label="Insurance For" value={customer?.name} />
            <Field label="Package Title" value={pkg?.name} />
            <Field label="Claim Date" value={formatDateTime(claim.createdAt)} />
            <Field
              label="Last Updated"
              value={formatDateTime(claim.updatedAt)}
            />
            {claim.reviewedAt && (
              <Field
                label="Reviewed At"
                value={formatDateTime(claim.reviewedAt)}
              />
            )}
          </div>

          <div className="px-5 pb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
              Description
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {claim.description}
            </p>
          </div>

          {claim.adminNote && (
            <div className="mx-5 mb-5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Admin Note
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {claim.adminNote}
              </p>
            </div>
          )}

          <div className="px-5 pb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Documents
            </p>
            {claim.attachments && claim.attachments.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {claim.attachments.map((url: string, i: number) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 p-3 w-24 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors duration-200"
                  >
                    <FileText className="h-6 w-6 text-indigo-500" />
                    <span className="text-[10px] text-slate-500 truncate w-full text-center">
                      Document {i + 1}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No documents attached.</p>
            )}
          </div>
        </div>

        {claim.status !== ClaimStatus.APPROVED && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Add Additional Documents
            </h3>
            <label
              htmlFor="claim-extra-docs"
              className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-8 cursor-pointer transition-colors"
            >
              <UploadCloud className="h-6 w-6 text-slate-400" />
              <p className="text-sm text-slate-500">
                {files.length > 0
                  ? `${files.length} file(s) selected`
                  : "Drag & drop files here or click to browse"}
              </p>
              <p className="text-xs text-slate-400">
                (Supported formats: JPG, PNG, PDF, DOC, DOCX)
              </p>
              <input
                id="claim-extra-docs"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {files.length > 0 && (
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="mt-3 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 hover:shadow-md active:scale-95"
              >
                {isUploading ? "Uploading..." : "Upload Documents"}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 h-fit">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Claim Progress
        </h3>
        <ClaimProgressStepper status={claim.status} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[11px] text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value ?? "—"}
      </p>
    </div>
  );
}

function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const map: Record<ClaimStatus, { label: string; className: string }> = {
    [ClaimStatus.PENDING]: {
      label: "Processing",
      className: "border-white/30 bg-white/15 text-white",
    },
    [ClaimStatus.APPROVED]: {
      label: "Approved",
      className: "border-white/30 bg-white/15 text-white",
    },
    [ClaimStatus.REJECTED]: {
      label: "Rejected",
      className: "border-white/30 bg-white/15 text-white",
    },
    [ClaimStatus.ALL]: {
      label: "All",
      className: "border-gray-100 bg-gray-100 text-gray-500",
    },
  };
  const meta = map[status];
  return (
    <Badge variant="outline" className={meta.className}>
      {meta.label}
    </Badge>
  );
}

function ClaimProgressStepper({ status }: { status: ClaimStatus }) {
  const isResolved = status !== ClaimStatus.PENDING;
  const isApproved = status === ClaimStatus.APPROVED;
  const isRejected = status === ClaimStatus.REJECTED;

  const steps = [
    { label: "Submitted", done: true, isFinal: false },
    { label: "Under Review", done: isResolved, isFinal: false },
    {
      label: isRejected
        ? "Rejected"
        : isApproved
          ? "Approved"
          : "Awaiting Decision",
      done: isResolved,
      isFinal: true,
    },
  ];

  return (
    <div className="relative pl-2">
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-6">
        {steps.map((step, i) => {
          const circleColor = step.isFinal
            ? isRejected
              ? "bg-red-600 border-red-600"
              : isApproved
                ? "bg-emerald-600 border-emerald-600"
                : "bg-slate-200 border-slate-300 dark:bg-slate-700 dark:border-slate-600"
            : step.done
              ? "bg-indigo-600 border-indigo-600"
              : "bg-slate-200 border-slate-300 dark:bg-slate-700 dark:border-slate-600";

          const textColor =
            step.isFinal && isRejected
              ? "text-red-600 dark:text-red-400"
              : step.isFinal && isApproved
                ? "text-emerald-600 dark:text-emerald-400"
                : step.done
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-400";

          const showCheck =
            step.done && (!step.isFinal || isApproved || isRejected);

          return (
            <div key={i} className="relative flex items-center gap-3">
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${circleColor}`}
              >
                {showCheck ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Circle className="h-2.5 w-2.5 fill-current text-white" />
                )}
              </div>
              <span className={`text-sm font-semibold ${textColor}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
