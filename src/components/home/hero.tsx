import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/home-banner.png"
        alt="Volunteers sharing warm clothes and planting trees in a Dhaka neighborhood"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/30 md:via-background/60 md:to-transparent" />

      <div className="mx-auto flex min-h-[460px] max-w-7xl items-center px-4 py-16 sm:min-h-[560px] sm:px-6">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Community service, made simple
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">
            Every good deed has a pulse.
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Find a cause in your neighborhood, join with one tap, and feel the good
            around you. Cleanups, plantations, donation drives, and more, all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 px-6 text-base">
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-6 text-base">
              <Link href="/create-event">Create an Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}