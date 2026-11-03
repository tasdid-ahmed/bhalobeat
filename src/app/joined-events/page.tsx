import type { Metadata } from "next";
import { JoinedEvents } from "@/components/events/joined-events";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Joined Events | BhaloBeat" };

export default async function JoinedEventsPage() {
  await requireUser("/joined-events");

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl">Events You&rsquo;ve Joined</h1>
        <p className="mt-2 text-muted-foreground">
          Your beats, sorted by event date.
        </p>
      </div>
      <JoinedEvents />
    </section>
  );
}