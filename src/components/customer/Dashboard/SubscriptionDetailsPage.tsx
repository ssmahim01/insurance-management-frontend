/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  FileText,
  Heart,
  IdCard,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSingleSubscriptionQuery } from "@/redux/features/subscription/subscription.api";
import { CustomerPortalHeader } from "./CustomerPortalHeader";
import {
  formatCurrency,
  formatDate,
  formatPlanLabel,
} from "@/lib/utils/customer-portal-format";
import { SubscriptionStatus } from "@/types/subscription.types";

interface PopulatedPackage {
  _id?: string;
  name: string;
  description?: string;
  coverageAmount?: number;
  // Optional — only rendered if your InsurancePackage model actually stores benefits.
  benefits?: { title: string; amount?: string; description?: string }[];
}
interface PopulatedCustomer {
  _id?: string;
  name?: string;
  phone?: string;
}

interface SubscriptionDetailsPageProps {
  id: string;
}

export function SubscriptionDetailsPage({ id }: SubscriptionDetailsPageProps) {
  const { data, isLoading, isError } = useGetSingleSubscriptionQuery(id);
  const subscription = data?.data;

  return (
    <div className="min-h-screen">
      <div className="mx-auto container">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : isError || !subscription ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-8 text-center text-red-600 dark:text-red-400">
            Couldn&apos;t load this subscription. It may have been removed.
          </div>
        ) : (
          <SubscriptionDetailsContent subscription={subscription as any} />
        )}
      </div>
    </div>
  );
}

function SubscriptionDetailsContent({ subscription }: { subscription: any }) {
  const pkg = subscription.package as PopulatedPackage;
  const customer = subscription.customer as PopulatedCustomer;
  const nominee = subscription.nominee;

  return (
    <div className="space-y-6">
      <div className="mx-auto pb-6">
        <Button
          variant="outline"
          className="gap-2 border-slate-200 dark:border-slate-700"
        >
          <Link
            href="/customer/dashboard"
            className="hover:cursor-pointer flex gap-2 items-center"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Subscription Details" icon={ShieldCheck}>
          <Field label="Insured Person Name" value={customer?.name} />
          <Field label="Package Name" value={pkg?.name} />
          <Field
            label="Number Of People"
            value={String(subscription.joinMember ? 2 : 1)}
          />
          <Field
            label="Price"
            value={`${formatCurrency(subscription.price)} / ${formatPlanLabel(subscription.planType)}`}
          />
          {typeof pkg?.coverageAmount === "number" && (
            <Field
              label="Total Coverage"
              value={formatCurrency(pkg.coverageAmount)}
            />
          )}
          <Field label="Status">
            <StatusBadge status={subscription.status} />
          </Field>
        </SectionCard>

        <SectionCard title="Nominee Information" icon={Heart}>
          {nominee ? (
            <>
              <Field label="Name" value={nominee.name} />
              {nominee.dateOfBirth && (
                <Field
                  label="Date of Birth"
                  value={formatDate(nominee.dateOfBirth)}
                />
              )}
              <Field label="Relationship" value={nominee.relationship} />
              <Field label="Mobile" value={nominee.phone} />
            </>
          ) : (
            <p className="text-sm text-slate-400">
              No nominee information provided.
            </p>
          )}
        </SectionCard>

        <SectionCard title="Payment Details" icon={Banknote}>
          <Field
            label="Subscription Id"
            value={String(subscription._id)}
            mono
          />
          <Field label="Amount" value={formatCurrency(subscription.price)} />
          <Field
            label="Frequency"
            value={formatPlanLabel(subscription.planType)}
          />
          <Field
            label="Start Date"
            value={formatDate(subscription.startDate)}
          />
          <Field
            label="Expiry Date"
            value={
              subscription.isLifetime
                ? "Lifetime"
                : formatDate(subscription.endDate)
            }
          />
          <Field label="Payer" value={customer?.phone} />
          {subscription.transactionId && (
            <Field
              label="Subscription Reference"
              value={subscription.transactionId}
              mono
            />
          )}
        </SectionCard>

        <SectionCard title="Coverage Summary" icon={CreditCard}>
          {pkg?.benefits && pkg.benefits.length > 0 ? (
            <div className="space-y-3">
              {pkg.benefits.map((b, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3"
                >
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {b.title}
                  </p>
                  {b.amount && (
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {b.amount}
                    </p>
                  )}
                  {b.description && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {b.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              Coverage details are not available for this package.
            </p>
          )}
        </SectionCard>
      </div>

      {/* Payment History — the backend does not currently expose a per-customer
          payment ledger endpoint, so this reflects the single payment record
          tied directly to this subscription. */}
      <SectionCard title="Payment History" icon={Banknote} full>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subscription ID</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs">
                  {String(subscription._id).slice(-8)}
                </TableCell>
                <TableCell>{formatDate(subscription.startDate)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{subscription.paymentStatus}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {subscription.transactionId ?? "—"}
                </TableCell>
                <TableCell>{formatCurrency(subscription.price)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  full,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden ${full ? "lg:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 px-5 py-3.5">
        <Icon className="h-4 w-4 text-white" />
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">
          {title}
        </h3>
      </div>
      <div className="p-5 space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  children,
}: {
  label: string;
  value?: string;
  mono?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5 border-b border-slate-50 dark:border-slate-800/60 last:border-0">
      <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">
        {label}
      </span>
      {children ?? (
        <span
          className={`text-sm font-semibold text-slate-800 dark:text-slate-200 text-right ${mono ? "font-mono" : ""}`}
        >
          {value ?? "—"}
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: SubscriptionStatus }) {
  const map: Record<string, string> = {
    ACTIVE:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
    PENDING:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
    EXPIRED:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400",
    CANCELLED:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
  };
  return (
    <Badge variant="outline" className={map[status] ?? ""}>
      {status}
    </Badge>
  );
}
