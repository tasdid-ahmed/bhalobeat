import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, User } from "lucide-react";
import { JoinButton } from "@/components/events/join-button";
import { Button } from "@/components/ui/button";
import { ApiError, getEventById, type EventItem } from "@/lib/api";
import { auth } from "@/lib/auth";
import { formatEventDate, isPastEvent } from "@/lib/format";

async function getIsLoggedIn(): Promise<boolean> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return Boolean(session);
  } catch {
    return false;
  }
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let event: EventItem | null = null;
  try {
    event = await getEventById(id);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) {
      notFound();
    }
    event = null;
  }

  if (!event) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-muted-foreground">
          We couldn&rsquo;t load this event right now. Please refresh the page in a moment.
        </p>
      </section>
    );
  }

  const isLoggedIn = await getIsLoggedIn();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const isPast = isPastEvent(event.date);

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Button asChild variant="ghost" size="lg" className="mb-4">
        <Link href="/events">
          <ArrowLeft />
          All events
        </Link>
      </Button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.thumbnail}
        alt={event.title}
        className="aspect-[16/8] w-full rounded-2xl object-cover"
      />

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
        <div>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {event.type}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl">{event.title}</h1>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-secondary" />
              <span>{formatEventDate(event.date)}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" />
              <span>{event.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <User className="mt-0.5 size-4 shrink-0 text-secondary" />
              <span>Organized by {event.creatorName}</span>
            </li>
          </ul>
          <JoinButton eventId={event._id} isLoggedIn={isLoggedIn} isPast={isPast} />
        </aside>
      </div>
    </article>
  );
}