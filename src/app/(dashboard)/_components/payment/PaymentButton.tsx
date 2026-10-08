"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCreatePayment } from "@/components/hooks/payment.hook";


interface PaymentButtonProps {
  problemId: string;
}

export default function PaymentButton({
  problemId,
}: PaymentButtonProps) {
  const { mutate: createPayment, isPending } = useCreatePayment();

  const handlePayment = () => {
    createPayment(problemId, {
      onSuccess: (response) => {
        const bkashURL = response.data.bkashURL;

        if (!bkashURL) {
          toast.error("Payment URL not found");
          return;
        }

        window.location.href = bkashURL;
      },
      onError: () => {
        toast.error("Failed to create payment");
      },
    });
  };

  return (
    <Button
      className="w-full"
      onClick={handlePayment}
      disabled={isPending}
    >
      {isPending ? "Processing..." : "Pay Now"}
    </Button>
  );
}