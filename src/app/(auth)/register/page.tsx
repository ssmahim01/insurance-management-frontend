"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { RegisterFormData } from "@/schemas/auth";
import { Zap, Users, Clock } from "lucide-react";
import { registerUser } from "@/utils/registerUser";

const features = [
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Get started in minutes with our simple registration",
  },
  {
    icon: Users,
    title: "Multi-User Support",
    description: "Invite team members and manage access easily",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "24/7 access to your insurance management tools",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      const payload = {
        name: data.fullName,
        phone: data.phoneNumber,
        password: data.password,
      };

      formData.append("data", JSON.stringify(payload));
      const response = await registerUser(formData);
      if (response.success) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (error) {
      console.error(" Register error:", error);
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
              Get started today
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <Icon size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground text-sm">
                        {feature.title}
                      </p>
                      <p className="text-primary-foreground/70 text-xs">
                        {feature.description}
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
        title="Create your account"
        subtitle="Join us to manage your insurance efficiently"
        footer={
          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:text-primary/80">
              Sign in instead
            </a>
          </p>
        }
      >
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      </AuthCard>
    </AuthLayout>
  );
}
