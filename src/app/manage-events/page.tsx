import type { Metadata } from "next";
import { ManageEvents } from "@/components/events/manage-events";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Manage Events | BhaloBeat" };

export default async function ManageEventsPage() {
  await requireUser("/manage-events");

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl">Manage Your Events</h1>
        <p className="mt-2 text-muted-foreground">
          Update the details or remove the events you&rsquo;ve created.
        </p>
      </div>
      <ManageEvents />
    </section>
  );
}