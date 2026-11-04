import { Suspense } from "react";
import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { EventGridSkeleton } from "@/components/events/event-grid-skeleton";
import { SectionHeading } from "@/components/home/section-heading";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents, type EventItem } from "@/lib/api";

async function HomeEvents() {
  let events: EventItem[] | null = null;

  try {
    events = await getUpcomingEvents(6);
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

export function UpcomingSection() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Happening soon"
          title="Upcoming events near you"
          description="The next good deeds on the calendar. Pick one and show up."
        />
        <Suspense fallback={<EventGridSkeleton />}>
          <HomeEvents />
        </Suspense>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="h-11 px-6 text-base">
            <Link href="/events">View all events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}