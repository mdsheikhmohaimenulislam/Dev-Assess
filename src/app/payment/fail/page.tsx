"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentFailPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-9 w-9 text-red-600" />
          </div>

          <CardTitle className="text-2xl">
            Payment Failed
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Your payment could not be completed.
            Please try again.
          </p>

          <Button className="w-full">
            <Link href="/problems">
              Back to Problems
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}