import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex shrink-0 items-center justify-center rounded-full bg-red-100 p-4">
          <ShieldAlert className="size-10 text-red-500" />
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Access Denied
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            You do not have permission to access this page.
          </p>

          <p className="mt-3 text-sm">
            Go back to{" "}
            <Link
              href="/"
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
