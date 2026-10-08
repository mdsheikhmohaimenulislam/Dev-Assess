"use client";

import Link from "next/link";
import { Ban } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <Ban className="h-9 w-9 text-yellow-600" />
          </div>

          <CardTitle className="text-2xl">
            Payment Cancelled
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            You cancelled the payment process.
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