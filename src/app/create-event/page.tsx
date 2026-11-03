import type { Metadata } from "next";
import { CreateEventForm } from "@/components/events/create-event-form";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Create Event | BhaloBeat" };

export default async function CreateEventPage() {
  await requireUser("/create-event");

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl">Create an Event</h1>
        <p className="mt-2 text-muted-foreground">
          Share a good deed with your neighborhood and let people join in.
        </p>
      </div>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <CreateEventForm />
      </div>
    </section>
  );
}