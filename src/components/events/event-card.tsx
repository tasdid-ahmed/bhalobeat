import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventItem } from "@/lib/api";
import { formatEventDate } from "@/lib/format";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.thumbnail}
        alt={event.title}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          {event.type}
        </span>
        <h3 className="line-clamp-2 text-lg">{event.title}</h3>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-secondary" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-secondary" />
            {formatEventDate(event.date)}
          </p>
        </div>
        <Button asChild size="lg" className="mt-auto w-full">
          <Link href={`/events/${event._id}`}>View Event</Link>
        </Button>
      </div>
    </article>
  );
}