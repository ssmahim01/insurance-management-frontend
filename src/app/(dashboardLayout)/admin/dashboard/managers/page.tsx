import ManagerManagement from "@/components/manager/ManagerManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Manager Management | Shurokkha',
  description: 'Manage your managers',
};

export default function ManagerPage() {
  return (
    <div>
      <ManagerManagement />
    </div>
  );
}