"use client";

import { CalendarDays, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useGetMe } from "@/components/hooks/auth.hook";

export default function Profile() {
  const { data, isLoading, isError } = useGetMe();

  const profile = data?.data;


  if (isLoading) {
    return (
      <section className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-48 rounded bg-gray-200" />
              <div className="h-24 w-24 rounded-full bg-gray-200" />
              <div className="h-5 w-64 rounded bg-gray-200" />
              <div className="h-5 w-48 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-600">Profile not found.</p>
      </section>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage your account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          {/* Profile Header */}
          <div className="border-b bg-gray-50 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* Profile Image */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {profile.imageUrl ? (
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-10 w-10 text-gray-500" />
                )}
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {profile.name}
                </h2>

                <p className="mt-1 flex items-center justify-center gap-2 text-gray-600 sm:justify-start">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {profile.role}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {profile.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold text-gray-900">
              Account Information
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="mt-1 break-all text-sm font-medium text-gray-900">
                  {profile.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="mt-1 font-medium text-gray-900">
                  {profile.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="mt-1 font-medium text-gray-900">
                  {profile.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Authentication Provider
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {profile.authProvider}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="mt-1 font-medium text-gray-900">
                  {profile.role}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="mt-1 flex items-center gap-2 font-medium text-green-600">
                  <ShieldCheck className="h-4 w-4" />
                  {profile.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email Verification
                </p>
                <p
                  className={`mt-1 font-medium ${
                    profile.emailVerified
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {profile.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Google Account</p>
                <p className="mt-1 font-medium text-gray-900">
                  {profile.googleId ? "Connected" : "Not Connected"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(profile.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(profile.updatedAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Deleted Account</p>
                <p className="mt-1 font-medium text-gray-900">
                  {profile.isDeleted ? "Yes" : "No"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Deleted At</p>
                <p className="mt-1 font-medium text-gray-900">
                  {profile.deletedAt
                    ? formatDate(profile.deletedAt)
                    : "Not Deleted"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}