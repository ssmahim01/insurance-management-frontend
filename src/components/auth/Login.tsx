"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginFormData } from "@/schemas/auth";
import { Shield, CheckCircle, TrendingUp } from "lucide-react";
import { loginUser, otpLogin } from "@/utils/loginUser";
import { useUser } from "@/context/UserContext";

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

// centralised so both password login and OTP login redirect the same way
const redirectByRole = (
  router: ReturnType<typeof useRouter>,
  role?: string
) => {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      router.push("/admin/dashboard");
      break;
    case "Manager":
      router.push("/manager/dashboard");
      break;
    case "AGENT_LEADER":
      router.push("/agent-leader/dashboard");
      break;
    case "AGENT":
      router.push("/agent/dashboard");
      break;
    default:
      router.push("/customer/dashboard");
  }
};

export default function Login() {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success) {
        toast.success("Login successful!");
        await refreshUser();
        redirectByRole(router, response?.user?.user?.role);
      }

      if (!response.success) {
        toast.error(response.message || "Login failed. Please try again.");
      }
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

  // // called by LoginForm's OTP tab after verify-otp succeeds
  // const handleOtpSuccess = async (data: {
  //   accessToken: string;
  //   refreshToken: string;
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   user: any;
  // }) => {
  //   try {
  //     // TODO: persist tokens the same way loginUser() does for password login
  //     // (cookies / localStorage / your auth store), e.g.:
  //     // Cookies.set("accessToken", data.accessToken);
  //     // Cookies.set("refreshToken", data.refreshToken);

  //     redirectByRole(router, data?.user?.role);
  //   } catch (error) {
  //     console.error("OTP login error:", error);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };

  const handleOtpSuccess = async (data: {
    accessToken: string;
    refreshToken: string;
    user: any;
  }) => {
    try {
      const response = await otpLogin(data);

      if (response.success) {
        // toast.success("Login successful!");
        await refreshUser();
        redirectByRole(router, response.user.role);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
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
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-indigo-500/10 p-4 backdrop-blur-sm transition-all hover:bg-indigo-700/15"
                  >
                    <div className="rounded-xl bg-indigo-500/60 p-3">
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
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          onOtpSuccess={handleOtpSuccess}
        />
      </AuthCard>
    </AuthLayout>
  );
}