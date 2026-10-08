"use client";

import { createPayment, executePayment } from "@/api/payment.api";
import { useMutation } from "@tanstack/react-query";



export function useCreatePayment() {
  return useMutation({
    mutationFn: (problemId: string) =>
      createPayment(problemId),
  });
}

export function useExecutePayment() {
  return useMutation({
    mutationFn: (paymentId: string) =>
      executePayment(paymentId),
  });
}