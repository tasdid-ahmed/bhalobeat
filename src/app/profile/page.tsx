import type { Metadata } from "next";
import { ProfileForm } from "@/components/profile/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "My Profile | BhaloBeat" };

export default async function ProfilePage() {
  const user = await requireUser("/profile");

  return (
    <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <Avatar className="mx-auto size-24">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback className="text-3xl">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-3xl sm:text-4xl">{user.name}</h1>
        <p className="mt-1 text-muted-foreground">{user.email}</p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 text-xl">Update your profile</h2>
        <ProfileForm
          user={{ name: user.name, email: user.email, image: user.image ?? null }}
        />
      </div>
    </section>
  );
}