"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Welcome toast after a Google login redirect.
  useEffect(() => {
    if (!user) return;
    if (sessionStorage.getItem("bhalobeat:welcome") === "1") {
      sessionStorage.removeItem("bhalobeat:welcome");
      toast.success(`Welcome back, ${user.name}!`);
    }
  }, [user]);

  async function handleLogout() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Could not log out. Please try again.");
      return;
    }
    toast.success("You have been logged out. See you soon!");
    router.push("/");
    router.refresh();
  }

  // Avoids flashing the Login button while the session loads.
  if (isPending) {
    return <div className="size-9 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) {
    return (
      <Button asChild size="lg">
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            title={user.name}
            aria-label="Open profile menu"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-9">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="truncate">{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/create-event">Create Event</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/manage-events">Manage Events</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/joined-events">Joined Events</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">My Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="lg" onClick={handleLogout} aria-label="Logout">
        <LogOut />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
}