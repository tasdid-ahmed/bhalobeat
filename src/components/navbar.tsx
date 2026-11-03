import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu, type NavbarUser } from "@/components/user-menu";
import { auth } from "@/lib/auth";

async function getNavbarUser(): Promise<NavbarUser | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;
    const { name, email, image } = session.user;
    return { name, email, image: image ?? null };
  } catch {
    return null;
  }
}

export async function Navbar() {
  const user = await getNavbarUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6">
        <Link href="/" aria-label="BhaloBeat home" className="flex items-center justify-self-start">
          <Image
            src="/bhalobeat-logo.png"
            alt="BhaloBeat"
            width={200}
            height={64}
            priority
            className="h-11 w-auto sm:h-14 lg:h-16"
          />
        </Link>

        <Link
          href="/events"
          className="whitespace-nowrap text-xs font-semibold text-foreground/80 transition-colors hover:text-secondary sm:text-sm lg:text-base"
        >
          Upcoming Events
        </Link>

        <div className="flex items-center justify-self-end gap-2">
          <ThemeToggle />
          <UserMenu user={user} />
        </div>
      </nav>
    </header>
  );
}