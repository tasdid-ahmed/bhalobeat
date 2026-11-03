"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthCard } from "@/components/auth/auth-card";
import { FormField } from "@/components/auth/form-field";
import { PasswordInput } from "@/components/auth/password-input";
import { authClient } from "@/lib/auth-client";
import {
  collectErrors,
  validateEmail,
  validateName,
  validatePassword,
  validateUrl,
  type FieldErrors,
} from "@/lib/validation";

type RegisterField = "name" | "email" | "photoURL" | "password";

export function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<RegisterField>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const photoURL = String(form.get("photoURL") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const nextErrors = collectErrors<RegisterField>({
      name: validateName(name),
      email: validateEmail(email),
      photoURL: validateUrl(photoURL, "photo URL"),
      password: validatePassword(password),
    });
    setErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Registration failed. Please try again.");
      return;
    }

    toast.success(`Welcome to BhaloBeat, ${data?.user.name ?? name}!`);
    router.push("/");
    router.refresh();
  }

  return (
    <AuthCard
      title="Join BhaloBeat"
      subtitle="Create your account and feel the good around you."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-secondary hover:underline">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField id="name" label="Name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} className="h-10" />
        </FormField>
        <FormField id="email" label="Email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} className="h-10" />
        </FormField>
        <FormField id="photoURL" label="Photo URL" error={errors.photoURL}>
          <Input id="photoURL" name="photoURL" placeholder="https://..." aria-invalid={!!errors.photoURL} className="h-10" />
        </FormField>
        <FormField id="password" label="Password" error={errors.password}>
          <PasswordInput id="password" name="password" autoComplete="new-password" placeholder="At least 6 characters" aria-invalid={!!errors.password} />
        </FormField>
        <Button type="submit" size="lg" className="h-10 w-full" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </AuthCard>
  );
}