import {
  CalendarPlus,
  Heart,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: CalendarPlus,
    title: "Create in minutes",
    text: "Share a cleanup, plantation, or donation drive with a title, place, and date. Your event goes live right away.",
  },
  {
    icon: Search,
    title: "Discover what's ahead",
    text: "Browse upcoming events across your area. Events that have already passed never clutter the list.",
  },
  {
    icon: Heart,
    title: "Join with one tap",
    text: "Count yourself in and your beat is saved. Your joined events are always one click away, sorted by date.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage your events",
    text: "Update the details or remove an event any time. Only you can change what you create.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    text: "Sign in with email or Google. Every change is checked on the server with signed login tokens.",
  },
  {
    icon: Sun,
    title: "Light and dark themes",
    text: "Switch themes with a single click, and the whole site follows, day or night.",
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Why BhaloBeat"
        title="Everything you need to do good, together"
        description="A simple, friendly home for community service events in your neighborhood."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-accent text-secondary">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}