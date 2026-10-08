"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const paymentID = searchParams.get("paymentID");

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </div>

          <CardTitle className="text-2xl">
            Payment Successful
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Your payment has been completed successfully.
          </p>

          {paymentID && (
            <div className="rounded-lg bg-muted p-3 text-left">
              <p className="text-xs text-muted-foreground">
                Payment ID
              </p>

              <p className="mt-1 break-all text-sm font-medium">
                {paymentID}
              </p>
            </div>
          )}

          <Button className="w-full">
            <Link href="/problems">
              Browse Problems
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}