"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import {
  User,
  Mail,
  CalendarDays,
  Users,
  Edit,
  X,
  Save,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
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
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setName(user?.name || "");
    setIsEditing(false);
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-2xl border bg-white p-10 text-center shadow-sm">
        <User className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <h2 className="text-xl font-bold text-gray-900">Sign in Required</h2>
        <p className="mt-2 text-sm text-gray-500">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      {/* Page Heading */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Account Settings
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage your personal information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        {/* Cover */}
        <div className="relative h-40 bg-gradient-to-r from-green-700 via-emerald-600 to-green-400">
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="px-6 pb-8 sm:px-8">
          {/* Avatar and Edit Button */}
          {/* Avatar and Edit Button */}
          <div className="-mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-emerald-100 shadow-sm">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-extrabold text-emerald-700">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* User Name */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.name || "User"}
            </h2>

            <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Helping Hands Community Member
            </p>
          </div>

          {/* Profile Details */}
          {!isEditing ? (
            <div className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-3">
                      <User className="h-5 w-5 text-emerald-700" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {user.name || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 p-3">
                      <Mail className="h-5 w-5 text-blue-700" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Email Address
                      </p>
                      <p className="mt-1 break-all font-semibold text-gray-900">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Community */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-100 p-3">
                      <Users className="h-5 w-5 text-purple-700" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Member Of
                      </p>
                      <p className="mt-1 font-semibold text-gray-900">
                        Helping Hands
                      </p>
                    </div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-100 p-3">
                      <CalendarDays className="h-5 w-5 text-orange-700" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Member Since
                      </p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {formatDate(
                          (
                            user as typeof user & {
                              createdAt?: Date | string;
                            }
                          ).createdAt,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Profile Form */
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 sm:p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Edit Your Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your profile name below.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <Input
                    value={user.email}
                    disabled
                    className="h-12 bg-gray-100"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Your email address cannot be changed here.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={isSaving || !name.trim()}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    variant="outline"
                    className="border-gray-300"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
