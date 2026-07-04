"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginFormData } from "@/schemas/auth";
import { Shield, CheckCircle, TrendingUp } from "lucide-react";
import { loginUser } from "@/utils/loginUser";

const benefits = [
  {
    icon: Shield,
    title: "Secure Insurance Management",
    description: "Advanced protection for policies, claims, and customer data.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth Insights",
    description:
      "Track performance, premiums, and operational growth in real time.",
  },
  {
    icon: CheckCircle,
    title: "Smart Claim Processing",
    description:
      "Fast and transparent claim verification and approval workflows.",
  },
];

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success) {
        toast.success("Login successful!");
        if (response?.user?.user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (response?.user?.user?.role === "SUPER_ADMIN") {
          router.push("/superadmin/dashboard");
        } else if (response?.user?.user?.role === "AGENT_LEADER") {
          router.push("/agent-leader");
        } else if (response?.user?.user?.role === "AGENT") {
          router.push("/agent");
        } else {
          router.push("/customer");
        }
      }

      // console.log(' Login data:', data);
    } catch (error) {
      console.error(" Login error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      showLeftPanel={true}
      leftPanelContent={
        <div className="flex h-full flex-col justify-between">
          {/* Top Section */}
          <div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-white">
                Protecting Lives.
                <br />
                Securing Futures.
              </h1>

              <p className="max-w-md text-base text-white/80">
                Shurokkha provides a complete digital insurance ecosystem for
                policy management, claims processing, customer support, and
                business growth.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mt-4 space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={index}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-emerald-500/10 p-4 backdrop-blur-sm transition-all hover:bg-emerald-700/15"
                  >
                    <div className="rounded-xl bg-emerald-500/60 p-3">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-white">
                        {benefit.title}
                      </h4>

                      <p className="text-sm text-white/70">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    >
      <AuthCard>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </AuthCard>
    </AuthLayout>
  );
}
