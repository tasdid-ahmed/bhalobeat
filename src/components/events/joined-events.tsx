"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { EventGridSkeleton } from "@/components/events/event-grid-skeleton";
import { Button } from "@/components/ui/button";
import type { EventItem } from "@/lib/api";
import { authedRequest } from "@/lib/auth-fetch";

export function JoinedEvents() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    authedRequest<{ data: EventItem[] }>("/api/joined-events")
      .then((result) => {
        if (active) setEvents(result.data);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, []);

  if (failed) {
    return (
      <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        We couldn&rsquo;t load your joined events right now. Please refresh the page in a moment.
      </p>
    );
  }

  if (!events) return <EventGridSkeleton count={3} />;

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">
          You haven&rsquo;t joined any events yet. Find a good deed near you.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/events">Browse Upcoming Events</Link>
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