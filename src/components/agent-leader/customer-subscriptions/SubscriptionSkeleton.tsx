import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const COLUMN_COUNT = 12;

export function SubscriptionSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(COLUMN_COUNT)].map((__, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-16" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}