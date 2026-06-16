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
    title: "Secure Access",
    description: "Enterprise-grade security for your data",
  },
  {
    icon: TrendingUp,
    title: "Track Growth",
    description: "Monitor your policy performance easily",
  },
  {
    icon: CheckCircle,
    title: "Manage Policies",
    description: "Effortless policy and claim management",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success) {
        toast.success("Login successful!");
        router.push("/dashboard");
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
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-primary-foreground mb-6">
              Why choose us?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <Icon size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground text-sm">
                        {benefit.title}
                      </p>
                      <p className="text-primary-foreground/70 text-xs">
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
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to your account to continue"
        footer={
          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="#" className="text-primary hover:text-primary/80">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:text-primary/80">
              Privacy Policy
            </a>
          </p>
        }
      >
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </AuthCard>
    </AuthLayout>
  );
}
