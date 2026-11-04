import Link from "next/link";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/joined-events", label: "Joined Events" },
];

const causes = ["Cleanup Drives", "Plantation", "Winter Clothes", "Food Distribution"];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="h-8 w-full text-primary"
      >
        <path
          d="M0 20 H480 L510 20 L530 4 L560 36 L580 20 H1200"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-heading text-2xl font-extrabold">BhaloBeat</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed opacity-90">
            Every good deed has a pulse. Find, create, and join community service
            events in your neighborhood, and feel the good around you.
          </p>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BhaloBeat on X"
            className="mt-5 inline-flex size-10 items-center justify-center rounded-full border border-current/40 transition-opacity hover:opacity-70"
          >
            <XLogo className="size-4" />
          </a>
        </div>

        <div>
          <p className="font-heading text-base font-bold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="opacity-90 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-base font-bold">Causes we love</p>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            {causes.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-current/20 py-4 text-center text-xs opacity-80">
        &copy; {new Date().getFullYear()} BhaloBeat. All rights reserved.
      </div>
    </footer>
  );
}