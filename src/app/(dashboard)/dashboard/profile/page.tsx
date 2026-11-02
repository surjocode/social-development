"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setIsSaving(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return <p className="p-6">Loading profile...</p>;
  }

  if (!user) {
    return <p className="p-6">Please sign in to view your profile.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="h-36 bg-gradient-to-r from-green-600 to-emerald-400" />

        <div className="px-6 pb-8">
          <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-green-100 text-3xl font-bold text-green-700">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h1 className="mt-4 text-2xl font-bold">
            My Profile
          </h1>

          <p className="text-sm text-gray-500">
            Manage your personal information
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <Input
                value={user.email}
                disabled
                className="bg-gray-100"
              />
            </div>

            <Button
              onClick={handleUpdateProfile}
              disabled={isSaving || !name.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}