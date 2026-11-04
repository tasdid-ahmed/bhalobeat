import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found | BhaloBeat" };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <svg
        viewBox="0 0 240 60"
        aria-hidden="true"
        className="h-14 w-60 text-primary"
      >
        <path
          d="M0 30 H80 L95 8 L115 52 L130 30 H240"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-secondary">
        Error 404
      </p>
      <h1 className="mt-2 text-3xl sm:text-4xl">We couldn&rsquo;t find that page</h1>
      <p className="mt-3 text-muted-foreground">
        The page you&rsquo;re looking for may have moved, or the event may have been removed.
        Let&rsquo;s get your beat back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="h-11 px-6 text-base">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-11 px-6 text-base">
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    </section>
  );
}