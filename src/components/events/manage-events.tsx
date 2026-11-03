"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EventForm, type EventFormValues } from "@/components/events/event-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EventItem } from "@/lib/api";
import { authedRequest } from "@/lib/auth-fetch";
import { formatEventDate, isPastEvent, toDateInputValue } from "@/lib/format";

function sortByDate(list: EventItem[]): EventItem[] {
  return [...list].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

function ManageSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
        >
          <div className="aspect-[16/10] w-full rounded-xl bg-muted sm:w-44" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-24 rounded-full bg-muted" />
            <div className="h-6 w-3/5 rounded bg-muted" />
            <div className="h-4 w-2/5 rounded bg-muted" />
          </div>
          <div className="h-9 w-full rounded-lg bg-muted sm:w-28" />
        </div>
      ))}
    </div>
  );
}

export function ManageEvents() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    let active = true;

    authedRequest<{ data: EventItem[] }>("/api/my-events")
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

  async function handleUpdate(values: EventFormValues) {
    if (!editing) return;

    const result = await authedRequest<{ data: EventItem }>(
      `/api/events/${editing._id}`,
      { method: "PATCH", body: values }
    );

    setEvents((current) =>
      current
        ? sortByDate(
            current.map((item) => (item._id === result.data._id ? result.data : item))
          )
        : current
    );
    toast.success("Event updated successfully.");
    setEditing(null);
  }

  async function handleDelete() {
    if (!deleting) return;

    setDeleteBusy(true);
    try {
      await authedRequest(`/api/events/${deleting._id}`, { method: "DELETE" });
      setEvents((current) =>
        current ? current.filter((item) => item._id !== deleting._id) : current
      );
      toast.success("Event deleted successfully.");
      setDeleting(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not delete the event. Please try again."
      );
    } finally {
      setDeleteBusy(false);
    }
  }

  if (failed) {
    return (
      <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        We couldn&rsquo;t load your events right now. Please refresh the page in a moment.
      </p>
    );
  }

  if (!events) return <ManageSkeleton />;

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">
          You haven&rsquo;t created any events yet. Start your first beat.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/create-event">Create an Event</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {events.map((event) => {
          const past = isPastEvent(event.date);
          return (
            <li
              key={event._id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.thumbnail}
                alt={event.title}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-xl object-cover sm:w-44"
              />
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {event.type}
                  </span>
                  {past && (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      Past event
                    </span>
                  )}
                </div>
                <h3 className="line-clamp-2 text-lg">{event.title}</h3>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0 text-secondary" />
                  <span className="line-clamp-1">{event.location}</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0 text-secondary" />
                  {formatEventDate(event.date)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:w-32 sm:flex-col">
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href={`/events/${event._id}`}>View</Link>
                </Button>
                {!past && (
                  <Button size="lg" className="flex-1" onClick={() => setEditing(event)}>
                    <Pencil />
                    Update
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 text-destructive hover:text-destructive"
                  onClick={() => setDeleting(event)}
                >
                  <Trash2 />
                  Delete
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Update event</DialogTitle>
            <DialogDescription>
              Change the details below and save. Everyone who joined will see the new information.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <EventForm
              key={editing._id}
              initialValues={{
                title: editing.title,
                description: editing.description,
                type: editing.type,
                thumbnail: editing.thumbnail,
                location: editing.location,
                date: toDateInputValue(editing.date),
              }}
              submitLabel="Save changes"
              loadingLabel="Saving..."
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open && !deleteBusy) setDeleting(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete this event?</DialogTitle>
            <DialogDescription>
              &ldquo;{deleting?.title}&rdquo; will be removed for good, along with the
              list of people who joined. This can&rsquo;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setDeleting(null)}
              disabled={deleteBusy}
            >
              Keep it
            </Button>
            <Button
              size="lg"
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleteBusy}
            >
              {deleteBusy ? "Deleting..." : "Yes, delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}