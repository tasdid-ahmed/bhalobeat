"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateEmail } from "@/lib/validation";

export function NewsletterSection() {
  const [error, setError] = useState<string | undefined>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const message = validateEmail(email);

    setError(message ?? undefined);
    if (message) {
      toast.error(message);
      return;
    }

    toast.success("Thanks for your interest! Newsletter emails are coming soon.");
    form.reset();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-secondary">
          <Mail className="size-5" />
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl">Feel the beat in your inbox</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Get a short note about new events and good deeds happening near you. No spam, ever.
        </p>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-label="Email address"
            aria-invalid={!!error}
            className="h-10 flex-1"
          />
          <Button type="submit" size="lg" className="h-10 px-6">
            Subscribe
          </Button>
        </form>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>
    </section>
  );
}