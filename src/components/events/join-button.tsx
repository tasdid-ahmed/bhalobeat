"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { authedRequest } from "@/lib/auth-fetch";

export function JoinButton({
  eventId,
  isLoggedIn,
  isPast,
}: {
  eventId: string;
  isLoggedIn: boolean;
  isPast: boolean;
}) {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(isLoggedIn);
  const [busy, setBusy] = useState(false);

  // Find out whether this user already joined, so the button shows the right state.
  useEffect(() => {
    if (!isLoggedIn) return;
    let active = true;

    authedRequest<{ joined: boolean }>(`/api/events/${eventId}/join-status`)
      .then((result) => {
        if (active) setJoined(result.joined);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [eventId, isLoggedIn]);

  async function handleJoin() {
    if (!isLoggedIn) {
      toast.error("Please log in to join this event.");
      router.push(`/login?redirect=${encodeURIComponent(`/events/${eventId}`)}`);
      return;
    }

    setBusy(true);
    try {
      await authedRequest(`/api/events/${eventId}/join`, { method: "POST" });
      setJoined(true);
      toast.success("You're in! Your beat is counted.");
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setJoined(true);
        toast.info("You have already joined this event.");
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not join the event. Please try again."
        );
      }
    } finally {
      setBusy(false);
    }
  }

  if (isPast) {
    return (
      <Button size="lg" className="h-10 w-full" disabled>
        This event has passed
      </Button>
    );
  }

  if (joined) {
    return (
      <Button size="lg" className="h-10 w-full" disabled>
        <CircleCheck />
        You&rsquo;re in!
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="h-10 w-full"
      onClick={handleJoin}
      disabled={busy || checking}
    >
      {checking ? "Checking..." : busy ? "Joining..." : "Count me in"}
    </Button>
  );
}