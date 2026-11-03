"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventForm, type EventFormValues } from "@/components/events/event-form";
import { authedRequest } from "@/lib/auth-fetch";

export function CreateEventForm() {
  const router = useRouter();

  async function handleCreate(values: EventFormValues) {
    await authedRequest("/api/events", { method: "POST", body: values });
    toast.success("Your event is live. Your neighborhood can feel it now.");
    router.push("/events");
    router.refresh();
  }

  return (
    <EventForm
      submitLabel="Create Event"
      loadingLabel="Creating event..."
      onSubmit={handleCreate}
    />
  );
}