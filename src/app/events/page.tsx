import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { EventGridSkeleton } from "@/components/events/event-grid-skeleton";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents, type EventItem } from "@/lib/api";

export const metadata: Metadata = { title: "Upcoming Events | BhaloBeat" };

async function EventList() {
  let events: EventItem[] | null = null;

  try {
    events = await getUpcomingEvents();
  } catch {
    events = null;
  }

  if (!events) {
    return (
      <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        We couldn&rsquo;t load the events right now. Please refresh the page in a moment.
      </p>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">
          No beats here yet. Be the first to start one.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/create-event">Create an Event</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl">Upcoming Events</h1>
        <p className="mt-2 text-muted-foreground">
          Find a good deed near you and show up. Every beat counts.
        </p>
      </div>
      <Suspense fallback={<EventGridSkeleton />}>
        <EventList />
      </Suspense>
    </section>
  );
}