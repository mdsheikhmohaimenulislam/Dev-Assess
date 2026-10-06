"use client";

import { useState } from "react";
import {
  CalendarDays,
  FileText,

  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useGetMe } from "@/components/hooks/auth.hook";
import { useGetMyCandidate } from "@/components/hooks/candidate.hook";

import { Button } from "@/components/ui/button";
import CandidateProfileForm from "./CandidateProfileForm";
import CandidateProfileSkeleton from "./CandidateProfileSkeleton";

export default function CandidateProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetMe();

  const {
    data: candidateData,
    isLoading: candidateLoading,
  } = useGetMyCandidate();

  const profile = userData?.data;
  const candidate = candidateData?.data;

  if (userLoading || candidateLoading) {
    return <CandidateProfileSkeleton />;
  }

  if (userError || !profile) {
    return (
      <section className="flex min-h-screen items-center justify-center px-4">
        <p className="text-muted-foreground">
          Profile not found.
        </p>
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

  if (isEditing) {
    return (
      <section className="min-h-screen px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Edit Candidate Profile
              </h1>

              <p className="mt-2 text-muted-foreground">
                Update your professional information.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <CandidateProfileForm
              candidate={candidate}
              onSuccess={() => setIsEditing(false)}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-muted-foreground">
              View and manage your account information.
            </p>
          </div>

          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="size-4" />
            Edit Profile
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          {/* Profile Header */}
          <div className="border-b bg-muted/30 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                {profile.imageUrl ? (
                  <Image
                    src={profile.imageUrl}
                    alt={profile.name || "Profile"}
                    width={96}
                    height={96}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <UserRound className="h-10 w-10 text-muted-foreground" />
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold">
                  {profile.name}
                </h2>

                <p className="mt-1 flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
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
          <div className="border-b p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold">
              Account Information
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              <ProfileItem
                label="User ID"
                value={profile.id}
                breakAll
              />

              <ProfileItem
                label="Full Name"
                value={profile.name}
              />

              <ProfileItem
                label="Email Address"
                value={profile.email}
              />

              <ProfileItem
                label="Authentication Provider"
                value={profile.authProvider}
              />

              <ProfileItem
                label="Role"
                value={profile.role}
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Account Status
                </p>

                <p className="mt-1 flex items-center gap-2 font-medium text-green-600">
                  <ShieldCheck className="h-4 w-4" />
                  {profile.status}
                </p>
              </div>

              <ProfileItem
                label="Email Verification"
                value={
                  profile.emailVerified
                    ? "Verified"
                    : "Not Verified"
                }
              />

              <ProfileItem
                label="Google Account"
                value={
                  profile.googleId
                    ? "Connected"
                    : "Not Connected"
                }
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Account Created
                </p>

                <p className="mt-1 flex items-center gap-2 font-medium">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(profile.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Last Updated
                </p>

                <p className="mt-1 flex items-center gap-2 font-medium">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(profile.updatedAt)}
                </p>
              </div>

              <ProfileItem
                label="Deleted Account"
                value={profile.isDeleted ? "Yes" : "No"}
              />

              <ProfileItem
                label="Deleted At"
                value={
                  profile.deletedAt
                    ? formatDate(profile.deletedAt)
                    : "Not Deleted"
                }
              />
            </div>
          </div>

          {/* Candidate Information */}
          <div className="p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold">
              Candidate Information
            </h3>

            {!candidate ? (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Candidate profile has not been created yet.
                </p>

                <Button
                  className="mt-4"
                  onClick={() => setIsEditing(true)}
                >
                  Create Candidate Profile
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    Phone Number
                  </p>

                  <p className="mt-1 flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4" />
                    {candidate.phone || "Not provided"}
                  </p>
                </div>

                {/* Bio */}
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    Bio
                  </p>

                  <p className="mt-1 whitespace-pre-wrap font-medium">
                    {candidate.bio || "No bio added yet."}
                  </p>
                </div>

                {/* GitHub */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    GitHub
                  </p>

                  {candidate.githubUrl ? (
                    <a
                      href={candidate.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-2 font-medium text-primary hover:underline"
                    >
                      <FaGithub className="h-4 w-4" />
                      View GitHub Profile
                    </a>
                  ) : (
                    <p className="mt-1 font-medium">
                      Not provided
                    </p>
                  )}
                </div>

                {/* LinkedIn */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    LinkedIn
                  </p>

                  {candidate.linkedinUrl ? (
                    <a
                      href={candidate.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-2 font-medium text-primary hover:underline"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      View LinkedIn Profile
                    </a>
                  ) : (
                    <p className="mt-1 font-medium">
                      Not provided
                    </p>
                  )}
                </div>

                {/* Resume */}
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    Resume
                  </p>

                  {candidate.resumeUrl ? (
                    <a
                      href={candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-2 font-medium text-primary hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      View Resume
                    </a>
                  ) : (
                    <p className="mt-1 font-medium">
                      Not provided
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProfileItemProps {
  label: string;
  value: string;
  breakAll?: boolean;
}

function ProfileItem({
  label,
  value,
  breakAll = false,
}: ProfileItemProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p
        className={`mt-1 font-medium ${
          breakAll ? "break-all text-sm" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}