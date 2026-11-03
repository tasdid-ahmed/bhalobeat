import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/bhalobeat-logo.png"
            alt="BhaloBeat logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="hidden font-heading text-xl font-extrabold sm:inline">
            <span className="text-secondary">Bhalo</span>
            <span className="text-primary">Beat</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/events"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Upcoming Events
          </Link>
          <ThemeToggle />
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}