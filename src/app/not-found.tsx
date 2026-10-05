import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="text-3xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Sorry, the page you are looking for does not exist or may
          have been removed.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button>
            <Link href="/">Go Home</Link>
          </Button>

          <Button  variant="outline">
            <Link href="/problems">Browse Problems</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}