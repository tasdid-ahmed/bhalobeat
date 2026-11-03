"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthCard } from "@/components/auth/auth-card";
import { FormField } from "@/components/auth/form-field";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordInput } from "@/components/auth/password-input";
import { authClient } from "@/lib/auth-client";
import { collectErrors, getSafeRedirect, validateEmail, type FieldErrors } from "@/lib/validation";

type LoginField = "email" | "password";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const [errors, setErrors] = useState<FieldErrors<LoginField>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const nextErrors = collectErrors<LoginField>({
      email: validateEmail(email),
      password: password ? null : "Please enter your password.",
    });
    setErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Login failed. Please check your details.");
      return;
    }

    toast.success(`Welcome back, ${data?.user.name ?? "friend"}!`);
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to create and join events near you."
      footer={
        <>
          New to BhaloBeat?{" "}
          <Link href="/register" className="font-semibold text-secondary hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField id="email" label="Email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} className="h-10" />
        </FormField>
        <FormField id="password" label="Password" error={errors.password}>
          <PasswordInput id="password" name="password" autoComplete="current-password" placeholder="Your password" aria-invalid={!!errors.password} />
        </FormField>
        <Button type="submit" size="lg" className="h-10 w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        OR
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton redirectTo={redirectTo} />
    </AuthCard>
  );
}