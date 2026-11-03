"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function GoogleButton({ redirectTo }: { redirectTo: string }) {
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setLoading(true);
    // The navbar reads this flag after the redirect and shows a welcome toast.
    sessionStorage.setItem("bhalobeat:welcome", "1");
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
    if (error) {
      sessionStorage.removeItem("bhalobeat:welcome");
      toast.error(error.message ?? "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Button type="button" variant="outline" size="lg" className="h-10 w-full" onClick={handleGoogle} disabled={loading}>
      <span className="font-bold text-[#4285F4]">G</span>
      {loading ? "Redirecting..." : "Continue with Google"}
    </Button>
  );
}