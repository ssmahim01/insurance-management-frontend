import { format } from "date-fns";
import { Store, MapPin } from "lucide-react";
import { IRecentBranch } from "@/types/dashboard";

interface RecentBranchesListProps {
  items: IRecentBranch[];
}

export function RecentBranchesList({ items }: RecentBranchesListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gray-100 dark:bg-slate-950 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Branches</h3>
        <span className="text-xs text-slate-400">{items.length} shown</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Store className="w-9 h-9 mb-3 opacity-30" />
          <p className="text-sm font-medium">No branches yet</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((branch) => {
            const location = [branch.address, branch.city].filter(Boolean).join(", ");
            return (
              <li
                key={branch._id}
                className="flex items-center gap-3 px-5 py-3.5 transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  {branch.partner?.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={branch.partner.logo}
                      alt={branch.partner.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Store className="h-4.5 w-4.5 text-slate-400" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {branch.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{branch.partner?.name ?? "—"}</p>
                  {location && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{location}</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      branch.isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${branch.isActive ? "bg-emerald-500" : "bg-slate-400"}`}
                    />
                    {branch.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {format(new Date(branch.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}