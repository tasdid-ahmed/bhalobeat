"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  collectErrors,
  validateName,
  validateUrl,
  type FieldErrors,
} from "@/lib/validation";

type ProfileField = "name" | "photoURL";

export function ProfileForm({
  user,
}: {
  user: { name: string; email: string; image: string | null };
}) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<ProfileField>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const photoURL = String(form.get("photoURL") ?? "").trim();

    const nextErrors = collectErrors<ProfileField>({
      name: validateName(name),
      photoURL: validateUrl(photoURL, "photo URL"),
    });
    setErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name, image: photoURL });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Could not update your profile. Please try again.");
      return;
    }

    toast.success("Your profile has been updated.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField id="name" label="Name" error={errors.name}>
        <Input
          id="name"
          name="name"
          defaultValue={user.name}
          autoComplete="name"
          aria-invalid={!!errors.name}
          className="h-10"
        />
      </FormField>

      <FormField id="email" label="Email">
        <Input id="email" value={user.email} readOnly disabled className="h-10" />
      </FormField>

      <FormField id="photoURL" label="Photo URL" error={errors.photoURL}>
        <Input
          id="photoURL"
          name="photoURL"
          defaultValue={user.image ?? ""}
          placeholder="https://..."
          aria-invalid={!!errors.photoURL}
          className="h-10"
        />
      </FormField>

      <Button type="submit" size="lg" className="h-10 w-full" disabled={loading}>
        {loading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}