"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENT_TYPES } from "@/lib/constants";
import {
  collectErrors,
  todayInputValue,
  validateEventDate,
  validateSelect,
  validateText,
  validateUrl,
  type FieldErrors,
} from "@/lib/validation";

export type EventFormValues = {
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  location: string;
  date: string;
};

type EventField = keyof EventFormValues;

const emptyValues: EventFormValues = {
  title: "",
  description: "",
  type: "",
  thumbnail: "",
  location: "",
  date: "",
};

const controlClass =
  "w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

export function EventForm({
  initialValues = emptyValues,
  submitLabel,
  loadingLabel,
  onSubmit,
}: {
  initialValues?: EventFormValues;
  submitLabel: string;
  loadingLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
}) {
  const [errors, setErrors] = useState<FieldErrors<EventField>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const read = (key: EventField) => String(form.get(key) ?? "").trim();

    const values: EventFormValues = {
      title: read("title"),
      description: read("description"),
      type: read("type"),
      thumbnail: read("thumbnail"),
      location: read("location"),
      date: read("date"),
    };

    const nextErrors = collectErrors<EventField>({
      title: validateText(values.title, "title", 3, 100),
      description: validateText(values.description, "description", 10, 2000),
      type: validateSelect(values.type, "event type", EVENT_TYPES),
      thumbnail: validateUrl(values.thumbnail, "thumbnail URL"),
      location: validateText(values.location, "location", 3, 150),
      date: validateEventDate(values.date),
    });
    setErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField id="title" label="Event title" error={errors.title}>
        <Input
          id="title"
          name="title"
          defaultValue={initialValues.title}
          placeholder="e.g. Winter Clothes Distribution"
          aria-invalid={!!errors.title}
          className="h-10"
        />
      </FormField>

      <FormField id="description" label="Description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={initialValues.description}
          placeholder="Tell people what the event is about and how they can help."
          aria-invalid={!!errors.description}
          className={`${controlClass} py-2`}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="type" label="Event type" error={errors.type}>
          <select
            id="type"
            name="type"
            defaultValue={initialValues.type}
            aria-invalid={!!errors.type}
            className={`${controlClass} h-10`}
          >
            <option value="">Choose a type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="date" label="Event date" error={errors.date}>
          <Input
            id="date"
            name="date"
            type="date"
            min={todayInputValue()}
            defaultValue={initialValues.date}
            aria-invalid={!!errors.date}
            suppressHydrationWarning
            className="h-10"
          />
        </FormField>
      </div>

      <FormField id="location" label="Location" error={errors.location}>
        <Input
          id="location"
          name="location"
          defaultValue={initialValues.location}
          placeholder="e.g. Mirpur 10, Dhaka"
          aria-invalid={!!errors.location}
          className="h-10"
        />
      </FormField>

      <FormField id="thumbnail" label="Thumbnail image URL" error={errors.thumbnail}>
        <Input
          id="thumbnail"
          name="thumbnail"
          defaultValue={initialValues.thumbnail}
          placeholder="https://..."
          aria-invalid={!!errors.thumbnail}
          className="h-10"
        />
      </FormField>

      <Button type="submit" size="lg" className="h-10 w-full" disabled={loading}>
        {loading ? loadingLabel : submitLabel}
      </Button>
    </form>
  );
}