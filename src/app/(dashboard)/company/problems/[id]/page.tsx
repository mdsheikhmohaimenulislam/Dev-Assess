"use client";

import { useParams } from "next/navigation";

export default function AdminProblemDetailsPage() {
  const params = useParams<{ id: string }>();

  const id = params.id;

  return (
    <div>
      <h1>Problem Details</h1>

      <p>Problem ID: {id}</p>
    </div>
  );
}